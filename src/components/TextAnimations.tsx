import { useRef } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'

interface WordsPullUpProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

export function WordsPullUp({ text, className = '', style }: WordsPullUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')

  return (
    <div ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </div>
  )
}

export interface StyledSegment {
  text: string
  className?: string
}

interface WordsPullUpMultiStyleProps {
  segments: StyledSegment[]
  className?: string
  style?: React.CSSProperties
}

export function WordsPullUpMultiStyle({
  segments,
  className = '',
  style,
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  let wordIndex = 0

  return (
    <div ref={ref} className={className} style={style}>
      {segments.map((segment, si) => {
        const words = segment.text.split(' ')
        return (
          <span key={si} className={segment.className}>
            {words.map((word, wi) => {
              const delay = wordIndex * 0.08
              wordIndex += 1
              return (
                <span
                  key={wi}
                  className="inline-block overflow-hidden align-bottom"
                >
                  <motion.span
                    className="inline-block"
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{
                      delay,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}
                    {' '}
                  </motion.span>
                </span>
              )
            })}
          </span>
        )
      })}
    </div>
  )
}

function AnimatedLetter({
  letter,
  progress,
  range,
}: {
  letter: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return <motion.span style={{ opacity }}>{letter}</motion.span>
}

interface AnimatedParagraphProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

export function AnimatedParagraph({
  text,
  className = '',
  style,
}: AnimatedParagraphProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.25'],
  })

  const characters = text.split('')

  return (
    <p ref={ref} className={className} style={style}>
      {characters.map((char, i) => {
        const start = i / characters.length
        const end = start + 1 / characters.length
        return (
          <AnimatedLetter
            key={i}
            letter={char}
            progress={scrollYProgress}
            range={[start, end]}
          />
        )
      })}
    </p>
  )
}
