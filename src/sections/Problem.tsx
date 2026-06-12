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
    render: () => <><CountUp to={62} separator={false} /></>,
    label: 'NBFCs penalised 2023–25 for outsourced-agent conduct failures',
  },
  {
    render: () => <><CountUp to={103} separator={false} />%</>,
    label: 'frontline recovery-agent attrition — credentials re-verified from scratch every job change',
  },
  {
    render: () => <>4,<CountUp to={600} separator={false} />+</>,
    label: 'agents for one NBFC across 100+ agencies, with no proof of visits on file',
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
            { text: "An agent's legal right to work is a stack of credentials.", className: 'font-normal' },
            { text: 'Today that entire stack is paper.', className: 'italic font-serif' },
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
          text="Every recovery agent must hold IIBF DRA certification — sole certifier, RBI mandate. The lender is liable for every agent's conduct: Rs.2.5 Cr penalty on Bajaj Finance (2021), Rs.1.86 Cr on CSB Bank (2024). RBI's draft directions add per-contact duties by Oct 2026: recorded calls, identity disclosure, authorization letters on every visit. Yet certificates sit in drawers, authorizations travel as WhatsApp forwards, and borrowers cannot verify who is at their door."
        />
      </div>
    </section>
  )
}
