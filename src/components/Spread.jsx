import { useState } from 'react'
import TarotCard from './TarotCard.jsx'
import CardDetail from './CardDetail.jsx'
import cards from '../data/cards.json'

const POSITIONS = [
  { key: 'past', label: '과거' },
  { key: 'present', label: '현재' },
  { key: 'future', label: '미래' },
]

function drawThree() {
  const shuffled = [...cards].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 3).map((card) => ({
    card,
    orientation: Math.random() < 0.5 ? 'reversed' : 'upright',
  }))
}

export default function Spread() {
  const [draw, setDraw] = useState(null)
  const [revealed, setRevealed] = useState([false, false, false])
  const [selected, setSelected] = useState(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const handleDraw = () => {
    if (isDrawing) return
    setIsDrawing(true)
    setSelected(null)
    setRevealed([false, false, false])
    setDraw(drawThree())

    POSITIONS.forEach((_, i) => {
      setTimeout(() => {
        setRevealed((prev) => {
          const next = [...prev]
          next[i] = true
          return next
        })
        if (i === POSITIONS.length - 1) setIsDrawing(false)
      }, 400 + i * 450)
    })
  }

  const selectedEntry =
    selected !== null && draw ? draw[selected] : null

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      <button
        onClick={handleDraw}
        disabled={isDrawing}
        className="font-display tracking-wide text-ink bg-gold hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-full px-8 py-3 shadow-lg shadow-gold/20"
      >
        {draw ? '다시 뽑기' : '카드 뽑기'}
      </button>

      <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
        {POSITIONS.map((pos, i) => {
          const entry = draw?.[i]
          return (
            <button
              key={pos.key}
              onClick={() => entry && revealed[i] && setSelected(i)}
              className={`focus:outline-none ${
                entry && revealed[i] ? 'cursor-pointer' : 'cursor-default'
              } ${selected === i ? 'scale-105' : ''} transition-transform`}
            >
              <TarotCard
                card={entry?.card ?? null}
                orientation={entry?.orientation}
                revealed={Boolean(entry && revealed[i])}
                label={pos.label}
              />
            </button>
          )
        })}
      </div>

      {selectedEntry && (
        <CardDetail card={selectedEntry.card} orientation={selectedEntry.orientation} />
      )}

      {draw && !selectedEntry && revealed.every(Boolean) && (
        <p className="text-white/50 text-sm">카드를 클릭하면 상세 의미를 볼 수 있어요.</p>
      )}
    </div>
  )
}
