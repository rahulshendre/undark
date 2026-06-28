import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check, Upload, ScanText, Gavel } from 'lucide-react'
import { WordsPullUpMultiStyle } from '../components/TextAnimations'

const CARDS = [
  {
    number: '01',
    title: 'Upload everything.',
    icon: Upload,
    items: [
      'Drop the whole pile — PDFs, scans, bank statements, notices, WhatsApp exports, call logs',
      'OCR reads the scans, pdf-parse reads the rest — all server-side, never in the browser',
      'No tagging, no forms, no folder structure to learn first',
      'Sensitive data handled with care — document contents are never logged',
    ],
  },
  {
    number: '02',
    title: 'Reconstruct the case.',
    icon: ScanText,
    items: [
      'Facts pulled straight from the documents — borrower, outstanding, DPD, security, last payment',
      "An analyst's read on top: clean timeline, missing documents, risks, and compliance gates",
      'Every claim grounded in a sourced knowledge base, not the model’s memory',
      'Honest nulls and stated confidence — it tells you what it could not find',
    ],
  },
  {
    number: '03',
    title: 'Work the case.',
    icon: Gavel,
    items: [
      'One workspace: summary, timeline, risks, compliance, and the recommended next move',
      'Right forum surfaced — Lok Adalat, Section 138 NI Act, Summary Suit, SARFAESI, DRT',
      'An editable notice drafted from a template — you review, you send. Never auto-sent.',
      'Understand a case in under a minute instead of thirty',
    ],
  },
]

function Card({
  card,
  index,
}: {
  card: (typeof CARDS)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const Icon = card.icon

  return (
    <motion.div
      ref={ref}
      className="group/card relative overflow-hidden rounded-2xl p-6 md:p-8 flex flex-col border border-white/[0.08] hover:border-white/[0.15] transition-colors"
      style={{ backdropFilter: 'saturate(180%) blur(12px)', backgroundColor: 'rgba(255,255,255,0.03)' }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      whileHover={{ y: -6 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
        e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(225, 224, 204, 0.07), transparent 70%)',
        }}
      />
      {/* watermark number */}
      <div
        className="pointer-events-none absolute -right-3 -bottom-5 text-[9rem] font-bold leading-none select-none text-white/[0.04] group-hover/card:text-white/[0.07] transition-colors duration-500"
        aria-hidden
      >
        {card.number}
      </div>
      <Icon
        className="text-primary mb-6 transition-transform duration-300 group-hover/card:scale-110 group-hover/card:-rotate-6"
        size={24}
      />
      <h3 className="text-primary text-xl md:text-2xl font-medium mb-8">
        {card.title}{' '}
        <span className="text-gray-500 text-sm align-top transition-colors duration-300 group-hover/card:text-primary">
          ({card.number})
        </span>
      </h3>
      <ul className="flex flex-col gap-4 flex-1">
        {card.items.map((item, i) => (
          <motion.li
            key={item}
            className="flex items-start gap-3"
            initial={{ x: -10, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.3 + i * 0.1, duration: 0.4 }}
          >
            <motion.span
              className="shrink-0 mt-0.5"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{
                delay: index * 0.15 + 0.4 + i * 0.1,
                type: 'spring',
                stiffness: 300,
                damping: 15,
              }}
            >
              <Check className="text-primary" size={16} />
            </motion.span>
            <span className="text-gray-400 text-sm">{item}</span>
          </motion.li>
        ))}
      </ul>
      <a
        href="#contact"
        className="inline-flex items-center gap-2 hover:gap-3 text-primary text-sm mt-8 group transition-all"
      >
        Learn more
        <ArrowRight
          size={16}
          className="-rotate-45 transition-transform duration-300 group-hover:rotate-0"
        />
      </a>
    </motion.div>
  )
}

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative min-h-screen bg-black px-4 md:px-6 py-16 md:py-24"
    >
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <WordsPullUpMultiStyle
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal mb-12 md:mb-20"
          segments={[
            {
              text: 'Undark does the boring half. ',
              className: 'text-primary block',
            },
            {
              text: 'It reconstructs the case so the practitioner starts where judgment begins — and never replaces it.',
              className: 'text-gray-500 block',
            },
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:h-[480px] gap-3 sm:gap-2 md:gap-1">
          {CARDS.map((card, i) => (
            <Card key={card.number} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
