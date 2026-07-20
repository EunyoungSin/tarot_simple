import Spread from './components/Spread.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 gap-10">
      <header className="text-center">
        <h1 className="font-display text-3xl sm:text-4xl text-gold">타로 카드 리딩</h1>
        <p className="text-white/50 mt-2 text-sm sm:text-base">
          과거 · 현재 · 미래 3카드 스프레드
        </p>
      </header>
      <main className="w-full flex-1 flex items-start justify-center">
        <Spread />
      </main>
    </div>
  )
}
