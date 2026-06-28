import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Scale, Wallet, Gauge, AlertTriangle, ShieldCheck, ShieldAlert, Clock } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

type Sig = 'normal' | 'important' | 'critical'
type Compliance = 'ok' | 'attention' | 'violation'

const CASES = [
  {
    id: 'BFL-7741',
    borrower: 'Sunita Devi',
    lender: 'Bharat Financial · NBFC-MFI',
    state: 'Bihar',
    outstanding: '₹38,000',
    loanType: 'Personal · unsecured',
    stage: '142 DPD',
    lastPayment: 'Last paid ₹2,400 · 5 months ago',
    confidence: 'high' as const,
    summary: 'Two notices sent, no response in 5 months. Clean pre-litigation Lok Adalat candidate.',
    forum: 'Pre-litigation Lok Adalat',
    forumMeta: '~₹22K–28K settlement · ~45 days',
    timeline: [
      { time: '12 Aug 2025', text: 'Loan disbursed · ₹50,000 principal', sig: 'normal' as Sig },
      { time: '03 Nov 2025', text: 'Last payment received · ₹2,400', sig: 'important' as Sig },
      { time: '20 Jan 2026', text: 'First demand notice sent', sig: 'important' as Sig },
      { time: '15 Mar 2026', text: 'Second notice — no response', sig: 'critical' as Sig },
    ],
    risks: [
      { text: 'No contact in 5 months — borrower may have relocated', sig: 'important' as Sig },
    ],
    compliance: [
      { rule: 'RBI Fair Practice Code — written intimation', status: 'ok' as Compliance },
      { rule: 'Contact hours logged within 8 AM–7 PM', status: 'ok' as Compliance },
    ],
  },
  {
    id: 'AX-8821',
    borrower: 'Mohammed Irfan',
    lender: 'Axis-backed NBFC',
    state: 'Maharashtra',
    outstanding: '₹64,500',
    loanType: 'Business · unsecured',
    stage: '96 DPD',
    lastPayment: 'EMI cheque returned twice',
    confidence: 'medium' as const,
    summary: 'Two bounced cheques. Section 138 route open — but the 30-day clock is running.',
    forum: 'Section 138 NI Act notice',
    forumMeta: '~₹50K–60K settlement · ~90 days',
    timeline: [
      { time: '01 Sep 2025', text: 'Loan disbursed', sig: 'normal' as Sig },
      { time: '10 Feb 2026', text: "Cheque returned · 'insufficient funds'", sig: 'critical' as Sig },
      { time: '05 Mar 2026', text: 'Second cheque returned', sig: 'critical' as Sig },
    ],
    risks: [
      { text: '138 limitation: 30-day notice window from bank memo', sig: 'critical' as Sig },
    ],
    compliance: [
      { rule: 'Cooling-off period observed', status: 'ok' as Compliance },
      { rule: 'Bank return memo (2nd cheque) — not on file', status: 'attention' as Compliance },
    ],
  },
  {
    id: 'MT-3304',
    borrower: 'Lakshmi R',
    lender: 'Muthoot-type NBFC',
    state: 'Tamil Nadu',
    outstanding: '₹19,200',
    loanType: 'Personal · unsecured',
    stage: '71 DPD',
    lastPayment: 'Partial paid ₹3,000 · 6 weeks ago',
    confidence: 'high' as const,
    summary: 'Borrower responsive on WhatsApp. Direct settlement likely — no litigation needed.',
    forum: 'Direct settlement offer',
    forumMeta: '~₹14K–16K settlement · ~15 days',
    timeline: [
      { time: '18 Oct 2025', text: 'Loan disbursed', sig: 'normal' as Sig },
      { time: '02 Apr 2026', text: 'Partial payment · ₹3,000', sig: 'important' as Sig },
      { time: '11 May 2026', text: 'Borrower asked about settlement (WhatsApp)', sig: 'important' as Sig },
    ],
    risks: [
      { text: 'No red flags — documents consistent', sig: 'normal' as Sig },
    ],
    compliance: [
      { rule: 'Calls logged after 7 PM on 3 occasions', status: 'violation' as Compliance },
      { rule: 'Identity disclosed on every contact', status: 'ok' as Compliance },
    ],
  },
]

const sigDot: Record<Sig, string> = {
  normal: 'bg-gray-600',
  important: 'bg-primary/70',
  critical: 'bg-red-500/70',
}

const sigText: Record<Sig, string> = {
  normal: 'text-gray-400',
  important: 'text-gray-300',
  critical: 'text-red-400/90',
}

const confBadge: Record<'high' | 'medium' | 'low', string> = {
  high: 'border-green-500/30 text-green-400',
  medium: 'border-yellow-500/30 text-yellow-400/80',
  low: 'border-red-500/30 text-red-400/70',
}

const compMeta: Record<Compliance, { color: string; Icon: typeof ShieldCheck; label: string }> = {
  ok: { color: 'text-green-500', Icon: ShieldCheck, label: 'OK' },
  attention: { color: 'text-yellow-500', Icon: ShieldAlert, label: 'Attention' },
  violation: { color: 'text-red-400', Icon: ShieldAlert, label: 'Violation' },
}

export default function ProductPreview() {
  const [selected, setSelected] = useState(0)
  const c = CASES[selected]

  return (
    <section className="bg-black px-4 md:px-6 pb-8">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className="nav-shimmer-border rounded-2xl p-[1px]">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ backdropFilter: 'saturate(180%) blur(20px)', backgroundColor: 'rgba(10,10,10,0.95)' }}
        >
          {/* title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="flex-1 flex justify-center">
              <div className="rounded-md px-4 py-1 text-[11px] text-gray-600 border border-white/[0.06]"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                app.undark.in/case/{c.id}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-gray-500">Reconstructed</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* sidebar — case list */}
            <div className="border-r border-white/[0.06] p-4 hidden md:block">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-3">Cases</p>
              <div className="flex flex-col gap-1">
                {CASES.map((a, i) => (
                  <button
                    key={a.id}
                    onClick={() => setSelected(i)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 w-full text-left transition-all duration-200 ${
                      selected === i
                        ? 'bg-white/[0.06] border border-white/[0.1]'
                        : 'hover:bg-white/[0.03] border border-transparent'
                    }`}
                  >
                    <div>
                      <p className="text-primary text-xs font-medium">{a.borrower}</p>
                      <p className="text-gray-600 text-[10px]">{a.outstanding} · {a.stage}</p>
                    </div>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      a.confidence === 'high' ? 'bg-green-500' :
                      a.confidence === 'medium' ? 'bg-yellow-500/70' : 'bg-red-500/60'
                    }`} />
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">This practice</p>
                <p className="text-primary text-sm font-medium">42 cases this month</p>
                <p className="text-gray-600 text-[10px]">31 settled pre-litigation · avg setup 38s</p>
              </div>
            </div>

            {/* main panel — the workspace */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                className="md:col-span-2 p-5 md:p-6"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">Case workspace</p>
                    <p className="text-primary text-base font-medium">
                      {c.borrower} <span className="text-gray-600 font-normal text-sm">· {c.id}</span>
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">{c.lender} · {c.state}</p>
                  </div>
                  <span className={`text-[10px] border rounded-full px-2 py-0.5 capitalize ${confBadge[c.confidence]}`}>
                    {c.confidence} confidence
                  </span>
                </div>

                {/* one-line analyst summary */}
                <p className="text-primary/80 text-[13px] leading-relaxed mb-5 pl-3 border-l border-primary/20">
                  {c.summary}
                </p>

                {/* fact cards */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="rounded-xl p-3 border border-white/[0.07]" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Wallet size={12} className="text-gray-500" />
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider">Outstanding</p>
                    </div>
                    <p className="text-primary text-xs font-medium">{c.outstanding}</p>
                    <p className="text-gray-600 text-[10px]">{c.loanType}</p>
                  </div>
                  <div className="rounded-xl p-3 border border-white/[0.07]" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Gauge size={12} className="text-gray-500" />
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider">Stage</p>
                    </div>
                    <p className="text-primary text-xs font-medium">{c.stage}</p>
                    <p className="text-gray-600 text-[10px]">{c.lastPayment}</p>
                  </div>
                  <div className="rounded-xl p-3 border border-white/[0.07]" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Scale size={12} className="text-gray-500" />
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider">Next move</p>
                    </div>
                    <p className="text-primary text-xs font-medium">{c.forum}</p>
                    <p className="text-gray-600 text-[10px]">{c.forumMeta}</p>
                  </div>
                </div>

                {/* timeline */}
                <div className="mb-5">
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">Timeline</p>
                  <div className="flex flex-col gap-1.5">
                    {c.timeline.map((t, i) => (
                      <div key={i} className="flex items-center gap-3 text-[11px]">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${sigDot[t.sig]}`} />
                        <span className="text-gray-600 w-24 shrink-0">{t.time}</span>
                        <span className={sigText[t.sig]}>{t.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* risks | compliance — deliberately separate */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">Risks</p>
                    <div className="flex flex-col gap-1.5">
                      {c.risks.map((r, i) => (
                        <div key={i} className="flex items-start gap-2 text-[11px]">
                          <AlertTriangle size={12} className={`shrink-0 mt-px ${r.sig === 'critical' ? 'text-red-400' : r.sig === 'important' ? 'text-yellow-500' : 'text-gray-600'}`} />
                          <span className="text-gray-400">{r.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="sm:border-l border-white/[0.06] sm:pl-4">
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">Compliance</p>
                    <div className="flex flex-col gap-1.5">
                      {c.compliance.map((f, i) => {
                        const m = compMeta[f.status]
                        return (
                          <div key={i} className="flex items-start gap-2 text-[11px]">
                            {f.status === 'ok'
                              ? <ShieldCheck size={12} className={`shrink-0 mt-px ${m.color}`} />
                              : f.status === 'attention'
                              ? <Clock size={12} className={`shrink-0 mt-px ${m.color}`} />
                              : <ShieldAlert size={12} className={`shrink-0 mt-px ${m.color}`} />}
                            <span className="text-gray-400">{f.rule}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        </div>
      </motion.div>
    </section>
  )
}
