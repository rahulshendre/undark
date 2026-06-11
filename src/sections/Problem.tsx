import { motion } from 'framer-motion'
import {
  WordsPullUpMultiStyle,
  AnimatedParagraph,
} from '../components/TextAnimations'

const STATS = [
  {
    value: 'Rs.4,000-5,000 Cr',
    label: 'written off annually in sub-Rs.1L unsecured loans',
  },
  {
    value: '16%',
    label: 'MFI gross NPA as of March 2025',
  },
  {
    value: 'Rs.480-850',
    label: 'cost per field visit vs Rs.10K loan value',
  },
]

export default function Problem() {
  return (
    <section id="problem" className="bg-black px-4 md:px-6 py-16 md:py-24">
      <div className="bg-[#101010] rounded-2xl md:rounded-[2rem] max-w-6xl mx-auto text-center px-6 py-16 md:px-12 md:py-24">
        <p className="text-primary text-[10px] sm:text-xs mb-8 tracking-widest uppercase">
          The problem
        </p>

        <WordsPullUpMultiStyle
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9]"
          style={{ color: '#E1E0CC' }}
          segments={[
            { text: "Sub-Rs.1L loans don't get recovered.", className: 'font-normal' },
            { text: 'They get written off.', className: 'italic font-serif' },
            {
              text: 'Rs.4,000-5,000 crore every year, quietly.',
              className: 'font-normal',
            },
          ]}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 mt-14 md:mt-20 max-w-4xl mx-auto">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <p className="text-primary text-4xl font-bold">{stat.value}</p>
              <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <AnimatedParagraph
          className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-14 md:mt-20"
          style={{ color: '#DEDBC8' }}
          text="When a borrower stops paying on a Rs.10,000 loan, the lender has no good option. Sending a field agent costs more than the loan is worth. Digital channels fail once a borrower goes silent. So the loan gets written off. No funded technology company is solving this specifically."
        />
      </div>
    </section>
  )
}
