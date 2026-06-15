const ITEMS = [
  'Rs.4,000–5,000 Cr · Written off yearly, sub-Rs.1L unsecured loans',
  '16% · MFI gross NPA, March 2025',
  'Rs.480–850 · Cost per field visit vs Rs.10K loan — economics broken at unit level',
  '0 · Funded tech players in the sub-Rs.1L NPA segment',
  'Rs.12–25 · AI voice outreach cost per resolved contact',
  '90 DPD · Digital-only recovery fails past this point — field still needed, but smarter',
]

export function StatsTicker() {
  const repeated = [...ITEMS, ...ITEMS]

  return (
    <div className="bg-black border-y border-white/[0.06] py-3 overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap w-max">
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 text-[11px] text-gray-500 px-8">
            {item}
            <span className="text-white/10">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
