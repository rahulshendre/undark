const ITEMS = [
  'Mandatory · IIBF DRA certification per agent — sole certifier, RBI mandate',
  '+47% / 103% · Recovery-agent growth in 5 months; BFSI frontline attrition',
  '100+ agencies · One NBFC, 4,600+ agents, no proof of visits on file',
  'Oct 2026 · Proposed effective date, RBI Draft Recovery-Conduct Directions',
  'Rs.2.5 Cr · Bajaj Finance penalty for agent harassment, 2021',
  '62 NBFCs · Penalised 2023–25 for outsourced-agent conduct failures',
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
