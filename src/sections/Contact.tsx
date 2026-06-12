import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Magnetic } from '../components/Magnetic'

const EASE = [0.16, 1, 0.3, 1] as const

const VALUE_PROPS = [
  { label: 'Pilot partner', sub: 'First 3–5 lenders only' },
  { label: 'Agent side free', sub: 'Network compounds on its own' },
  { label: 'One-click audit', sub: 'Inspection answers in minutes' },
]

// Replace with your Formspree form ID from formspree.io
const FORMSPREE_ID = 'YOUR_FORM_ID'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, company: form.company }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        // fallback to mailto if Formspree not configured
        window.location.href = `mailto:hello@undark.in?subject=Early access – ${encodeURIComponent(form.company)}&body=Name: ${encodeURIComponent(form.name)}%0ACompany: ${encodeURIComponent(form.company)}%0AEmail: ${encodeURIComponent(form.email)}`
        setSubmitted(true)
      }
    } catch {
      window.location.href = `mailto:hello@undark.in?subject=Early access – ${encodeURIComponent(form.company)}`
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full rounded-xl px-4 py-3 text-sm text-primary placeholder:text-gray-600 focus:outline-none focus:border-white/25 transition-all duration-200 border border-white/[0.1]"
  const inputStyle = { backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255,255,255,0.04)' }

  return (
    <section id="contact" className="bg-black px-4 md:px-6 py-20 md:py-32">
      <motion.div
        className="nav-shimmer-border rounded-2xl md:rounded-3xl p-[1px] max-w-5xl mx-auto"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
      >
      <div
        className="relative overflow-hidden rounded-2xl md:rounded-3xl"
        style={{ backgroundColor: 'rgba(14,14,14,0.95)' }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left */}
          <div className="p-8 md:p-12 flex flex-col justify-between gap-10 lg:border-r border-white/[0.06]">
            <div>
              <p className="text-primary/50 text-[10px] tracking-widest uppercase mb-5">Get in touch</p>
              <h2 className="text-primary text-2xl md:text-3xl lg:text-4xl font-normal leading-tight mb-4">
                Pilot the rail with one lender's agencies.
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                If you run compliance or collections at an RBI-regulated lender and agent-conduct liability is a live problem, we want to talk. Via IIMA Ventures network.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {VALUE_PROPS.map((vp) => (
                <div
                  key={vp.label}
                  className="rounded-xl p-3 border border-white/[0.07]"
                  style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                >
                  <p className="text-primary text-xs font-medium">{vp.label}</p>
                  <p className="text-gray-600 text-[11px] mt-0.5 leading-tight">{vp.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form card */}
          <div className="p-8 md:p-12">
            <h3 className="text-primary text-lg font-medium mb-1">Request access</h3>
            <p className="text-gray-600 text-xs mb-6">For compliance officers at RBI-regulated lenders</p>

            {submitted ? (
              <motion.div
                className="flex flex-col items-center justify-center h-48 gap-3 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary text-lg">✓</div>
                <p className="text-primary font-medium">Thanks — we'll be in touch.</p>
                <p className="text-gray-600 text-xs">hello@undark.in</p>
              </motion.div>
            ) : (
              <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                  style={inputStyle}
                />
                <input
                  type="email"
                  required
                  placeholder="Work email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                  style={inputStyle}
                />
                <input
                  type="text"
                  required
                  placeholder="NBFC / MFI name"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className={inputClass}
                  style={inputStyle}
                />
                <Magnetic strength={0.2} className="mt-1">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full inline-flex items-center justify-between rounded-xl pl-5 pr-2 py-3 text-primary font-medium text-sm transition-all border border-primary/25 hover:border-primary/50 disabled:opacity-50"
                    style={{ backdropFilter: 'saturate(180%) blur(12px)', backgroundColor: 'rgba(225,224,204,0.08)' }}
                  >
                    {loading ? 'Sending…' : 'Request access'}
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg border border-primary/20 bg-primary/10 transition-transform group-hover:scale-110">
                      <ArrowRight size={15} color="#E1E0CC" />
                    </span>
                  </motion.button>
                </Magnetic>
                <p className="text-gray-700 text-[10px] text-center mt-1">
                  hello@undark.in · we only use your details to coordinate onboarding
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
      </motion.div>
    </section>
  )
}
