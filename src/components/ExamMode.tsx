import { useState, useEffect, useRef } from 'react'
import { allMCQs } from '../data/mcqs'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { Level, MCQ, QuizResult } from '../types'

interface ExamConfig {
  numQuestions: number
  timePerQuestion: number
  topics: string[]
}

export default function ExamMode({ level }: { level: Level }) {
  const [phase, setPhase] = useState<'config' | 'quiz' | 'results'>('config')
  const [config, setConfig] = useState<ExamConfig>({ numQuestions: 10, timePerQuestion: 60, topics: [] })
  const [questions, setQuestions] = useState<MCQ[]>([])
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [results, setResults] = useState<{ score: number; results: QuizResult[]; timeTaken: number } | null>(null)
  const startTimeRef = useRef<number>(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const allTopics = Array.from(new Set(allMCQs.map((m) => m.topic)))

  const startQuiz = () => {
    let pool = allMCQs
    if (config.topics.length > 0) {
      pool = allMCQs.filter((m) => config.topics.includes(m.topic))
    }
    // Filter by level preference
    if (level === 'ioe') pool = pool.filter((m) => m.exam === 'IOE' || m.exam === 'Both')
    if (level === 'iom') pool = pool.filter((m) => m.exam === 'IOM' || m.exam === 'Both')
    if (pool.length === 0) pool = allMCQs

    // Shuffle and pick
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, Math.min(config.numQuestions, shuffled.length))
    setQuestions(selected)
    setAnswers(new Array(selected.length).fill(null))
    setCurrentQ(0)
    setTimeLeft(config.timePerQuestion)
    startTimeRef.current = Date.now()
    setPhase('quiz')
  }

  // Timer
  useEffect(() => {
    if (phase !== 'quiz') return
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          // Auto-advance
          handleNext(true)
          return config.timePerQuestion
        }
        return t - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentQ])

  const handleSelect = (optIdx: number) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[currentQ] = optIdx
      return next
    })
  }

  const handleNext = (auto = false) => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1)
      setTimeLeft(config.timePerQuestion)
    } else {
      finishQuiz()
    }
  }

  const finishQuiz = async () => {
    if (timerRef.current) clearInterval(timerRef.current)
    const timeTaken = Math.round((Date.now() - startTimeRef.current) / 1000)
    let score = 0
    const quizResults: QuizResult[] = questions.map((q, i) => {
      const userAns = answers[i]
      const correct = userAns === q.answer
      if (correct) score++
      return {
        question: q.question,
        correct,
        userAnswer: userAns !== null ? q.options[userAns] : '(no answer)',
        correctAnswer: q.options[q.answer],
      }
    })

    setResults({ score, results: quizResults, timeTaken })
    setPhase('results')

    // Persist to Supabase
    if (!isSupabaseConfigured) return
    try {
      await supabase.from('quiz_attempts').insert({
        mode: 'exam',
        topic: config.topics.length > 0 ? config.topics.join(', ') : 'mixed',
        level,
        score,
        total: questions.length,
        time_seconds: timeTaken,
        results: quizResults,
      })

      // Update progress per topic
      for (const q of questions) {
        const idx = questions.indexOf(q)
        const correct = answers[idx] === q.answer
        const { data } = await supabase
          .from('progress')
          .select('id, sessions, correct, attempted')
          .eq('topic', q.topic)
          .maybeSingle()

        if (data) {
          await supabase
            .from('progress')
            .update({
              sessions: data.sessions + 1,
              correct: data.correct + (correct ? 1 : 0),
              attempted: data.attempted + 1,
              mastery: Math.round(((data.correct + (correct ? 1 : 0)) / (data.attempted + 1)) * 100),
              updated_at: new Date().toISOString(),
            })
            .eq('id', data.id)
        } else {
          await supabase.from('progress').insert({
            topic: q.topic,
            sessions: 1,
            correct: correct ? 1 : 0,
            attempted: 1,
            mastery: correct ? 100 : 0,
          })
        }

        // Track weak areas
        if (!correct) {
          const { data: wa } = await supabase
            .from('weak_areas')
            .select('id, miss_count')
            .eq('topic', q.topic)
            .maybeSingle()
          if (wa) {
            await supabase
              .from('weak_areas')
              .update({ miss_count: wa.miss_count + 1, last_missed_at: new Date().toISOString() })
              .eq('id', wa.id)
          } else {
            await supabase.from('weak_areas').insert({
              topic: q.topic,
              miss_count: 1,
              suggestion: `Review ${q.topic} — focus on ${q.difficulty} level problems`,
            })
          }
        }
      }
    } catch (e) {
      // Silent fail — quiz still works
    }
  }

  // CONFIG PHASE
  if (phase === 'config') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-ink-100">🎯 Exam Prep — IOE & IOM</h2>
          <p className="text-ink-400 mt-1">Timed MCQ quiz in the entrance exam pattern. Your results are tracked for progress analysis.</p>
        </div>

        <div className="card p-6 space-y-5">
          <div>
            <label className="text-sm font-semibold text-ink-200 mb-2 block">Number of questions</label>
            <div className="flex gap-2">
              {[5, 10, 15, 20].map((n) => (
                <button
                  key={n}
                  onClick={() => setConfig((c) => ({ ...c, numQuestions: n }))}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    config.numQuestions === n ? 'bg-primary-600 text-white' : 'bg-ink-800 text-ink-400 hover:bg-ink-700'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-ink-200 mb-2 block">Time per question</label>
            <div className="flex gap-2">
              {[30, 60, 90, 120].map((t) => (
                <button
                  key={t}
                  onClick={() => setConfig((c) => ({ ...c, timePerQuestion: t }))}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    config.timePerQuestion === t ? 'bg-primary-600 text-white' : 'bg-ink-800 text-ink-400 hover:bg-ink-700'
                  }`}
                >
                  {t}s
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-ink-200 mb-2 block">Topics (optional — leave empty for mixed)</label>
            <div className="flex flex-wrap gap-2">
              {allTopics.map((t) => {
                const selected = config.topics.includes(t)
                return (
                  <button
                    key={t}
                    onClick={() => setConfig((c) => ({
                      ...c,
                      topics: selected ? c.topics.filter((x) => x !== t) : [...c.topics, t],
                    }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selected ? 'bg-accent-600 text-white' : 'bg-ink-800 text-ink-400 hover:bg-ink-700'
                    }`}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="rounded-xl bg-primary-500/10 border border-primary-500/20 p-4 text-sm text-ink-300">
            <strong className="text-primary-300">Level:</strong> {level === 'class11_12' ? 'Class 11/12' : level === 'ioe' ? 'IOE (Engineering)' : level === 'iom' ? 'IOM (Medical)' : 'University'}
            <br />
            <span className="text-ink-400">Questions will be filtered to match your selected level and topics.</span>
          </div>

          <button onClick={startQuiz} className="btn-primary w-full text-base">
            Start Quiz →
          </button>
        </div>
      </div>
    )
  }

  // QUIZ PHASE
  if (phase === 'quiz') {
    const q = questions[currentQ]
    const progress = ((currentQ + 1) / questions.length) * 100
    const timePct = (timeLeft / config.timePerQuestion) * 100

    return (
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-ink-400">
            Question <span className="text-ink-100 font-bold">{currentQ + 1}</span> / {questions.length}
          </div>
          <div className={`px-4 py-1.5 rounded-lg font-mono font-bold text-sm ${timeLeft <= 10 ? 'bg-rose-500/20 text-rose-300 animate-pulse' : 'bg-ink-800 text-ink-200'}`}>
            ⏱ {timeLeft}s
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-ink-800 overflow-hidden">
          <div className="h-full bg-primary-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="h-1 rounded-full bg-ink-800 overflow-hidden">
          <div className={`h-full transition-all duration-1000 ease-linear ${timeLeft <= 10 ? 'bg-rose-500' : 'bg-accent-500'}`} style={{ width: `${timePct}%` }}></div>
        </div>

        {/* Question */}
        <div key={currentQ} className="card p-6 space-y-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <div className="badge bg-primary-500/10 text-primary-300">{q.topic}</div>
            <div className={`badge ${q.difficulty === 'easy' ? 'bg-emerald-500/10 text-emerald-300' : q.difficulty === 'medium' ? 'bg-amber-500/10 text-amber-300' : 'bg-rose-500/10 text-rose-300'}`}>
              {q.difficulty}
            </div>
            <div className="badge bg-ink-800 text-ink-400">{q.exam}</div>
          </div>

          <p className="text-ink-100 text-lg leading-relaxed font-medium">{q.question}</p>

          <div className="space-y-2">
            {q.options.map((opt, i) => {
              const isSelected = answers[currentQ] === i
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 ${
                    isSelected
                      ? 'border-primary-500 bg-primary-500/15 text-primary-200'
                      : 'border-ink-700 bg-ink-800 hover:border-ink-600 text-ink-200'
                  }`}
                >
                  <span className="font-mono text-xs text-ink-500 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              )
            })}
          </div>

          <button
            onClick={() => handleNext()}
            disabled={answers[currentQ] === null}
            className="btn-primary w-full text-sm"
          >
            {currentQ < questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
          </button>
        </div>
      </div>
    )
  }

  // RESULTS PHASE
  if (phase === 'results' && results) {
    const pct = Math.round((results.score / questions.length) * 100)
    const grade = pct >= 80 ? 'Excellent' : pct >= 60 ? 'Good' : pct >= 40 ? 'Needs Work' : 'Keep Practicing'
    const gradeColor = pct >= 80 ? 'text-accent-400' : pct >= 60 ? 'text-primary-400' : pct >= 40 ? 'text-amber-400' : 'text-rose-400'

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="card p-8 text-center space-y-4 animate-fade-in">
          <div className="text-6xl font-extrabold">
            <span className={gradeColor}>{pct}%</span>
          </div>
          <div className={`text-xl font-bold ${gradeColor}`}>{grade}</div>
          <div className="text-ink-300">
            You scored <span className="text-ink-100 font-bold">{results.score}</span> out of <span className="text-ink-100 font-bold">{questions.length}</span>
          </div>
          <div className="text-sm text-ink-400">
            Time taken: {Math.floor(results.timeTaken / 60)}m {results.timeTaken % 60}s
          </div>
        </div>

        {/* Question review */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-ink-400 uppercase tracking-wider">Review your answers</h3>
          {questions.map((q, i) => {
            const userAns = answers[i]
            const correct = userAns === q.answer
            return (
              <div key={i} className="card p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${correct ? 'bg-accent-500 text-white' : 'bg-rose-500 text-white'}`}>
                    {correct ? '✓' : '✗'}
                  </div>
                  <p className="text-sm text-ink-100 font-medium">{q.question}</p>
                </div>
                <div className="pl-8 space-y-1 text-sm">
                  <div className={correct ? 'text-accent-300' : 'text-rose-300'}>
                    Your answer: {userAns !== null ? q.options[userAns] : '(no answer)'}
                  </div>
                  {!correct && (
                    <div className="text-accent-300">
                      Correct answer: {q.options[q.answer]}
                    </div>
                  )}
                  <div className="text-ink-400 text-xs mt-1 pt-1 border-t border-ink-800">
                    💡 {q.explanation}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex gap-2">
          <button onClick={() => setPhase('config')} className="btn-primary flex-1 text-sm">
            New Quiz
          </button>
        </div>
      </div>
    )
  }

  return null
}
