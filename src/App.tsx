import { useState } from 'react'
import type { Mode, Level } from './types'
import Home from './components/Home'
import ConceptMode from './components/ConceptMode'
import NumericalMode from './components/NumericalMode'
import ExperimentMode from './components/ExperimentMode'
import ExamMode from './components/ExamMode'
import RevisionMode from './components/RevisionMode'
import ProgressDashboard from './components/ProgressDashboard'
import AITutor from './components/AITutor'

export default function App() {
  const [mode, setMode] = useState<Mode | null>(null)
  const [level, setLevel] = useState<Level>('class11_12')
  const [view, setView] = useState<'home' | 'progress'>('home')

  const startMode = (m: Mode) => {
    setMode(m)
    setView('home')
  }

  const goHome = () => {
    setMode(null)
    setView('home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 border-b border-ink-800 bg-ink-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={goHome} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform">
              Φ
            </div>
            <div className="text-left">
              <div className="font-bold text-ink-100 leading-none">Physics Lab</div>
              <div className="text-[10px] text-ink-400 leading-none mt-0.5">Interactive Tutor</div>
            </div>
          </button>
          <div className="flex items-center gap-2">
            {mode && (
              <button onClick={goHome} className="btn-ghost text-sm hidden sm:block">
                ← Home
              </button>
            )}
            <button
              onClick={() => { setView(view === 'progress' ? 'home' : 'progress'); if (mode) setMode(null) }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${view === 'progress' ? 'bg-accent-600 text-white' : 'bg-ink-800 text-ink-200 hover:bg-ink-700'}`}
            >
              📊 Progress
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
        {view === 'progress' ? (
          <ProgressDashboard />
        ) : !mode ? (
          <Home onStart={startMode} level={level} setLevel={setLevel} />
        ) : mode === 'concept' ? (
          <ConceptMode />
        ) : mode === 'numerical' ? (
          <NumericalMode level={level} />
        ) : mode === 'experiment' ? (
          <ExperimentMode />
        ) : mode === 'exam' ? (
          <ExamMode level={level} />
        ) : mode === 'revision' ? (
          <RevisionMode level={level} />
        ) : mode === 'ai-tutor' ? (
          <AITutor level={level} />
        ) : null}
      </main>

      <footer className="border-t border-ink-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center text-xs text-ink-500">
          Physics Lab & Tutor — Built for IOE & IOM aspirants. Learn. Practice. Master.
        </div>
      </footer>
    </div>
  )
}
