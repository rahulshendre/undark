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
    render: () => <>20–40<span className="text-2xl"> min</span></>,
    label: 'to understand a single case before any real work can begin',
  },
  {
    render: () => <><CountUp to={8} separator={false} />+</>,
    label: 'places the file is scattered — PDFs, notices, statements, WhatsApp, Excel, call logs',
  },
  {
    render: () => <>{'<'}1<span className="text-2xl"> min</span></>,
    label: 'to rebuild the same case as a clean, evidenced workspace in Undark',
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
            { text: 'Before an expert can think about a case, they spend half an hour rebuilding it by hand.', className: 'font-normal' },
            { text: 'The bottleneck was never judgment. It is everything before judgment.', className: 'italic font-serif' },
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
          text="An experienced recovery practitioner already knows the law and the forums. What slows them down is mechanical. The loan agreement sits in one PDF, the notices in another, a bank statement somewhere else, a WhatsApp export, an Excel sheet of call attempts, scribbled borrower notes, a stack of scans. Before any judgment, they reconstruct the case by hand — every morning, every file, twenty to forty minutes a time. That reconstruction is the bottleneck. It does not need intelligence. It needs to disappear."
        />
      </div>
    </section>
  )
}
