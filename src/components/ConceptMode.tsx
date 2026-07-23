import { useState } from 'react'
import { conceptLessons } from '../data/concepts'
import { categories } from '../data/topics'
import type { ConceptLesson } from '../types'

export default function ConceptMode() {
  const [selected, setSelected] = useState<ConceptLesson | null>(null)
  const [filter, setFilter] = useState<string | null>(null)

  const lessons = filter ? conceptLessons.filter((l) => l.category === filter) : conceptLessons

  if (selected) {
    return <LessonView lesson={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-100">Concept Mode</h2>
        <p className="text-ink-400 mt-1">Pick a topic. Learn it step-by-step with analogies, formulas, and interactive check questions.</p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${!filter ? 'bg-primary-600 text-white' : 'bg-ink-800 text-ink-400 hover:bg-ink-700'}`}
        >
          All ({conceptLessons.length})
        </button>
        {categories.map((cat) => {
          const count = conceptLessons.filter((l) => l.category === cat).length
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === cat ? 'bg-primary-600 text-white' : 'bg-ink-800 text-ink-400 hover:bg-ink-700'}`}
            >
              {cat} ({count})
            </button>
          )
        })}
      </div>

      {/* Lessons grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => setSelected(lesson)}
            className="card card-hover p-5 text-left group"
          >
            <div className="text-3xl mb-3">{lesson.icon}</div>
            <div className="badge bg-primary-500/10 text-primary-300 mb-2">{lesson.category}</div>
            <h3 className="font-bold text-ink-100 mb-1">{lesson.title}</h3>
            <p className="text-sm text-ink-400 leading-relaxed">{lesson.description}</p>
            <div className="mt-3 text-xs text-ink-500">{lesson.steps.length} interactive steps</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function LessonView({ lesson, onBack }: { lesson: ConceptLesson; onBack: () => void }) {
  const [step, setStep] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const current = lesson.steps[step]
  const isLast = step === lesson.steps.length - 1

  const handleCheck = () => {
    if (selectedOption === null) return
    setShowResult(true)
    if (selectedOption === current.answer) setCorrectCount((c) => c + 1)
  }

  const handleNext = () => {
    setStep((s) => s + 1)
    setSelectedOption(null)
    setShowResult(false)
  }

  const handleRestart = () => {
    setStep(0)
    setSelectedOption(null)
    setShowResult(false)
    setCorrectCount(0)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button onClick={onBack} className="btn-ghost text-sm">← All topics</button>

      <div className="flex items-center gap-3">
        <div className="text-4xl">{lesson.icon}</div>
        <div>
          <h2 className="text-2xl font-bold text-ink-100">{lesson.title}</h2>
          <div className="badge bg-primary-500/10 text-primary-300 mt-1">{lesson.category}</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-2">
        {lesson.steps.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${
              i < step ? 'bg-accent-500' : i === step ? 'bg-primary-500' : 'bg-ink-700'
            }`}
          />
        ))}
      </div>

      {/* Step content */}
      <div key={step} className="card p-6 space-y-5 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="step-line"></div>
          <div>
            <div className="text-xs text-ink-500 font-semibold uppercase tracking-wider">Step {step + 1} of {lesson.steps.length}</div>
            <h3 className="text-xl font-bold text-ink-100">{current.title}</h3>
          </div>
        </div>

        <p className="text-ink-200 leading-relaxed whitespace-pre-line">{current.content}</p>

        {current.analogy && (
          <div className="analogy-box">
            <div className="text-amber-400 font-semibold text-sm mb-1">Analogy</div>
            <p className="text-ink-200 text-sm leading-relaxed">{current.analogy}</p>
          </div>
        )}

        {current.formula && (
          <div className="formula-box">
            <div className="text-primary-300 font-semibold text-sm mb-2">Formula</div>
            <pre className="formula-text">{current.formula}</pre>
          </div>
        )}

        {/* Interactive question */}
        <div className="question-box space-y-3">
          <div className="text-ink-100 font-semibold text-sm">Check your understanding</div>
          <p className="text-ink-200 text-sm">{current.question}</p>
          <div className="space-y-2">
            {current.options.map((opt, i) => {
              const isSelected = selectedOption === i
              const isCorrect = i === current.answer
              let cls = 'border-ink-700 bg-ink-800 hover:border-ink-600 text-ink-200'
              if (showResult && isCorrect) cls = 'border-accent-500 bg-accent-500/15 text-accent-300'
              else if (showResult && isSelected && !isCorrect) cls = 'border-rose-500 bg-rose-500/15 text-rose-300'
              else if (isSelected) cls = 'border-primary-500 bg-primary-500/15 text-primary-200'

              return (
                <button
                  key={i}
                  disabled={showResult}
                  onClick={() => setSelectedOption(i)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg border transition-all duration-200 text-sm ${cls} ${!showResult ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <span className="font-mono text-xs text-ink-500 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                  {showResult && isCorrect && <span className="float-right">✓</span>}
                  {showResult && isSelected && !isCorrect && <span className="float-right">✗</span>}
                </button>
              )
            })}
          </div>

          {showResult && (
            <div className="rounded-lg bg-ink-900/60 p-3 animate-fade-in">
              <div className={`font-semibold text-sm mb-1 ${selectedOption === current.answer ? 'text-accent-400' : 'text-rose-400'}`}>
                {selectedOption === current.answer ? 'Correct!' : 'Not quite — let\'s understand why.'}
              </div>
              <p className="text-ink-300 text-sm leading-relaxed">{current.explanation}</p>
            </div>
          )}

          {!showResult ? (
            <button onClick={handleCheck} disabled={selectedOption === null} className="btn-primary w-full text-sm">
              Check Answer
            </button>
          ) : !isLast ? (
            <button onClick={handleNext} className="btn-accent w-full text-sm">
              Next Step →
            </button>
          ) : (
            <div className="space-y-3">
              <div className="rounded-lg bg-accent-500/10 border border-accent-500/20 p-4 text-center">
                <div className="text-2xl font-extrabold text-accent-400">{correctCount} / {lesson.steps.length}</div>
                <div className="text-sm text-ink-400 mt-1">
                  {correctCount === lesson.steps.length ? 'Perfect! You\'ve mastered this topic.' : 'Good effort! Review the steps you missed.'}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={handleRestart} className="btn-ghost flex-1 text-sm">Restart</button>
                <button onClick={onBack} className="btn-primary flex-1 text-sm">Done</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
