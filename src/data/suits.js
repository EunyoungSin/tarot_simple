export const SUIT_META = {
  major: {
    labelKo: '메이저 아르카나',
    icon: '✨',
    gradient: 'from-violet-700 via-purple-800 to-indigo-900',
  },
  wands: {
    labelKo: '완드',
    icon: '🔥',
    gradient: 'from-orange-600 via-red-700 to-rose-900',
  },
  cups: {
    labelKo: '컵',
    icon: '💧',
    gradient: 'from-sky-600 via-blue-700 to-indigo-900',
  },
  swords: {
    labelKo: '검',
    icon: '⚔️',
    gradient: 'from-slate-500 via-slate-700 to-zinc-900',
  },
  pentacles: {
    labelKo: '펜타클',
    icon: '🪙',
    gradient: 'from-emerald-600 via-green-700 to-teal-900',
  },
}

export function suitKey(card) {
  return card.arcana === 'major' ? 'major' : card.suit
}
