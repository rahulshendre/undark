import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  WordsPullUpMultiStyle,
  AnimatedParagraph,
} from '../components/TextAnimations'

function CountUp({ to, duration = 1.8, prefix = '', suffix = '', separator = true }: {
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  separator?: boolean
}) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setVal(Math.round(eased * to))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, duration])

  const formatted = separator ? val.toLocaleString('en-IN') : val

  return <span ref={ref}>{prefix}{formatted}{suffix}</span>
}

const STATS = [
  {
    render: () => <>Rs.4–5K Cr</>,
    label: 'written off yearly, sub-Rs.1L unsecured loans',
  },
  {
    render: () => <><CountUp to={16} separator={false} />%</>,
    label: 'MFI gross NPA, March 2025',
  },
  {
    render: () => <>Rs.480–850</>,
    label: 'cost per field visit against a Rs.10K loan — the math does not work',
  },
]

export default function Problem() {
  return (
    <section id="problem" className="bg-black px-4 md:px-6 py-16 md:py-24">
      <div className="relative overflow-hidden rounded-2xl md:rounded-[2rem] max-w-6xl mx-auto text-center px-6 py-16 md:px-12 md:py-24 border border-white/[0.07]" style={{ backdropFilter: 'saturate(180%) blur(12px)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        <p className="text-primary text-[10px] sm:text-xs mb-8 tracking-widest uppercase">
          The problem
        </p>

        <WordsPullUpMultiStyle
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9]"
          style={{ color: '#E1E0CC' }}
          segments={[
            { text: 'Nobody starts from the one constraint that actually matters.', className: 'font-normal' },
            { text: 'The cost per contact has to be lower than the loan value.', className: 'italic font-serif' },
          ]}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 mt-14 md:mt-20 max-w-4xl mx-auto">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <p className="text-primary text-4xl font-bold tabular-nums">
                {stat.render()}
              </p>
              <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <AnimatedParagraph
          className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-14 md:mt-20"
          style={{ color: '#DEDBC8' }}
          text="India's MFIs and small NBFCs disburse crores of small-ticket loans every year — averaging Rs.10,000 to Rs.75,000 — to borrowers across Tier-2 and Tier-3 India. When these go bad there is no real recovery option. Field agents cost more per visit than the loan is worth, and digital channels stop working once a borrower crosses 90 days. So the loan gets written off, at scale, quietly, every month. Rs.4,000–5,000 Cr in annual write-offs surprises no one in the space. It is treated as acceptable loss because there is no better answer."
        />
      </div>
    </section>
  )
}
