import { motion } from 'framer-motion'
import { WordsPullUp } from '../components/TextAnimations'

const CARDS = [
  {
    title: 'Zero funded tech players in this segment',
    body: 'Existing recovery tools serve digital-first or larger-ticket borrowers. Nobody has built for sub-Rs.1L NPA at MFI scale. The gap is not an oversight — it is a hard constraint nobody has solved.',
  },
  {
    title: 'The gig model already failed',
    body: "Prior attempts used gig-agent models with no intelligence layer — 78% headcount decline year-on-year. Unit economics don't work without smarter routing. That is the problem we solve.",
  },
  {
    title: 'Countercyclical',
    body: 'As MFI stress rises, the product gets more valuable. 16% gross NPA and climbing. The worse the portfolio quality, the more lenders need an economically viable recovery path for accounts they currently write off.',
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
          text="The gap is real. The timing is right. And the product gets more valuable as the stress rises."
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
