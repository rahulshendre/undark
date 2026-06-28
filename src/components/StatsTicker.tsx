const ITEMS = [
  '20–40 min · Spent rebuilding a single case by hand before work even starts',
  '8+ sources · Loan agreement, notices, bank statements, WhatsApp, Excel, call logs',
  '< 1 min · To reconstruct the same case as a clean workspace',
  '≈₹3.25 lakh Cr · Microfinance loans outstanding, Q4 FY26 — the small-ticket pool defaults come from (MFIN)',
  '4.06 Cr · Cases settled at National Lok Adalat in a single day, 14 Mar 2026 (NALSA)',
  '3× · Cases an experienced practitioner can work in a day',
  '0 · Funded tools built for the practitioner, not the lender',
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
