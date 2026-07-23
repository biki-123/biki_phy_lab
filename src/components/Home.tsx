import type { Mode, Level } from '../types'

interface HomeProps {
  onStart: (mode: Mode) => void
  level: Level
  setLevel: (level: Level) => void
}

const modes: { id: Mode; title: string; icon: string; desc: string; color: string }[] = [
  { id: 'concept', title: 'Concept Mode', icon: '📘', desc: 'Learn any topic step-by-step with analogies and interactive checks.', color: 'from-primary-500 to-primary-700' },
  { id: 'numerical', title: 'Numerical Practice', icon: '🔢', desc: 'Solve problems step-by-step with multiple methods and shortcut tricks.', color: 'from-accent-500 to-accent-700' },
  { id: 'experiment', title: 'Experiment Simulation', icon: '🧪', desc: 'Virtual lab: change variables, predict outcomes, see live results.', color: 'from-amber-500 to-orange-600' },
  { id: 'exam', title: 'Exam Prep (IOE/IOM)', icon: '🎯', desc: 'Timed MCQ quizzes with 1000+ questions in the real entrance exam pattern.', color: 'from-rose-500 to-red-600' },
  { id: 'revision', title: 'Rapid Revision', icon: '⚡', desc: 'Quick formula sheets, key concepts, and flash-style review.', color: 'from-cyan-500 to-blue-600' },
  { id: 'ai-tutor', title: 'AI Physics Tutor', icon: '🤖', desc: 'Ask any physics question and get a step-by-step AI-generated explanation.', color: 'from-violet-500 to-purple-600' },
]

const levels: { id: Level; label: string; desc: string }[] = [
  { id: 'class11_12', label: 'Class 11/12', desc: 'Foundation level' },
  { id: 'ioe', label: 'IOE', desc: 'Engineering entrance' },
  { id: 'iom', label: 'IOM', desc: 'Medical entrance' },
  { id: 'university', label: 'University', desc: 'Advanced level' },
]

export default function Home({ onStart, level, setLevel }: HomeProps) {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="text-center space-y-4 pt-6 animate-slide-up">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse-slow"></span>
          Interactive Physics Learning
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent">
            Physics Lab & Tutor
          </span>
        </h1>
        <p className="text-ink-400 max-w-2xl mx-auto text-base sm:text-lg">
          Learn concepts, solve problems, run virtual experiments, and ace your IOE & IOM entrance exams — all in one place.
        </p>
      </div>

      {/* Level Selection */}
      <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h2 className="section-title mb-3">Choose your level</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {levels.map((l) => (
            <button
              key={l.id}
              onClick={() => setLevel(l.id)}
              className={`card p-4 text-left transition-all duration-200 ${
                level === l.id
                  ? 'border-primary-500 bg-primary-500/10 ring-1 ring-primary-500/30'
                  : 'card-hover'
              }`}
            >
              <div className={`font-bold text-base ${level === l.id ? 'text-primary-300' : 'text-ink-100'}`}>
                {l.label}
              </div>
              <div className="text-xs text-ink-400 mt-0.5">{l.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Mode Selection */}
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="section-title mb-3">Choose a learning mode</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => onStart(m.id)}
              className="card card-hover p-6 text-left group relative overflow-hidden"
            >
              <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${m.color} opacity-10 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500`}></div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                {m.icon}
              </div>
              <h3 className="font-bold text-lg text-ink-100 mb-1">{m.title}</h3>
              <p className="text-sm text-ink-400 leading-relaxed">{m.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-primary-400 text-sm font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                Start <span>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <div className="card p-5 text-center">
          <div className="text-3xl font-extrabold text-primary-400">35</div>
          <div className="text-sm text-ink-400 mt-1">Concept Topics</div>
        </div>
        <div className="card p-5 text-center">
          <div className="text-3xl font-extrabold text-accent-400">1000+</div>
          <div className="text-sm text-ink-400 mt-1">MCQs (IOE/IOM)</div>
        </div>
        <div className="card p-5 text-center">
          <div className="text-3xl font-extrabold text-amber-400">8</div>
          <div className="text-sm text-ink-400 mt-1">Virtual Experiments</div>
        </div>
        <div className="card p-5 text-center">
          <div className="text-3xl font-extrabold text-rose-400">34</div>
          <div className="text-sm text-ink-400 mt-1">Numerical Problems</div>
        </div>
      </div>
    </div>
  )
}
