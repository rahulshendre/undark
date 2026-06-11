import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { AnimatedLogoMark } from '../components/AnimatedLogo'
import { Magnetic } from '../components/Magnetic'
import { WordsPullUp } from '../components/TextAnimations'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Contact() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="contact" className="bg-black px-4 md:px-6 py-20 md:py-32">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
        <motion.div
          className="mb-10"
          whileHover={{ rotate: 180, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatedLogoMark size={80} />
        </motion.div>

        <WordsPullUp
          text="We are onboarding our first three NBFC partners."
          className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight"
          style={{ color: '#E1E0CC' }}
        />

        <p className="text-primary/70 text-sm md:text-base max-w-xl mx-auto mt-6">
          If you run collections for an NBFC or MFI and sub-Rs.1L write-offs
          are a real problem for you, we want to talk.
        </p>

        <motion.form
          className="flex flex-col sm:flex-row items-center gap-3 mt-10 w-full max-w-md"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          onSubmit={(e) => {
            e.preventDefault()
            if (email.trim()) setSubmitted(true)
          }}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 w-full bg-transparent border border-primary/30 rounded-full px-5 py-3 text-sm text-primary placeholder:text-gray-500 focus:outline-none focus:border-primary/70 focus:shadow-[0_0_0_3px_rgba(222,219,200,0.1)] transition-all duration-300"
          />
          <Magnetic strength={0.25} className="shrink-0">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 hover:gap-3 bg-primary rounded-full pl-5 pr-2 py-2 text-black font-medium text-sm sm:text-base shrink-0 transition-all"
            >
              Request access
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black transition-transform group-hover:scale-110">
                <ArrowRight size={16} color="#E1E0CC" />
              </span>
            </motion.button>
          </Magnetic>
        </motion.form>
        {submitted && (
          <p className="text-primary/70 text-xs mt-4">
            Thanks — we'll be in touch.
          </p>
        )}

      </div>
    </section>
  )
}
