import { useState } from 'react'
import type { Level } from '../types'
import { numericalProblems } from '../data/numericals'

export default function NumericalMode({ level }: { level: Level }) {
  const [problemIdx, setProblemIdx] = useState(0)
  const [showHints, setShowHints] = useState(0)
  const [revealedSteps, setRevealedSteps] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showPractice, setShowPractice] = useState(false)
  const [filter, setFilter] = useState<string | null>(null)

  const problems = filter
    ? numericalProblems.filter((p) => p.level.includes(level as any) && p.topic === filter)
    : numericalProblems.filter((p) => p.level.includes(level as any))

  const allTopics = Array.from(new Set(problems.map((p) => p.topic)))

  const problem = problems[problemIdx % problems.length]

  const reset = () => {
    setShowHints(0)
    setRevealedSteps(0)
    setShowAnswer(false)
    setShowPractice(false)
  }

  const nextProblem = () => {
    setProblemIdx((i) => (i + 1) % problems.length)
    reset()
  }

  if (problems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-ink-100">Numerical Practice</h2>
          <p className="text-ink-400 mt-1">Solve step-by-step with hints and practice problems.</p>
        </div>
        <div className="card p-12 text-center">
          <div className="text-5xl mb-4">🔢</div>
          <p className="text-ink-400">No problems available for this level. Try a different level.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-100">Numerical Practice</h2>
        <p className="text-ink-400 mt-1">Solve step-by-step. Reveal hints when stuck, then try the practice problem.</p>
      </div>

      {/* Topic filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setFilter(null); setProblemIdx(0); reset() }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${!filter ? 'bg-primary-600 text-white' : 'bg-ink-800 text-ink-400 hover:bg-ink-700'}`}
        >
          All ({problems.length})
        </button>
        {allTopics.map((t) => (
          <button
            key={t}
            onClick={() => { setFilter(t); setProblemIdx(0); reset() }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === t ? 'bg-primary-600 text-white' : 'bg-ink-800 text-ink-400 hover:bg-ink-700'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Problem selector */}
      <div className="flex flex-wrap gap-2">
        {problems.map((p, i) => (
          <button
            key={p.id}
            onClick={() => { setProblemIdx(i); reset() }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              i === problemIdx ? 'bg-accent-600 text-white' : 'bg-ink-800 text-ink-400 hover:bg-ink-700'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Problem */}
      <div className="card p-6 space-y-5">
        <div className="flex items-center gap-2">
          <div className="badge bg-accent-500/10 text-accent-300">{problem.topic}</div>
          <div className={`badge ${problem.difficulty === 'easy' ? 'bg-emerald-500/10 text-emerald-300' : problem.difficulty === 'medium' ? 'bg-amber-500/10 text-amber-300' : 'bg-rose-500/10 text-rose-300'}`}>
            {problem.difficulty}
          </div>
        </div>

        <p className="text-ink-100 text-lg leading-relaxed font-medium">{problem.question}</p>

        <div className="rounded-xl bg-ink-800/50 border border-ink-700 p-4">
          <div className="section-title mb-2">Given</div>
          <ul className="space-y-1">
            {problem.given.map((g, i) => (
              <li key={i} className="text-sm text-ink-300 font-mono">{g}</li>
            ))}
          </ul>
        </div>

        {/* Hints */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-amber-400">Hints</span>
            {showHints < problem.hints.length && (
              <button onClick={() => setShowHints((h) => h + 1)} className="btn-ghost text-xs py-1.5 px-3">
                Reveal hint {showHints + 1}
              </button>
            )}
          </div>
          {showHints > 0 && (
            <div className="space-y-2">
              {problem.hints.slice(0, showHints).map((h, i) => (
                <div key={i} className="analogy-box text-sm text-ink-200 animate-fade-in">
                  <span className="text-amber-400 font-semibold">Hint {i + 1}:</span> {h}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Solution steps */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-primary-400">Solution Steps</span>
            {revealedSteps < problem.steps.length && (
              <button onClick={() => setRevealedSteps((s) => s + 1)} className="btn-ghost text-xs py-1.5 px-3">
                Reveal step {revealedSteps + 1}
              </button>
            )}
          </div>
          {revealedSteps > 0 && (
            <div className="space-y-2">
              {problem.steps.slice(0, revealedSteps).map((s, i) => (
                <div key={i} className="formula-box animate-fade-in">
                  <div className="text-primary-300 font-semibold text-sm mb-1">{s.label}</div>
                  <pre className="formula-text">{s.detail}</pre>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Answer */}
        <div className="flex items-center gap-3">
          {!showAnswer ? (
            <button onClick={() => setShowAnswer(true)} className="btn-accent text-sm">
              Reveal Answer
            </button>
          ) : (
            <div className="rounded-lg bg-accent-500/15 border border-accent-500/30 px-4 py-2.5 animate-fade-in w-full">
              <span className="text-accent-400 font-bold">Answer: </span>
              <span className="text-ink-100 font-mono">{problem.answer}</span>
            </div>
          )}
        </div>

        {/* Practice problem */}
        {showAnswer && !showPractice && (
          <button onClick={() => setShowPractice(true)} className="btn-primary w-full text-sm animate-fade-in">
            Try a similar practice problem →
          </button>
        )}

        {showPractice && (
          <div className="rounded-xl bg-ink-800/50 border border-ink-700 p-4 space-y-3 animate-fade-in">
            <div className="text-sm font-semibold text-ink-100">Practice Problem</div>
            <p className="text-ink-200 text-sm leading-relaxed">{problem.practice}</p>
            <details className="group">
              <summary className="cursor-pointer text-xs text-primary-400 font-semibold hover:text-primary-300">
                Show answer & solution
              </summary>
              <div className="mt-2 rounded-lg bg-accent-500/10 border border-accent-500/20 p-3 text-sm text-ink-200 font-mono">
                {problem.practiceAnswer}
              </div>
            </details>
          </div>
        )}

        <button onClick={nextProblem} className="btn-ghost w-full text-sm">
          Next Problem →
        </button>
      </div>
    </div>
  )
}
