import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, IdCard, QrCode, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

const AGENTS = [
  {
    id: 'DRA-2241',
    name: 'Arjun Mehta',
    agency: 'Credforce Recoveries',
    cert: 'IIBF DRA Certified',
    certExpiry: 'Valid until Mar 2026',
    status: 'active',
    statusLabel: 'On assignment',
    assignments: 3,
    log: [
      { time: '10:42', text: 'Contact initiated · Borrower verified QR · Identity disclosed', type: 'success' },
      { time: '09:15', text: 'Assignment accepted · Axis NBFC · Account #AX-8821', type: 'success' },
      { time: 'Yesterday', text: 'Contact completed · Call recorded · Within hours', type: 'success' },
    ],
  },
  {
    id: 'DRA-1887',
    name: 'Priya Nair',
    agency: 'Suraksha Field Services',
    cert: 'IIBF DRA Certified',
    certExpiry: 'Valid until Aug 2026',
    status: 'verified',
    statusLabel: 'Available',
    assignments: 1,
    log: [
      { time: '11:00', text: 'New assignment received · Muthoot Finance · Account #MT-3304', type: 'success' },
      { time: '10:30', text: 'Background check refreshed · Cleared', type: 'success' },
      { time: '2 days ago', text: 'Contact completed · Borrower confirmed payment intent', type: 'success' },
    ],
  },
  {
    id: 'DRA-3312',
    name: 'Ravi Sharma',
    agency: 'FastTrack Collections',
    cert: 'Cert renewal pending',
    certExpiry: 'Expired 12 Jan 2026',
    status: 'blocked',
    statusLabel: 'Blocked',
    assignments: 0,
    log: [
      { time: 'Today', text: 'Assignment attempt blocked · DRA certification expired', type: 'error' },
      { time: '3 days ago', text: 'Renewal reminder sent · IIBF portal link shared', type: 'warn' },
      { time: '5 days ago', text: 'Cert expiry flagged by system · Lender notified', type: 'warn' },
    ],
  },
]

export default function ProductPreview() {
  const [selected, setSelected] = useState(0)
  const agent = AGENTS[selected]

  const statusBadge = agent.status === 'active'
    ? 'border-green-500/30 text-green-400'
    : agent.status === 'verified'
    ? 'border-primary/20 text-primary/60'
    : 'border-red-500/30 text-red-400/70'

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
                app.undark.in/agents
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-gray-500">Live</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* sidebar */}
            <div className="border-r border-white/[0.06] p-4 hidden md:block">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-3">Agent Registry</p>
              <div className="flex flex-col gap-1">
                {AGENTS.map((a, i) => (
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
                      <p className="text-primary text-xs font-medium">{a.name}</p>
                      <p className="text-gray-600 text-[10px]">{a.agency}</p>
                    </div>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      a.status === 'active' ? 'bg-green-500' :
                      a.status === 'verified' ? 'bg-primary/60' : 'bg-red-500/60'
                    }`} />
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">This lender</p>
                <p className="text-primary text-sm font-medium">847 agents</p>
                <p className="text-gray-600 text-[10px]">across 12 agencies · 2 blocked</p>
              </div>
            </div>

            {/* main panel */}
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
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">Agent Passport</p>
                    <p className="text-primary text-base font-medium">
                      {agent.name} <span className="text-gray-600 font-normal text-sm">· {agent.id}</span>
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">{agent.agency}</p>
                  </div>
                  <span className={`text-[10px] border rounded-full px-2 py-0.5 ${statusBadge}`}>
                    {agent.statusLabel}
                  </span>
                </div>

                {/* credential cards */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="rounded-xl p-3 border border-white/[0.07]" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <IdCard size={12} className="text-gray-500" />
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider">Certification</p>
                    </div>
                    <p className={`text-xs font-medium ${agent.status === 'blocked' ? 'text-red-400' : 'text-primary'}`}>
                      {agent.cert}
                    </p>
                    <p className="text-gray-600 text-[10px]">{agent.certExpiry}</p>
                  </div>
                  <div className="rounded-xl p-3 border border-white/[0.07]" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <ShieldCheck size={12} className="text-gray-500" />
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider">Assignments</p>
                    </div>
                    <p className="text-primary text-xs font-medium">{agent.assignments} active</p>
                    <p className="text-gray-600 text-[10px]">
                      {agent.status === 'blocked' ? 'New assignments blocked' : 'Authorization letters issued'}
                    </p>
                  </div>
                  <div className="rounded-xl p-3 border border-white/[0.07]" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <QrCode size={12} className="text-gray-500" />
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider">Borrower QR</p>
                    </div>
                    <p className={`text-xs font-medium ${agent.status === 'blocked' ? 'text-red-400' : 'text-primary'}`}>
                      {agent.status === 'blocked' ? 'Disabled' : 'Active'}
                    </p>
                    <p className="text-gray-600 text-[10px]">
                      {agent.status === 'blocked' ? 'Cert required to activate' : 'Scan to verify identity'}
                    </p>
                  </div>
                </div>

                {/* activity log */}
                <div>
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">Activity log</p>
                  <div className="flex flex-col gap-1.5">
                    {agent.log.map((log, i) => (
                      <div key={i} className="flex items-center gap-3 text-[11px]">
                        {log.type === 'success'
                          ? <CheckCircle2 size={12} className="text-green-500 shrink-0" />
                          : log.type === 'error'
                          ? <AlertCircle size={12} className="text-red-400 shrink-0" />
                          : <Clock size={12} className="text-yellow-500 shrink-0" />
                        }
                        <span className="text-gray-600 w-16 shrink-0">{log.time}</span>
                        <span className="text-gray-400">{log.text}</span>
                      </div>
                    ))}
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
