import { motion } from 'framer-motion'

// Arc spanning the right 270 degrees of a circle of radius r centered at (cx, cy),
// drawn from the top (12 o'clock) clockwise around to the left (9 o'clock).
function arcPath(cx: number, cy: number, r: number) {
  const startX = cx
  const startY = cy - r
  const endX = cx - r
  const endY = cy
  return `M ${startX} ${startY} A ${r} ${r} 0 1 1 ${endX} ${endY}`
}

interface MarkProps {
  cx: number
  cy: number
  r: number
  arcR: number
}

function Mark({ cx, cy, r, arcR }: MarkProps) {
  // 270-degree arc length, used for the stroke draw-in animation
  const arcLength = 1.5 * Math.PI * arcR

  return (
    <>
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* left half dark */}
        <path
          d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} Z`}
          fill="#101010"
        />
        {/* right half light */}
        <path
          d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} Z`}
          fill="#E1E0CC"
        />
      </motion.g>
      <motion.path
        d={arcPath(cx, cy, arcR)}
        fill="none"
        stroke="#E1E0CC"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeDasharray={arcLength}
        initial={{ strokeDashoffset: arcLength, rotate: 0 }}
        animate={{ strokeDashoffset: 0, rotate: 360 }}
        transition={{
          strokeDashoffset: { duration: 1.2, ease: 'easeOut' },
          rotate: {
            duration: 8,
            ease: 'linear',
            repeat: Infinity,
            delay: 1.2,
          },
        }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
    </>
  )
}

export function AnimatedLogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Undark mark"
    >
      <Mark cx={20} cy={20} r={11} arcR={16} />
    </svg>
  )
}

export function AnimatedLogoLockup({ height = 32 }: { height?: number }) {
  return (
    <svg
      width={height * 3}
      height={height}
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Undark"
    >
      <Mark cx={20} cy={20} r={9} arcR={13} />
      <motion.text
        x={42}
        y={25}
        fill="#E1E0CC"
        fontFamily="'Almarai', sans-serif"
        fontWeight={300}
        fontSize={14}
        letterSpacing="0.2em"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        undark
      </motion.text>
    </svg>
  )
}
