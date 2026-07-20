import { useState } from 'react'
import { SUIT_META, suitKey } from '../data/suits.js'

function CardBackFace() {
  return (
    <div className="absolute inset-0 [backface-visibility:hidden] rounded-xl border-2 border-gold bg-gradient-to-br from-indigo-950 via-purple-950 to-ink shadow-lg overflow-hidden">
      <div className="absolute inset-2 rounded-lg border border-gold/60" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(201,161,90,0.25) 8px, rgba(201,161,90,0.25) 9px)',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl text-gold drop-shadow">✦</span>
      </div>
    </div>
  )
}

function CardFrontFace({ card, orientation }) {
  const meta = SUIT_META[suitKey(card)]
  const [imgFailed, setImgFailed] = useState(false)
  const isReversed = orientation === 'reversed'

  return (
    <div
      className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl border-2 border-gold bg-ink shadow-lg overflow-hidden"
    >
      <div
        className={`h-full w-full flex flex-col transition-transform duration-300 ${
          isReversed ? 'rotate-180' : ''
        }`}
      >
        {!imgFailed ? (
          <img
            src={`${import.meta.env.BASE_URL}${card.image.replace(/^\//, '')}`}
            alt={card.name}
            onError={() => setImgFailed(true)}
            className="w-full h-2/3 object-cover"
          />
        ) : (
          <div
            className={`w-full h-2/3 flex flex-col items-center justify-center gap-2 bg-gradient-to-br ${meta.gradient}`}
          >
            <span className="text-5xl">{meta.icon}</span>
            <span className="text-xs tracking-widest text-white/70 uppercase">
              {meta.labelKo}
            </span>
          </div>
        )}
        <div className="flex-1 flex flex-col items-center justify-center px-2 py-2 text-center">
          <p className="font-display text-gold text-sm sm:text-base leading-tight">
            {card.nameKo}
          </p>
          <p className="text-[10px] text-white/50 mt-0.5">{card.name}</p>
        </div>
      </div>
    </div>
  )
}

export default function TarotCard({ card, orientation, revealed, label }) {
  return (
    <div className="flex flex-col items-center gap-3">
      {label && (
        <span className="text-gold/90 font-display tracking-widest text-sm uppercase">
          {label}
        </span>
      )}
      <div className="w-36 h-56 sm:w-44 sm:h-68 [perspective:1200px]">
        <div
          className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
            revealed ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          <CardBackFace />
          {card && <CardFrontFace card={card} orientation={orientation} />}
        </div>
      </div>
      {revealed && card && (
        <div className="text-center max-w-[11rem]">
          <p className="text-xs text-gold/80">
            {orientation === 'reversed' ? '역방향' : '정방향'}
          </p>
        </div>
      )}
    </div>
  )
}
