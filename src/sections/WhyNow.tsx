import { motion } from 'framer-motion'
import { WordsPullUp } from '../components/TextAnimations'

const CARDS = [
  {
    title: 'Everyone builds for the lender',
    body: 'Enterprise recovery software manages millions of borrowers for banks and large NBFCs. The practitioner actually working the file — the small agency, the boutique firm, the independent expert — has no tool built for them. That is the gap.',
  },
  {
    title: 'The moat is captured expertise',
    body: "Undark doesn't ask the model to know the law. It captures how real practitioners work — forums, what a notice must contain, what each step needs — structures it, and grounds every answer in it. Knowledge first, model second. Hard to copy, because the knowledge is the product.",
  },
  {
    title: 'Reliable enough to trust',
    body: 'A model can now read a stack of mixed scans, statements, and chat exports without making things up — and deterministic retrieval keeps it honest. No invented sections, no invented RBI rules, confidence that drops when evidence is thin. The boring work is finally safe to automate.',
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
          text="The model is finally good enough to read a messy case file. Nobody has pointed it at the practitioner."
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
