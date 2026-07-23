import { useState, useRef, useEffect } from 'react'
import { experiments } from '../data/experiments'
import type { Experiment, Variable } from '../types'

export default function ExperimentMode() {
  const [selected, setSelected] = useState<Experiment | null>(null)

  if (selected) {
    return <ExperimentView experiment={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-100">🧪 Virtual Physics Lab</h2>
        <p className="text-ink-400 mt-1">Run experiments virtually. Change variables, predict outcomes, and see live simulations.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {experiments.map((exp) => (
          <button
            key={exp.id}
            onClick={() => setSelected(exp)}
            className="card card-hover p-5 text-left group"
          >
            <div className="text-3xl mb-3">{exp.icon}</div>
            <div className="badge bg-amber-500/10 text-amber-300 mb-2">{exp.category}</div>
            <h3 className="font-bold text-ink-100 mb-1">{exp.title}</h3>
            <p className="text-sm text-ink-400 leading-relaxed">{exp.aim}</p>
            <div className="mt-3 text-xs text-ink-500">{exp.variables.length} adjustable variables</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function ExperimentView({ experiment, onBack }: { experiment: Experiment; onBack: () => void }) {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(experiment.variables.map((v) => [v.name, v.default]))
  )
  const [showPrediction, setShowPrediction] = useState(false)
  const [predictionChoice, setPredictionChoice] = useState<number | null>(null)
  const [showPredictionResult, setShowPredictionResult] = useState(false)
  const [activeTab, setActiveTab] = useState<'simulation' | 'theory' | 'procedure' | 'observations' | 'graph' | 'conclusion'>('simulation')

  const handleChange = (name: string, val: number) => {
    setValues((prev) => ({ ...prev, [name]: val }))
  }

  const handlePredict = () => {
    setShowPredictionResult(true)
  }

  const tabs: { id: typeof activeTab; label: string }[] = [
    { id: 'simulation', label: '🎮 Simulation' },
    { id: 'theory', label: '📖 Theory' },
    { id: 'procedure', label: '📋 Procedure' },
    { id: 'observations', label: '👁️ Observations' },
    { id: 'graph', label: '📊 Graph' },
    { id: 'conclusion', label: '✅ Conclusion' },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={onBack} className="btn-ghost text-sm">← All experiments</button>

      <div className="flex items-center gap-3">
        <div className="text-4xl">{experiment.icon}</div>
        <div>
          <h2 className="text-2xl font-bold text-ink-100">{experiment.title}</h2>
          <div className="badge bg-amber-500/10 text-amber-300 mt-1">{experiment.category}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === t.id ? 'bg-primary-600 text-white' : 'bg-ink-800 text-ink-400 hover:bg-ink-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Simulation tab */}
      {activeTab === 'simulation' && (
        <div className="card p-6 space-y-5 animate-fade-in">
          {/* Variable controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {experiment.variables.map((v) => (
              <VariableControl key={v.name} variable={v} value={values[v.name]} onChange={(val) => handleChange(v.name, val)} />
            ))}
          </div>

          {/* Simulation canvas */}
          <SimulationCanvas experimentId={experiment.id} values={values} />

          {/* Computed results */}
          <ComputedResults experimentId={experiment.id} values={values} />

          {/* Prediction question */}
          {!showPrediction && (
            <button onClick={() => setShowPrediction(true)} className="btn-primary w-full text-sm">
              🤔 "What do you think will happen if..." — Try a prediction
            </button>
          )}

          {showPrediction && (
            <div className="rounded-xl bg-ink-800/50 border border-ink-700 p-4 space-y-3 animate-fade-in">
              <div className="text-ink-100 font-semibold text-sm">Prediction Challenge</div>
              <p className="text-ink-200 text-sm">{experiment.predictionQuestion}</p>
              <div className="space-y-2">
                {experiment.predictionOptions.map((opt, i) => {
                  const isSelected = predictionChoice === i
                  const isCorrect = i === experiment.predictionAnswer
                  let cls = 'border-ink-700 bg-ink-800 hover:border-ink-600 text-ink-200'
                  if (showPredictionResult && isCorrect) cls = 'border-accent-500 bg-accent-500/15 text-accent-300'
                  else if (showPredictionResult && isSelected && !isCorrect) cls = 'border-rose-500 bg-rose-500/15 text-rose-300'
                  else if (isSelected) cls = 'border-primary-500 bg-primary-500/15 text-primary-200'
                  return (
                    <button
                      key={i}
                      disabled={showPredictionResult}
                      onClick={() => setPredictionChoice(i)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg border transition-all duration-200 text-sm ${cls}`}
                    >
                      <span className="font-mono text-xs text-ink-500 mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </button>
                  )
                })}
              </div>
              {!showPredictionResult ? (
                <button onClick={handlePredict} disabled={predictionChoice === null} className="btn-primary w-full text-sm">
                  Check Prediction
                </button>
              ) : (
                <div className={`rounded-lg p-3 text-sm ${predictionChoice === experiment.predictionAnswer ? 'bg-accent-500/10 text-accent-300' : 'bg-rose-500/10 text-rose-300'}`}>
                  {predictionChoice === experiment.predictionAnswer ? '✓ Correct prediction!' : '✗ Not quite. Try adjusting the variables and observe the simulation.'}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Theory tab */}
      {activeTab === 'theory' && (
        <div className="card p-6 space-y-4 animate-fade-in">
          <div>
            <div className="text-xs text-ink-500 font-semibold uppercase tracking-wider mb-2">Aim</div>
            <p className="text-ink-200">{experiment.aim}</p>
          </div>
          <div>
            <div className="text-xs text-ink-500 font-semibold uppercase tracking-wider mb-2">Apparatus</div>
            <div className="flex flex-wrap gap-2">
              {experiment.apparatus.map((a, i) => (
                <span key={i} className="badge bg-ink-800 text-ink-300">{a}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-ink-500 font-semibold uppercase tracking-wider mb-2">Theory</div>
            <p className="text-ink-200 whitespace-pre-line leading-relaxed">{experiment.theory}</p>
          </div>
        </div>
      )}

      {/* Procedure tab */}
      {activeTab === 'procedure' && (
        <div className="card p-6 space-y-3 animate-fade-in">
          <div className="text-xs text-ink-500 font-semibold uppercase tracking-wider mb-2">Procedure</div>
          <ol className="space-y-3">
            {experiment.procedure.map((p, i) => (
              <li key={i} className="flex gap-3">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <p className="text-ink-200 text-sm leading-relaxed pt-1">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Observations tab */}
      {activeTab === 'observations' && (
        <div className="card p-6 animate-fade-in">
          <div className="text-xs text-ink-500 font-semibold uppercase tracking-wider mb-2">Expected Observations</div>
          <p className="text-ink-200 leading-relaxed">{experiment.observations}</p>
        </div>
      )}

      {/* Graph tab */}
      {activeTab === 'graph' && (
        <div className="card p-6 space-y-4 animate-fade-in">
          <div className="text-xs text-ink-500 font-semibold uppercase tracking-wider mb-2">Graph</div>
          <p className="text-ink-200 leading-relaxed">{experiment.graph}</p>
          <GraphVisualization experimentId={experiment.id} values={values} />
        </div>
      )}

      {/* Conclusion tab */}
      {activeTab === 'conclusion' && (
        <div className="card p-6 animate-fade-in">
          <div className="text-xs text-ink-500 font-semibold uppercase tracking-wider mb-2">Result & Conclusion</div>
          <p className="text-ink-200 leading-relaxed">{experiment.conclusion}</p>
        </div>
      )}
    </div>
  )
}

function VariableControl({ variable, value, onChange }: { variable: Variable; value: number; onChange: (v: number) => void }) {
  return (
    <div className="rounded-xl bg-ink-800/50 border border-ink-700 p-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-ink-200">{variable.label}</label>
        <span className="font-mono text-sm text-accent-400 font-bold">
          {value} {variable.unit}
        </span>
      </div>
      <input
        type="range"
        min={variable.min}
        max={variable.max}
        step={variable.step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-primary-500"
      />
      <div className="flex justify-between text-xs text-ink-500 mt-1">
        <span>{variable.min} {variable.unit}</span>
        <span>{variable.max} {variable.unit}</span>
      </div>
    </div>
  )
}

function SimulationCanvas({ experimentId, values }: { experimentId: string; values: Record<string, number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    ctx.clearRect(0, 0, W, H)

    // Background
    ctx.fillStyle = '#1d2230'
    ctx.fillRect(0, 0, W, H)

    if (experimentId === 'projectile-motion') {
      drawProjectile(ctx, W, H, values.angle, values.velocity)
    } else if (experimentId === 'pendulum-shm') {
      drawPendulum(ctx, W, H, values.length, values.gravity)
    } else if (experimentId === 'ohms-law-circuit') {
      drawCircuit(ctx, W, H, values.voltage, values.resistance)
    } else if (experimentId === 'wave-interference') {
      drawInterference(ctx, W, H, values.wavelength, values.slitSeparation, values.screenDistance)
    } else if (experimentId === 'capacitor-rc') {
      drawRC(ctx, W, H, values.voltage, values.resistance, values.capacitance)
    } else if (experimentId === 'lens-optics') {
      drawLens(ctx, W, H, values.focalLength, values.objectDistance)
    } else if (experimentId === 'doppler-effect') {
      drawDoppler(ctx, W, H, values.sourceFreq, values.sourceSpeed, values.soundSpeed)
    } else if (experimentId === 'photoelectric-effect') {
      drawPhotoelectric(ctx, W, H, values.frequency, values.workFunction)
    }
  }, [experimentId, values])

  return (
    <div className="rounded-xl overflow-hidden border border-ink-700">
      <canvas ref={canvasRef} width={600} height={300} className="w-full" />
    </div>
  )
}

function drawProjectile(ctx: CanvasRenderingContext2D, W: number, H: number, angle: number, velocity: number) {
  const g = 10
  const rad = (angle * Math.PI) / 180
  const vx = velocity * Math.cos(rad)
  const vy = velocity * Math.sin(rad)
  const tFlight = (2 * vy) / g
  const range = (velocity * velocity * Math.sin(2 * rad)) / g
  const maxH = (velocity * velocity * Math.sin(rad) * Math.sin(rad)) / (2 * g)

  const scale = Math.min((W - 80) / Math.max(range, 1), (H - 80) / Math.max(maxH, 1))
  const ox = 40
  const oy = H - 40

  // Ground
  ctx.strokeStyle = '#454f63'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(0, oy)
  ctx.lineTo(W, oy)
  ctx.stroke()

  // Axes
  ctx.strokeStyle = '#5a667d'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(ox, 10)
  ctx.lineTo(ox, oy)
  ctx.lineTo(W - 10, oy)
  ctx.stroke()

  // Trajectory
  ctx.strokeStyle = '#347aff'
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let t = 0; t <= tFlight; t += tFlight / 100) {
    const x = vx * t
    const y = vy * t - 0.5 * g * t * t
    const px = ox + x * scale
    const py = oy - y * scale
    if (t === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.stroke()

  // Launch arrow
  ctx.strokeStyle = '#0bdb98'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(ox, oy)
  ctx.lineTo(ox + 40 * Math.cos(rad), oy - 40 * Math.sin(rad))
  ctx.stroke()

  // Labels
  ctx.fillStyle = '#aab2c3'
  ctx.font = '11px JetBrains Mono'
  ctx.fillText(`Range: ${range.toFixed(1)} m`, 10, 20)
  ctx.fillText(`Max Height: ${maxH.toFixed(1)} m`, 10, 35)
  ctx.fillText(`Time: ${tFlight.toFixed(2)} s`, 10, 50)
}

function drawPendulum(ctx: CanvasRenderingContext2D, W: number, H: number, length: number, gravity: number) {
  const T = 2 * Math.PI * Math.sqrt(length / gravity)
  const omega = Math.sqrt(gravity / length)
  const t = Date.now() / 1000
  const angle = 0.3 * Math.cos(omega * t)

  const pivotX = W / 2
  const pivotY = 30
  const scale = 100
  const bobX = pivotX + scale * length * Math.sin(angle)
  const bobY = pivotY + scale * length * Math.cos(angle)

  // Ceiling
  ctx.strokeStyle = '#454f63'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(50, pivotY)
  ctx.lineTo(W - 50, pivotY)
  ctx.stroke()

  // String
  ctx.strokeStyle = '#aab2c3'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(pivotX, pivotY)
  ctx.lineTo(bobX, bobY)
  ctx.stroke()

  // Bob
  ctx.fillStyle = '#347aff'
  ctx.beginPath()
  ctx.arc(bobX, bobY, 12, 0, 2 * Math.PI)
  ctx.fill()

  // Equilibrium line
  ctx.strokeStyle = '#3a4252'
  ctx.lineWidth = 1
  ctx.setLineDash([4, 4])
  ctx.beginPath()
  ctx.moveTo(pivotX, pivotY)
  ctx.lineTo(pivotX, pivotY + scale * length + 20)
  ctx.stroke()
  ctx.setLineDash([])

  // Labels
  ctx.fillStyle = '#aab2c3'
  ctx.font = '11px JetBrains Mono'
  ctx.fillText(`T = ${T.toFixed(2)} s`, 10, 20)
  ctx.fillText(`L = ${length} m`, 10, 35)
  ctx.fillText(`g = ${gravity} m/s²`, 10, 50)
}

function drawCircuit(ctx: CanvasRenderingContext2D, W: number, H: number, voltage: number, resistance: number) {
  const current = voltage / resistance
  const power = voltage * current

  const cx = W / 2
  const cy = H / 2
  const rw = 200
  const rh = 120

  // Circuit rectangle
  ctx.strokeStyle = '#5a667d'
  ctx.lineWidth = 2
  ctx.strokeRect(cx - rw / 2, cy - rh / 2, rw, rh)

  // Battery (left side)
  ctx.fillStyle = '#347aff'
  ctx.fillRect(cx - rw / 2 - 5, cy - 15, 10, 30)
  ctx.fillStyle = '#aab2c3'
  ctx.font = '11px JetBrains Mono'
  ctx.fillText(`${voltage} V`, cx - rw / 2 - 35, cy + 4)

  // Resistor (top)
  ctx.fillStyle = '#0bdb98'
  ctx.fillRect(cx - 30, cy - rh / 2 - 8, 60, 16)
  ctx.fillText(`${resistance} Ω`, cx - 18, cy - rh / 2 - 14)

  // Current flow animation
  const flowOffset = (Date.now() / 50) % 20
  ctx.strokeStyle = '#fbbf24'
  ctx.lineWidth = 3
  ctx.setLineDash([8, 12])
  ctx.lineDashOffset = -flowOffset
  ctx.strokeRect(cx - rw / 2, cy - rh / 2, rw, rh)
  ctx.setLineDash([])

  // Labels
  ctx.fillStyle = '#aab2c3'
  ctx.font = '11px JetBrains Mono'
  ctx.fillText(`I = ${current.toFixed(2)} A`, 10, 20)
  ctx.fillText(`P = ${power.toFixed(2)} W`, 10, 35)
}

function drawInterference(ctx: CanvasRenderingContext2D, W: number, H: number, wavelength: number, slitSep: number, screenDist: number) {
  const λ = wavelength * 1e-9
  const d = slitSep * 1e-3
  const D = screenDist
  const β = (λ * D / d) * 1000

  // Draw two slits
  const slitY = 40
  const slitGap = 30
  ctx.fillStyle = '#454f63'
  ctx.fillRect(0, slitY, W / 2 - slitGap / 2, 4)
  ctx.fillRect(W / 2 + slitGap / 2, slitY, W / 2 - slitGap / 2, 4)

  // Draw fringe pattern on screen (bottom)
  ctx.fillStyle = '#1d2230'
  ctx.fillRect(0, H - 60, W, 60)

  for (let x = 0; x < W; x += 2) {
    const pos = (x - W / 2) / 10
    const I = Math.pow(Math.cos(Math.PI * pos / β), 2)
    const intensity = Math.round(I * 255)
    ctx.fillStyle = `rgb(${intensity}, ${Math.round(intensity * 0.8)}, ${Math.round(intensity * 0.3)})`
    ctx.fillRect(x, H - 50, 2, 40)
  }

  // Wave fronts from slits
  ctx.strokeStyle = 'rgba(52, 122, 255, 0.15)'
  ctx.lineWidth = 1
  for (let r = 10; r < H - 70; r += 15) {
    ctx.beginPath()
    ctx.arc(W / 2 - slitGap / 2, slitY + 4, r, 0, Math.PI, false)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(W / 2 + slitGap / 2, slitY + 4, r, 0, Math.PI, false)
    ctx.stroke()
  }

  ctx.fillStyle = '#aab2c3'
  ctx.font = '11px JetBrains Mono'
  ctx.fillText(`β = ${β.toFixed(2)} mm`, 10, 20)
  ctx.fillText(`λ = ${wavelength} nm`, 10, 35)
}

function drawRC(ctx: CanvasRenderingContext2D, W: number, H: number, voltage: number, resistance: number, capacitance: number) {
  const τ = (resistance * capacitance) / 1000
  const t = (Date.now() / 1000) % (5 * τ)
  const V = voltage * (1 - Math.exp(-t / τ))

  // Circuit outline
  ctx.strokeStyle = '#5a667d'
  ctx.lineWidth = 2
  const cx = W / 2, cy = H / 2, rw = 200, rh = 120
  ctx.strokeRect(cx - rw / 2, cy - rh / 2, rw, rh)

  // Battery
  ctx.fillStyle = '#347aff'
  ctx.fillRect(cx - rw / 2 - 5, cy - 15, 10, 30)
  ctx.fillStyle = '#aab2c3'
  ctx.font = '11px JetBrains Mono'
  ctx.fillText(`${voltage} V`, cx - rw / 2 - 35, cy + 4)

  // Resistor (top)
  ctx.fillStyle = '#0bdb98'
  ctx.fillRect(cx - 30, cy - rh / 2 - 8, 60, 16)
  ctx.fillText(`${resistance} Ω`, cx - 18, cy - rh / 2 - 14)

  // Capacitor (right)
  ctx.fillStyle = '#fbbf24'
  ctx.fillRect(cx + rw / 2 - 8, cy - 20, 16, 4)
  ctx.fillRect(cx + rw / 2 - 8, cy + 16, 16, 4)
  ctx.fillText(`${capacitance} μF`, cx + rw / 2 + 10, cy + 4)

  // Charging curve (mini)
  ctx.strokeStyle = '#fbbf24'
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let tt = 0; tt <= 5 * τ; tt += 5 * τ / 50) {
    const VV = voltage * (1 - Math.exp(-tt / τ))
    const px = 10 + (tt / (5 * τ)) * 80
    const py = H - 20 - (VV / voltage) * 30
    if (tt === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
  }
  ctx.stroke()

  // Current charge indicator
  const pct = V / voltage
  ctx.fillStyle = '#fbbf24'
  ctx.fillRect(10, H - 25, 80 * pct, 5)
  ctx.strokeStyle = '#5a667d'
  ctx.strokeRect(10, H - 25, 80, 5)

  ctx.fillStyle = '#aab2c3'
  ctx.fillText(`τ = ${τ.toFixed(2)} s`, 10, 20)
  ctx.fillText(`V(t) = ${V.toFixed(2)} V`, 10, 35)
  ctx.fillText(`${(pct * 100).toFixed(1)}% charged`, 10, 50)
}

function drawLens(ctx: CanvasRenderingContext2D, W: number, H: number, focalLength: number, objectDistance: number) {
  const f = focalLength
  const u = objectDistance
  const v = (f * u) / (u - f)
  const m = -v / u

  const lensX = W / 2
  const axisY = H / 2
  const scale = Math.min(60 / Math.max(Math.abs(u), Math.abs(v), f), 1)

  // Principal axis
  ctx.strokeStyle = '#454f63'
  ctx.lineWidth = 1
  ctx.setLineDash([4, 4])
  ctx.beginPath()
  ctx.moveTo(10, axisY)
  ctx.lineTo(W - 10, axisY)
  ctx.stroke()
  ctx.setLineDash([])

  // Lens
  ctx.strokeStyle = '#347aff'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.ellipse(lensX, axisY, 8, 60, 0, 0, 2 * Math.PI)
  ctx.stroke()

  // Focal points
  ctx.fillStyle = '#fbbf24'
  ctx.beginPath(); ctx.arc(lensX - f * scale, axisY, 3, 0, 2 * Math.PI); ctx.fill()
  ctx.beginPath(); ctx.arc(lensX + f * scale, axisY, 3, 0, 2 * Math.PI); ctx.fill()
  ctx.fillStyle = '#aab2c3'; ctx.font = '10px JetBrains Mono'
  ctx.fillText('F', lensX - f * scale - 3, axisY + 15)
  ctx.fillText('F', lensX + f * scale - 3, axisY + 15)

  // Object (arrow up)
  const objX = lensX - u * scale
  ctx.strokeStyle = '#0bdb98'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(objX, axisY)
  ctx.lineTo(objX, axisY - 30)
  ctx.stroke()
  // Arrow head
  ctx.beginPath()
  ctx.moveTo(objX - 4, axisY - 25)
  ctx.lineTo(objX, axisY - 32)
  ctx.lineTo(objX + 4, axisY - 25)
  ctx.stroke()

  // Image
  if (!isFinite(v) || Math.abs(v) > 300) {
    ctx.fillStyle = '#f87171'
    ctx.fillText('Image at infinity', W - 100, 20)
  } else {
    const imgX = lensX + v * scale
    const imgH = 30 * m
    ctx.strokeStyle = v > 0 ? '#f87171' : '#a78bfa'
    ctx.beginPath()
    ctx.moveTo(imgX, axisY)
    ctx.lineTo(imgX, axisY - imgH)
    ctx.stroke()
    // Arrow head
    const dir = imgH > 0 ? -1 : 1
    ctx.beginPath()
    ctx.moveTo(imgX - 4, axisY - imgH + dir * 5)
    ctx.lineTo(imgX, axisY - imgH)
    ctx.lineTo(imgX + 4, axisY - imgH + dir * 5)
    ctx.stroke()
  }

  ctx.fillStyle = '#aab2c3'
  ctx.font = '11px JetBrains Mono'
  ctx.fillText(`f=${f}cm, u=${u}cm, v=${v.toFixed(1)}cm`, 10, 20)
  ctx.fillText(`m=${m.toFixed(2)}`, 10, 35)
}

function drawDoppler(ctx: CanvasRenderingContext2D, W: number, H: number, sourceFreq: number, sourceSpeed: number, soundSpeed: number) {
  const v = soundSpeed
  const vs = sourceSpeed
  const fObs = vs > 0 ? sourceFreq * v / (v + vs) : vs < 0 ? sourceFreq * v / (v - Math.abs(vs)) : sourceFreq

  // Source position (animated)
  const t = Date.now() / 1000
  const sourceX = W / 2 + vs * Math.sin(t) * 0.5
  const sourceY = H / 2

  // Wave fronts
  ctx.strokeStyle = 'rgba(52, 122, 255, 0.3)'
  ctx.lineWidth = 1.5
  for (let r = 10; r < 200; r += 20) {
    const offset = vs > 0 ? r * 0.1 : vs < 0 ? -r * 0.1 : 0
    ctx.beginPath()
    ctx.arc(sourceX + offset, sourceY, r, 0, 2 * Math.PI)
    ctx.stroke()
  }

  // Source
  ctx.fillStyle = '#347aff'
  ctx.beginPath()
  ctx.arc(sourceX, sourceY, 8, 0, 2 * Math.PI)
  ctx.fill()

  // Observer (left side)
  ctx.fillStyle = '#0bdb98'
  ctx.beginPath()
  ctx.arc(40, sourceY, 8, 0, 2 * Math.PI)
  ctx.fill()

  // Direction arrow
  if (vs !== 0) {
    ctx.strokeStyle = '#fbbf24'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(sourceX, sourceY - 20)
    ctx.lineTo(sourceX + (vs > 0 ? 20 : -20), sourceY - 20)
    ctx.stroke()
    // Arrow head
    const dir = vs > 0 ? 1 : -1
    ctx.beginPath()
    ctx.moveTo(sourceX + dir * 20 - dir * 5, sourceY - 23)
    ctx.lineTo(sourceX + dir * 20, sourceY - 20)
    ctx.lineTo(sourceX + dir * 20 - dir * 5, sourceY - 17)
    ctx.stroke()
  }

  ctx.fillStyle = '#aab2c3'
  ctx.font = '11px JetBrains Mono'
  ctx.fillText(`f₀ = ${sourceFreq} Hz`, 10, 20)
  ctx.fillText(`f' = ${fObs.toFixed(1)} Hz`, 10, 35)
  ctx.fillText(`v_s = ${vs} m/s`, 10, 50)
}

function drawPhotoelectric(ctx: CanvasRenderingContext2D, W: number, H: number, frequency: number, workFunction: number) {
  const h = 4.14e-15
  const f = frequency * 1e14
  const E = h * f
  const KE = E - workFunction
  const f0 = workFunction / h / 1e14

  // Metal surface
  ctx.fillStyle = '#454f63'
  ctx.fillRect(W / 2, H / 2 - 40, 80, 80)

  // Incoming photons
  ctx.strokeStyle = '#fbbf24'
  ctx.lineWidth = 2
  for (let i = 0; i < 5; i++) {
    const y = H / 2 - 30 + i * 15
    const x = 30 + (Date.now() / 20 + i * 30) % 150
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + 15, y)
    ctx.stroke()
    // Wavy line for photon
    ctx.beginPath()
    for (let xx = 0; xx < 15; xx += 2) {
      ctx.lineTo(x + xx, y + Math.sin(xx) * 3)
    }
    ctx.stroke()
  }

  // Emitted electrons (if KE > 0)
  if (KE > 0) {
    ctx.fillStyle = '#0bdb98'
    for (let i = 0; i < 4; i++) {
      const y = H / 2 - 20 + i * 15
      const x = W / 2 + 20 + (Date.now() / 15 + i * 40) % 100
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
      // Velocity arrow
      ctx.strokeStyle = '#0bdb98'
      ctx.beginPath()
      ctx.moveTo(x + 4, y)
      ctx.lineTo(x + 12, y)
      ctx.stroke()
    }
  }

  // Labels
  ctx.fillStyle = '#aab2c3'
  ctx.font = '11px JetBrains Mono'
  ctx.fillText(`E = ${E.toFixed(2)} eV`, 10, 20)
  ctx.fillText(`Φ = ${workFunction} eV`, 10, 35)
  if (KE > 0) {
    ctx.fillStyle = '#0bdb98'
    ctx.fillText(`KE = ${KE.toFixed(2)} eV`, 10, 50)
  } else {
    ctx.fillStyle = '#f87171'
    ctx.fillText('Below threshold!', 10, 50)
  }
  ctx.fillStyle = '#aab2c3'
  ctx.fillText(`f₀ = ${f0.toFixed(2)}×10¹⁴ Hz`, W - 120, 20)
}

function ComputedResults({ experimentId, values }: { experimentId: string; values: Record<string, number> }) {
  let results: { label: string; value: string }[] = []

  if (experimentId === 'projectile-motion') {
    const g = 10
    const rad = (values.angle * Math.PI) / 180
    const u = values.velocity
    results = [
      { label: 'Range (R)', value: `${((u * u * Math.sin(2 * rad)) / g).toFixed(2)} m` },
      { label: 'Max Height (H)', value: `${((u * u * Math.sin(rad) * Math.sin(rad)) / (2 * g)).toFixed(2)} m` },
      { label: 'Time of Flight (T)', value: `${((2 * u * Math.sin(rad)) / g).toFixed(2)} s` },
    ]
  } else if (experimentId === 'pendulum-shm') {
    const T = 2 * Math.PI * Math.sqrt(values.length / values.gravity)
    const f = 1 / T
    results = [
      { label: 'Time Period (T)', value: `${T.toFixed(3)} s` },
      { label: 'Frequency (f)', value: `${f.toFixed(3)} Hz` },
      { label: 'Angular Freq (ω)', value: `${Math.sqrt(values.gravity / values.length).toFixed(2)} rad/s` },
    ]
  } else if (experimentId === 'ohms-law-circuit') {
    const I = values.voltage / values.resistance
    results = [
      { label: 'Current (I)', value: `${I.toFixed(3)} A` },
      { label: 'Power (P)', value: `${(values.voltage * I).toFixed(2)} W` },
      { label: 'Verify V = IR', value: `${(I * values.resistance).toFixed(2)} V ✓` },
    ]
  } else if (experimentId === 'wave-interference') {
    const λ = values.wavelength * 1e-9
    const d = values.slitSeparation * 1e-3
    const D = values.screenDistance
    const β = (λ * D / d) * 1000
    results = [
      { label: 'Fringe Width (β)', value: `${β.toFixed(2)} mm` },
      { label: 'Wavelength', value: `${values.wavelength} nm` },
      { label: 'Slit Sep.', value: `${values.slitSeparation} mm` },
    ]
  } else if (experimentId === 'capacitor-rc') {
    const τ = (values.resistance * values.capacitance) / 1000
    results = [
      { label: 'Time Const (τ)', value: `${τ.toFixed(2)} s` },
      { label: '63.2% Charge at', value: `${τ.toFixed(2)} s` },
      { label: 'Max Charge (Q)', value: `${(values.voltage * values.capacitance / 1000).toFixed(2)} mC` },
    ]
  } else if (experimentId === 'lens-optics') {
    const f = values.focalLength
    const u = values.objectDistance
    const v = (f * u) / (u - f)
    const m = -v / u
    results = [
      { label: 'Image Dist (v)', value: `${v.toFixed(1)} cm` },
      { label: 'Magnification', value: `${m.toFixed(2)}×` },
      { label: 'Image Type', value: v > 0 ? 'Real' : 'Virtual' },
    ]
  } else if (experimentId === 'doppler-effect') {
    const v = values.soundSpeed
    const vs = values.sourceSpeed
    const f0 = values.sourceFreq
    const fObs = vs > 0 ? f0 * v / (v + vs) : vs < 0 ? f0 * v / (v - Math.abs(vs)) : f0
    results = [
      { label: 'Observed Freq', value: `${fObs.toFixed(1)} Hz` },
      { label: 'Source Freq', value: `${f0} Hz` },
      { label: 'Shift', value: `${(fObs - f0).toFixed(1)} Hz` },
    ]
  } else if (experimentId === 'photoelectric-effect') {
    const f = values.frequency * 1e14
    const Φ = values.workFunction
    const h = 4.14e-15
    const E = h * f
    const KE = E - Φ
    const f0 = Φ / h / 1e14
    results = [
      { label: 'Photon Energy', value: `${E.toFixed(2)} eV` },
      { label: 'Max KE', value: KE > 0 ? `${KE.toFixed(2)} eV` : 'No emission' },
      { label: 'Threshold f₀', value: `${f0.toFixed(2)}×10¹⁴ Hz` },
    ]
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {results.map((r) => (
        <div key={r.label} className="rounded-xl bg-ink-800/50 border border-ink-700 p-3 text-center">
          <div className="text-xs text-ink-500">{r.label}</div>
          <div className="text-lg font-bold text-accent-400 font-mono mt-1">{r.value}</div>
        </div>
      ))}
    </div>
  )
}

function GraphVisualization({ experimentId, values }: { experimentId: string; values: Record<string, number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = '#1d2230'
    ctx.fillRect(0, 0, W, H)

    // Axes
    ctx.strokeStyle = '#5a667d'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(40, 10)
    ctx.lineTo(40, H - 30)
    ctx.lineTo(W - 10, H - 30)
    ctx.stroke()

    ctx.fillStyle = '#aab2c3'
    ctx.font = '10px JetBrains Mono'

    if (experimentId === 'projectile-motion') {
      ctx.fillText('Range vs Angle', W / 2 - 40, H - 5)
      ctx.fillText('R (m)', 5, 15)
      ctx.fillText('θ (°)', W - 30, H - 35)
      const g = 10; const u = values.velocity
      ctx.strokeStyle = '#347aff'; ctx.lineWidth = 2; ctx.beginPath()
      for (let deg = 0; deg <= 90; deg += 1) {
        const rad = (deg * Math.PI) / 180
        const R = (u * u * Math.sin(2 * rad)) / g
        const px = 40 + (deg / 90) * (W - 60)
        const py = H - 30 - (R / (u * u / g)) * (H - 50)
        if (deg === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
      }
      ctx.stroke(); ctx.fillStyle = '#0bdb98'; ctx.fillText('45°', 40 + (45 / 90) * (W - 60) - 8, H - 18)
    } else if (experimentId === 'pendulum-shm') {
      ctx.fillText('T² vs L', W / 2 - 30, H - 5); ctx.fillText('T² (s²)', 5, 15); ctx.fillText('L (m)', W - 30, H - 35)
      const g = values.gravity; ctx.strokeStyle = '#347aff'; ctx.lineWidth = 2; ctx.beginPath()
      for (let L = 0; L <= 2; L += 0.02) {
        const T = 2 * Math.PI * Math.sqrt(L / g); const T2 = T * T
        const px = 40 + (L / 2) * (W - 60); const py = H - 30 - (T2 / (4 * Math.PI * Math.PI * 2 / g)) * (H - 50)
        if (L === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
      }
      ctx.stroke()
    } else if (experimentId === 'ohms-law-circuit') {
      ctx.fillText('V vs I', W / 2 - 20, H - 5); ctx.fillText('V (V)', 5, 15); ctx.fillText('I (A)', W - 25, H - 35)
      const R = values.resistance; const maxI = 12 / R
      ctx.strokeStyle = '#347aff'; ctx.lineWidth = 2; ctx.beginPath()
      for (let I = 0; I <= maxI; I += maxI / 50) {
        const V = I * R; const px = 40 + (I / maxI) * (W - 60); const py = H - 30 - (V / 12) * (H - 50)
        if (I === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
      }
      ctx.stroke()
    } else if (experimentId === 'wave-interference') {
      ctx.fillText('Intensity vs Position', W / 2 - 50, H - 5); ctx.fillText('I', 5, 15); ctx.fillText('x', W - 20, H - 35)
      const λ = values.wavelength * 1e-9; const d = values.slitSeparation * 1e-3; const D = values.screenDistance
      const β = (λ * D / d) * 1000
      ctx.strokeStyle = '#347aff'; ctx.lineWidth = 2; ctx.beginPath()
      for (let x = -5; x <= 5; x += 0.05) {
        const I = Math.pow(Math.cos(Math.PI * x / β), 2)
        const px = 40 + ((x + 5) / 10) * (W - 60); const py = H - 30 - I * (H - 50)
        if (x === -5) ctx.moveTo(px, py); else ctx.lineTo(px, py)
      }
      ctx.stroke()
    } else if (experimentId === 'capacitor-rc') {
      ctx.fillText('V(t) Charging', W / 2 - 40, H - 5); ctx.fillText('V', 5, 15); ctx.fillText('t', W - 20, H - 35)
      const τ = (values.resistance * values.capacitance) / 1000; const V0 = values.voltage
      ctx.strokeStyle = '#347aff'; ctx.lineWidth = 2; ctx.beginPath()
      for (let t = 0; t <= 5 * τ; t += 5 * τ / 100) {
        const V = V0 * (1 - Math.exp(-t / τ))
        const px = 40 + (t / (5 * τ)) * (W - 60); const py = H - 30 - (V / V0) * (H - 50)
        if (t === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
      }
      ctx.stroke()
      ctx.strokeStyle = '#fbbf24'; ctx.setLineDash([4, 4]); ctx.beginPath()
      ctx.moveTo(40 + (τ / (5 * τ)) * (W - 60), H - 30); ctx.lineTo(40 + (τ / (5 * τ)) * (W - 60), H - 30 - 0.632 * (H - 50)); ctx.stroke(); ctx.setLineDash([])
    } else if (experimentId === 'lens-optics') {
      ctx.fillText('1/v vs 1/u', W / 2 - 30, H - 5); ctx.fillText('1/v', 5, 15); ctx.fillText('1/u', W - 25, H - 35)
      const f = values.focalLength
      ctx.strokeStyle = '#347aff'; ctx.lineWidth = 2; ctx.beginPath()
      for (let u = f + 1; u <= 200; u += 2) {
        const v = (f * u) / (u - f)
        const px = 40 + ((1 / u) * 5) * (W - 60); const py = H - 30 - ((1 / v) * 5) * (H - 50)
        if (u === f + 1) ctx.moveTo(px, py); else ctx.lineTo(px, py)
      }
      ctx.stroke()
    } else if (experimentId === 'doppler-effect') {
      ctx.fillText('f vs Source Speed', W / 2 - 50, H - 5); ctx.fillText('f (Hz)', 5, 15); ctx.fillText('v_s', W - 25, H - 35)
      const v = values.soundSpeed; const f0 = values.sourceFreq
      ctx.strokeStyle = '#347aff'; ctx.lineWidth = 2; ctx.beginPath()
      for (let vs = -200; vs <= 200; vs += 4) {
        const fObs = vs > 0 ? f0 * v / (v + vs) : vs < 0 ? f0 * v / (v - Math.abs(vs)) : f0
        const px = 40 + ((vs + 200) / 400) * (W - 60); const py = H - 30 - (fObs / (f0 * 2)) * (H - 50)
        if (vs === -200) ctx.moveTo(px, py); else ctx.lineTo(px, py)
      }
      ctx.stroke()
    } else if (experimentId === 'photoelectric-effect') {
      ctx.fillText('Stopping V vs Frequency', W / 2 - 60, H - 5); ctx.fillText('V_s (V)', 5, 15); ctx.fillText('f', W - 20, H - 35)
      const Φ = values.workFunction; const h = 4.14e-15
      ctx.strokeStyle = '#347aff'; ctx.lineWidth = 2; ctx.beginPath()
      for (let f = 4; f <= 12; f += 0.1) {
        const E = h * f * 1e14; const Vs = Math.max(0, (E - Φ))
        const px = 40 + ((f - 4) / 8) * (W - 60); const py = H - 30 - (Vs / 10) * (H - 50)
        if (f === 4) ctx.moveTo(px, py); else ctx.lineTo(px, py)
      }
      ctx.stroke()
    }
  }, [experimentId, values])

  return (
    <div className="rounded-xl overflow-hidden border border-ink-700">
      <canvas ref={canvasRef} width={500} height={250} className="w-full" />
    </div>
  )
}
