import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

interface AttemptRow {
  id: string
  mode: string
  topic: string
  level: string
  score: number
  total: number
  time_seconds: number
  created_at: string
}

interface ProgressRow {
  topic: string
  sessions: number
  correct: number
  attempted: number
  mastery: number
  updated_at: string
}

interface WeakAreaRow {
  topic: string
  miss_count: number
  suggestion: string
}

export default function ProgressDashboard() {
  const [attempts, setAttempts] = useState<AttemptRow[]>([])
  const [progress, setProgress] = useState<ProgressRow[]>([])
  const [weakAreas, setWeakAreas] = useState<WeakAreaRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }
    try {
      const [a, p, w] = await Promise.all([
        supabase.from('quiz_attempts').select('*').order('created_at', { ascending: false }).limit(20),
        supabase.from('progress').select('*').order('mastery', { ascending: false }),
        supabase.from('weak_areas').select('*').order('miss_count', { ascending: false }).limit(10),
      ])
      setAttempts((a.data as AttemptRow[]) || [])
      setProgress((p.data as ProgressRow[]) || [])
      setWeakAreas((w.data as WeakAreaRow[]) || [])
    } catch {
      // Silent
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-ink-400">Loading your progress...</div>
      </div>
    )
  }

  const totalAttempts = attempts.length
  const totalCorrect = progress.reduce((s, p) => s + p.correct, 0)
  const totalAttempted = progress.reduce((s, p) => s + p.attempted, 0)
  const avgScore = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-100">📊 Progress Dashboard</h2>
        <p className="text-ink-400 mt-1">Track your performance, identify weak areas, and see your mastery grow.</p>
      </div>

      {!isSupabaseConfigured ? (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-lg font-bold text-ink-200 mb-2">Progress tracking ready</h3>
          <p className="text-ink-400 text-sm">Take quizzes in Exam Prep mode — your scores and weak areas will appear here automatically.</p>
        </div>
      ) : totalAttempts === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="text-lg font-bold text-ink-200 mb-2">No quiz attempts yet</h3>
          <p className="text-ink-400 text-sm">Take a quiz in Exam Prep mode to start tracking your progress here.</p>
        </div>
      ) : (
        <>
          {/* Summary stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard label="Quizzes Taken" value={totalAttempts} color="text-primary-400" />
            <StatCard label="Questions Answered" value={totalAttempted} color="text-accent-400" />
            <StatCard label="Correct Answers" value={totalCorrect} color="text-emerald-400" />
            <StatCard label="Average Score" value={`${avgScore}%`} color="text-amber-400" />
          </div>

          {/* Topic mastery */}
          {progress.length > 0 && (
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-ink-400 uppercase tracking-wider mb-4">Topic Mastery</h3>
              <div className="space-y-3">
                {progress.map((p) => (
                  <div key={p.topic}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-ink-200">{p.topic}</span>
                      <span className="text-sm font-mono text-ink-400">
                        {p.correct}/{p.attempted} · {p.mastery}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-ink-800 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          p.mastery >= 80 ? 'bg-accent-500' : p.mastery >= 50 ? 'bg-primary-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${p.mastery}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Weak areas */}
          {weakAreas.length > 0 && (
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-ink-400 uppercase tracking-wider mb-4">⚠️ Areas to Improve</h3>
              <div className="space-y-2">
                {weakAreas.map((w, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg bg-rose-500/5 border border-rose-500/20 p-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-500/20 text-rose-300 text-sm font-bold flex items-center justify-center">
                      {w.miss_count}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink-200">{w.topic}</div>
                      <div className="text-xs text-ink-400">{w.suggestion}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent attempts */}
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-ink-400 uppercase tracking-wider mb-4">Recent Quiz Attempts</h3>
            <div className="space-y-2">
              {attempts.map((a) => {
                const pct = a.total > 0 ? Math.round((a.score / a.total) * 100) : 0
                return (
                  <div key={a.id} className="flex items-center justify-between rounded-lg bg-ink-800/50 p-3">
                    <div>
                      <div className="text-sm font-medium text-ink-200">{a.topic}</div>
                      <div className="text-xs text-ink-500">
                        {new Date(a.created_at).toLocaleDateString()} · {Math.floor(a.time_seconds / 60)}m {a.time_seconds % 60}s
                      </div>
                    </div>
                    <div className={`font-mono font-bold text-sm ${pct >= 60 ? 'text-accent-400' : 'text-rose-400'}`}>
                      {a.score}/{a.total} ({pct}%)
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="card p-4 text-center">
      <div className={`text-2xl sm:text-3xl font-extrabold ${color}`}>{value}</div>
      <div className="text-xs text-ink-400 mt-1">{label}</div>
    </div>
  )
}
