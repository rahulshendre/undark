import { motion } from 'framer-motion'
import { WordsPullUp } from '../components/TextAnimations'

const CARDS = [
  {
    title: 'RBI Draft Directions — Oct 2026',
    body: 'Every contact becomes an auditable event across nine RE categories upon notification. Recorded calls, 8am–7pm hours, identity disclosure, authorization letters on every visit, public agency lists. The mandate already exists — the draft is the accelerant.',
  },
  {
    title: 'Lender liability is current law',
    body: 'Rs.2.5 Cr penalty on Bajaj Finance for agent harassment (2021). Rs.1.86 Cr on CSB Bank for outsourcing governance lapses (2024). 62 NBFCs penalised in 2023–25. The lender is liable for every agent\'s conduct — today.',
  },
  {
    title: 'No neutral rail exists',
    body: 'A platform auditing its own contacts is self-certification. An agent\'s conduct history must travel across agencies and platforms. Only a neutral party can hold it. Incumbents are disqualified by what they are.',
  },
]

export default function WhyNow() {
  return (
    <section id="why-now" className="bg-black px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-primary text-xs mb-8 tracking-widest uppercase">
          Why now
        </p>
        <WordsPullUp
          text="The credential stack digitizes exactly once. The first neutral rail in place becomes the standard."
          className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight max-w-3xl mx-auto"
          style={{ color: '#E1E0CC' }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14 md:mt-20 text-left">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              className="relative overflow-hidden rounded-2xl p-6 border border-white/[0.08] hover:border-white/[0.15] transition-colors"
              style={{ backdropFilter: 'saturate(180%) blur(12px)', backgroundColor: 'rgba(255,255,255,0.03)' }}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
              <h3 className="text-primary font-medium mb-3">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
