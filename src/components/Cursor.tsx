import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function Cursor() {
  const [visible, setVisible] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const dotX = useSpring(mouseX, { stiffness: 2000, damping: 80 })
  const dotY = useSpring(mouseY, { stiffness: 2000, damping: 80 })
  const ringX = useSpring(mouseX, { stiffness: 200, damping: 28 })
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 28 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const down = () => setClicking(true)
    const up = () => setClicking(false)
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setHovering(!!el.closest('a, button, [data-cursor-hover]'))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('mouseover', over)
    }
  }, [visible, mouseX, mouseY])

  if (!visible) return null

  return (
    <>
      {/* dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-primary"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ width: clicking ? 6 : 5, height: clicking ? 6 : 5 }}
        transition={{ duration: 0.1 }}
      />
      {/* ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-primary/50"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovering ? 44 : clicking ? 24 : 32,
          height: hovering ? 44 : clicking ? 24 : 32,
          opacity: hovering ? 0.6 : 0.35,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  )
}
