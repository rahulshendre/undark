import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { AnimatedLogoLockup } from '../components/AnimatedLogo'
import { Magnetic } from '../components/Magnetic'
import { WordsPullUp } from '../components/TextAnimations'

const EASE = [0.16, 1, 0.3, 1] as const

const NAV_ITEMS = [
  { label: 'Problem', href: '#problem' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Why now', href: '#why-now' },
  { label: 'Talk to us', href: '#contact' },
]

export default function Hero() {
  return (
    <section className="h-screen p-4 md:p-6">
      <div className="relative h-full w-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            className="flex items-center bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 gap-3 sm:gap-6 md:gap-12 lg:gap-14"
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <a href="#" aria-label="Undark home" className="shrink-0">
              <AnimatedLogoLockup height={28} />
            </a>
            <div className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="nav-link text-[10px] sm:text-xs md:text-sm whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 md:px-8 pb-4 md:pb-8">
          <div className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-12 lg:col-span-8">
              <WordsPullUp
                text="Undark"
                className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em]"
                style={{ color: '#E1E0CC' }}
              />
            </div>
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 sm:gap-6 pb-2 lg:pb-6">
              <motion.p
                className="text-primary/70 text-xs sm:text-sm md:text-base"
                style={{ lineHeight: 1.2 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
              >
                AI recovery infrastructure for sub-Rs.1L loans. We make
                small-ticket debt recovery economically viable for NBFCs and
                MFIs.
              </motion.p>
              <motion.div
                className="w-fit"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
              >
                <Magnetic>
                  <motion.a
                    href="#contact"
                    className="group inline-flex items-center gap-2 hover:gap-3 bg-primary rounded-full pl-5 pr-2 py-2 text-black font-medium text-sm sm:text-base w-fit transition-all"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Request early access
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black transition-transform group-hover:scale-110">
                      <ArrowRight size={16} color="#E1E0CC" />
                    </span>
                  </motion.a>
                </Magnetic>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
