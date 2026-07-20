export default function CardDetail({ card, orientation }) {
  if (!card) return null
  const meaning = card.meaning?.[orientation]
  const keywords = card.keywords?.[orientation] ?? []

  return (
    <div className="w-full max-w-xl bg-white/5 border border-gold/40 rounded-xl px-6 py-5 backdrop-blur-sm">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <h3 className="font-display text-gold text-lg">
          {card.nameKo} <span className="text-white/40 text-sm">({card.name})</span>
        </h3>
        <span className="text-xs px-2 py-0.5 rounded-full border border-gold/50 text-gold/90">
          {orientation === 'reversed' ? '역방향' : '정방향'}
        </span>
      </div>
      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {keywords.map((kw) => (
            <span
              key={kw}
              className="text-xs text-white/70 bg-white/10 rounded-full px-2.5 py-1"
            >
              {kw}
            </span>
          ))}
        </div>
      )}
      {meaning && <p className="text-white/85 text-sm leading-relaxed mt-4">{meaning}</p>}
    </div>
  )
}
