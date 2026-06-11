import { motion } from 'framer-motion'
import { WordsPullUp } from '../components/TextAnimations'

const CARDS = [
  {
    title: 'MFI stress at a 7-year high',
    body: 'Gross NPA at 16% as of March 2025, up from 8.8% a year prior. Lenders are losing money they have no mechanism to recover.',
  },
  {
    title: 'Human infrastructure is broken',
    body: "Certified recovery agents don't exist in Tier-3/4/5 cities. The NBFC industry body is lobbying RBI to ease requirements because the people aren't there.",
  },
  {
    title: 'Zero funded tech players here',
    body: 'Credgenics, DPDzero, Riverline — all built for digital-first Tier-1 borrowers. Sub-Rs.1L MFI borrowers in cash-economy India have nobody.',
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
          text="The infrastructure for small-ticket recovery doesn't exist. We're building it."
          className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight max-w-3xl mx-auto"
          style={{ color: '#E1E0CC' }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14 md:mt-20 text-left">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              className="bg-[#101010] rounded-2xl p-6 border border-transparent hover:border-primary/15 transition-colors"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
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
