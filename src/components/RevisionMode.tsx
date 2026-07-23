import { useState } from 'react'
import type { Level } from '../types'

interface FlashCard {
  topic: string
  concept: string
  formula: string
  keyPoint: string
}

const flashcards: FlashCard[] = [
  // Mechanics
  { topic: 'Units & Dimensions', concept: 'Dimensional Analysis', formula: '[Force] = [MLT⁻²]\n[Energy] = [ML²T⁻²]\n[Power] = [ML²T⁻³]\n[Pressure] = [ML⁻¹T⁻²]', keyPoint: 'Planck\'s constant h has dimensions [ML²T⁻¹]. Strain and angle are dimensionless. % error in product: add relative errors.' },
  { topic: 'Vectors', concept: 'Dot & Cross Products', formula: 'A·B = |A||B|cosθ\nA×B = |A||B|sinθ n̂\nA·B = AₓBₓ + AᵧBᵧ + A_zB_z', keyPoint: 'Dot product gives scalar (work, power). Cross product gives vector (torque, angular momentum). A×B = −B×A.' },
  { topic: 'Kinematics', concept: 'Equations of Motion', formula: 'v = u + at\ns = ut + ½at²\nv² = u² + 2as\ndₙ = u + ½a(2n−1)', keyPoint: 'Distance in nth second: 1:3:5 ratio (from rest). Projectile: max range at 45°, complementary angles give same range.' },
  { topic: 'Kinematics', concept: 'Projectile Motion', formula: 'R = u²sin(2θ)/g\nH = u²sin²θ/(2g)\nT = 2usinθ/g', keyPoint: 'Max range at 45°. Complementary angles (θ and 90°−θ) give equal ranges. Time depends only on vertical component.' },
  { topic: "Newton's Laws", concept: 'F = ma & Friction', formula: 'F = ma\nf_s ≤ μ_s N\nf_k = μ_k N\nN = m(g ± a) in lift', keyPoint: 'Rocket: conservation of momentum. Apparent weight in lift: N = m(g±a). Angle of repose: tanθ = μ.' },
  { topic: 'Work & Energy', concept: 'Energy Conservation', formula: 'KE = ½mv²\nPE = mgh\nW = Fd cosθ\nP = Fv = I²R', keyPoint: 'Elastic: KE and momentum conserved. Inelastic: only momentum. Spring energy: U = ½kx². 1 hp = 746 W.' },
  { topic: 'Circular Motion', concept: 'Centripetal Force', formula: 'F = mv²/r\na = v²/r\ntanθ = v²/(rg) (banking)\nv_top = √(gr) (vertical)', keyPoint: 'Centripetal force is the NET force toward center. Banking angle: tanθ = v²/(rg). Min velocity at top of loop: √(gr).' },
  { topic: 'Gravitation', concept: 'Orbital Mechanics', formula: 'F = Gm₁m₂/r²\ng = GM/R²\nv_esc = √(2gR) ≈ 11.2 km/s\nv_orb = √(gR) ≈ 7.9 km/s', keyPoint: "Kepler: T² ∝ r³. g at center = 0. g at height h: g(1−2h/R). Geostationary: 24h period, equatorial orbit." },
  { topic: 'Rotational Motion', concept: 'Moment of Inertia', formula: 'I_sphere = (2/5)MR²\nI_cylinder = (1/2)MR²\nI_rod(center) = (1/12)ML²\nI = I_cm + Md²', keyPoint: 'Parallel axis: I = I_cm + Md². Rolling: a = g sinθ/(1+I/mr²). Solid sphere: a = 5g sinθ/7. Angular momentum: L = Iω.' },
  { topic: 'Fluids', concept: 'Bernoulli & Buoyancy', formula: 'P = ρgh\nF_b = ρVg\nP + ½ρv² + ρgh = const\nA₁v₁ = A₂v₂', keyPoint: 'Buoyant force = weight of displaced fluid. Bernoulli: conservation of energy. Continuity: conservation of mass. Stokes: F = 6πηrv.' },
  { topic: 'Elasticity', concept: "Hooke's Law", formula: 'Y = stress/strain = (F/A)/(ΔL/L)\nK = −VΔP/ΔV\nG = (F/A)/θ\nU = ½Y(strain)²×vol', keyPoint: "Young's modulus = stress/strain. Y = 2G(1+σ), K = Y/(3(1−2σ)). Poisson ratio: 0 to 0.5. Area under stress-strain = toughness." },

  // Thermal
  { topic: 'Thermal Expansion', concept: 'Linear & Volume', formula: 'ΔL = L₀αΔT\nΔA = A₀(2α)ΔT\nΔV = V₀(3α)ΔT\nγ = 3α', keyPoint: 'Volume expansion coefficient = 3× linear. Bimetallic strips bend due to different α. Water anomalies near 4°C.' },
  { topic: 'Calorimetry', concept: 'Heat Transfer', formula: 'Q = mcΔT\nQ = mL\nP = σeAT⁴ (Stefan)\nQ/t = kA(ΔT/Δx)', keyPoint: 'Conduction (solids), convection (fluids), radiation (vacuum). Stefan: P ∝ T⁴. Wien: λ_max×T = b. Newton cooling: dT/dt = −k(T−T_s).' },
  { topic: 'Thermodynamics', concept: 'Laws & Carnot', formula: 'ΔU = Q − W\nW = PΔV (isobaric)\nη = 1 − Tc/Th\nW = nRT ln(V₂/V₁) (iso)', keyPoint: 'Isothermal: ΔU=0, Q=W. Adiabatic: Q=0, ΔU=−W. Carnot: max efficiency = 1−Tc/Th. Second law: entropy increases.' },
  { topic: 'Kinetic Theory', concept: 'Gas Properties', formula: 'v_rms = √(3RT/M)\nP = (1/3)ρv²\nKE_avg = (3/2)kT\nγ = (f+2)/f', keyPoint: 'Monoatomic: f=3, γ=5/3. Diatomic: f=5, γ=7/5. KE depends only on T. RMS > avg > most probable speed.' },

  // Waves
  { topic: 'SHM', concept: 'Oscillations', formula: 'T = 2π√(m/k) (spring)\nT = 2π√(L/g) (pendulum)\nE = ½kA²\nv_max = Aω', keyPoint: 'Pendulum T independent of mass and amplitude. v max at equilibrium, a max at extremes. Energy ∝ A².' },
  { topic: 'Wave Motion', concept: 'Wave Properties', formula: 'v = fλ\nv = √(T/μ) (string)\nv = √(γP/ρ) (sound gas)\nβ = λD/d (fringe)', keyPoint: 'Standing wave: nodes (zero) and antinodes (max). String: λ=2L/n. Open pipe: λ=2L/n. Closed pipe: λ=4L/(2n−1), odd harmonics only.' },
  { topic: 'Sound', concept: 'Doppler Effect', formula: "f' = f×v/(v−v_s) (approach)\nf' = f×v/(v+v_s) (recede)\nv ≈ 331 + 0.6T m/s", keyPoint: 'Approaching: higher pitch. Receding: lower pitch. Speed of sound increases 0.6 m/s per °C. Beats: |f₁−f₂|.' },

  // Electromagnetism
  { topic: 'Electrostatics', concept: 'Fields & Potential', formula: 'F = kq₁q₂/r²\nE = kq/r²\nV = kq/r\n∮E·dA = Q/ε₀', keyPoint: 'k = 9×10⁹. E = −dV/dx. Inside conductor: E=0, V=const. Dipole moment: p = qd (− to +).' },
  { topic: 'Capacitors', concept: 'Capacitance', formula: 'C = ε₀A/d\nC = κε₀A/d (dielectric)\nSeries: C = C₁C₂/(C₁+C₂)\nU = ½CV²', keyPoint: 'Dielectric increases C by factor κ. Series: less than smallest. Parallel: sum. RC time constant: τ = RC (63.2% charge).' },
  { topic: 'Current Electricity', concept: "Ohm's & Kirchhoff's", formula: 'V = IR\nR = ρL/A\nP = I²R = V²/R\nKCL: ΣI_in = ΣI_out', keyPoint: 'Stretching wire to 2L → R becomes 4R. KCL = charge conservation. KVL = energy conservation. Wheatstone bridge for R measurement.' },
  { topic: 'Magnetism', concept: 'Magnetic Fields', formula: 'B = μ₀I/2πr (wire)\nB = μ₀nI (solenoid)\nF = BIL sinθ\nF = qvB sinθ', keyPoint: 'Biot-Savart: dB = (μ₀/4π)(Idl sinθ/r²). Parallel wires: same direction attract. Charged particle: circular path in B field.' },
  { topic: 'EM Induction', concept: "Faraday's Law", formula: 'ε = −N(dΦ/dt)\nε = BLv (motional)\nε = −L(dI/dt)\nΦ = BA cosθ', keyPoint: "Lenz's law: induced current opposes change (energy conservation). Motional EMF: ε = BLv. Self-inductance unit: Henry." },
  { topic: 'AC Circuits', concept: 'LCR & Resonance', formula: 'I_rms = I₀/√2\nZ = √(R²+(X_L−X_C)²)\nf₀ = 1/(2π√(LC))\nP = VI cosφ', keyPoint: 'Resonance: X_L = X_C, Z = R (min), I max. Pure L: current lags 90°. Pure C: current leads 90°. Transformer: V_s/V_p = N_s/N_p.' },
  { topic: 'EM Waves', concept: 'Electromagnetic Spectrum', formula: 'c = 3×10⁸ m/s\nc = fλ\nE = hf\nRadio → Gamma', keyPoint: 'EM waves are transverse. All travel at c in vacuum. Radio: longest λ. Gamma: shortest λ, highest energy.' },

  // Optics
  { topic: 'Ray Optics', concept: 'Lenses & Mirrors', formula: '1/v − 1/u = 1/f (lens)\n1/v + 1/u = 1/f (mirror)\nm = v/u\nP = 1/f (diopter)', keyPoint: 'Convex lens: converging. Concave: diverging. TIR: sinθc = n₂/n₁. Fiber optics use TIR. Magnifier: M = 1 + D/f.' },
  { topic: 'Wave Optics', concept: 'Interference', formula: 'β = λD/d (fringe width)\nBright: Δ = nλ\nDark: Δ = (n+½)λ\nI = 4I₀cos²(φ/2)', keyPoint: "Young's double-slit proves wave nature. Polarization proves transverse. Malus: I = I₀cos²θ. Brewster: tanθ_p = n." },

  // Modern Physics
  { topic: 'Dual Nature', concept: 'Photoelectric & de Broglie', formula: 'hf = Φ + KE_max\nf₀ = Φ/h\nλ = h/p = h/(mv)\nλ = 12.27/√V Å (electron)', keyPoint: 'Below threshold f₀: no emission. KE depends on frequency, not intensity. Number of electrons depends on intensity.' },
  { topic: 'Atomic Physics', concept: 'Bohr Model', formula: 'E_n = −13.6/n² eV\nr_n = n²a₀\nL = nh/(2π)\n1/λ = R(1/n_f²−1/n_i²)', keyPoint: 'Lyman (UV): to n=1. Balmer (visible): to n=2. Paschen (IR): to n=3. Ground state H: −13.6 eV.' },
  { topic: 'Nuclear Physics', concept: 'Fission & Fusion', formula: 'E = mc²\nN = N₀(1/2)^(t/T)\nλ = ln2/T₁/₂\nBE = Δmc²', keyPoint: 'Fission: U-235 splits, releases energy. Fusion: H→He (Sun). Half-life: time for half to decay. BE/nucleon peaks at Fe-56.' },
  { topic: 'Semiconductors', concept: 'Diodes & Transistors', formula: 'V_out = V_p − V_drop (rectifier)\nβ = I_C/I_B\nV_CE = V_CC − I_C R_C', keyPoint: 'PN junction: forward bias conducts, reverse blocks. Zener: voltage regulation. CE amplifier: input at base, output at collector. NAND/NOR are universal gates.' },

  // University
  { topic: 'Lagrangian', concept: 'Euler-Lagrange', formula: 'L = T − V\nd/dt(∂L/∂q̇) − ∂L/∂q = 0\nH = T + V\nq̇ = ∂H/∂p, ṗ = −∂H/∂q', keyPoint: 'Generalized coordinates. Noether: symmetries → conservation laws. Pendulum: θ̈ = −(g/L)sinθ from L = ½mL²θ̇² + mgL cosθ.' },
  { topic: "Maxwell's Eq", concept: 'EM Field Equations', formula: '∇·E = ρ/ε₀\n∇·B = 0\n∇×E = −∂B/∂t\n∇×B = μ₀J + μ₀ε₀∂E/∂t', keyPoint: 'No magnetic monopoles. Displacement current = Maxwell\'s addition. Wave equation: ∇²E = μ₀ε₀ ∂²E/∂t², c = 1/√(μ₀ε₀).' },
  { topic: 'Quantum', concept: 'Schrödinger Equation', formula: 'iℏ∂ψ/∂t = Ĥψ\nĤ = −ℏ²/(2m)∇² + V\nΔxΔp ≥ ℏ/2\nE_n = n²π²ℏ²/(2mL²)', keyPoint: '|ψ|² = probability density. Must normalize: ∫|ψ|²dV = 1. Infinite well: E_n = n²π²ℏ²/(2mL²), ψ_n = √(2/L)sin(nπx/L).' },
  { topic: 'Relativity', concept: 'Lorentz Transform', formula: 'γ = 1/√(1−v²/c²)\nΔt\' = γΔt₀\nL = L₀/γ\nE = mc², E² = (pc)² + (m₀c²)²', keyPoint: 'Time dilation: moving clock runs slow. Length contraction: moving objects shorter. Velocity addition: u = (u\'+v)/(1+u\'v/c²). GPS needs relativity.' },
  { topic: 'Statistical', concept: 'Boltzmann Distribution', formula: 'P(E) ∝ e^(−E/kT)\nZ = Σe^(−E_i/kT)\n⟨E⟩ = −∂(ln Z)/∂β\nS = k ln(W)', keyPoint: 'Partition function Z gives all thermodynamics. Equipartition: ½kT per DOF. v_rms = √(3kT/m). Boltzmann entropy: S = k ln W.' },
]

export default function RevisionMode({ level: _level }: { level: Level }) {
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [filter, setFilter] = useState<string | null>(null)

  const cards = filter ? flashcards.filter((c) => c.topic === filter) : flashcards
  const card = cards[idx % cards.length]
  const topicsList = Array.from(new Set(flashcards.map((c) => c.topic)))

  const next = () => { setFlipped(false); setIdx((i) => i + 1) }
  const prev = () => { setFlipped(false); setIdx((i) => Math.max(0, i - 1)) }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-100">Rapid Revision</h2>
        <p className="text-ink-400 mt-1">Flash through key formulas and concepts. Click a card to flip between formula and key point.</p>
      </div>

      {/* Topic filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setFilter(null); setIdx(0) }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${!filter ? 'bg-primary-600 text-white' : 'bg-ink-800 text-ink-400 hover:bg-ink-700'}`}
        >
          All ({flashcards.length})
        </button>
        {topicsList.map((t) => (
          <button
            key={t}
            onClick={() => { setFilter(t); setIdx(0) }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === t ? 'bg-primary-600 text-white' : 'bg-ink-800 text-ink-400 hover:bg-ink-700'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Flashcard */}
      <div className="relative" style={{ perspective: '1000px' }}>
        <div
          onClick={() => setFlipped((f) => !f)}
          className="relative w-full cursor-pointer transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            minHeight: '280px',
          }}
        >
          {/* Front — Formula */}
          <div
            className="card p-8 absolute inset-0 flex flex-col items-center justify-center text-center"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <div className="badge bg-primary-500/10 text-primary-300 mb-4">{card.topic}</div>
            <h3 className="text-xl font-bold text-ink-100 mb-4">{card.concept}</h3>
            <pre className="formula-text text-lg">{card.formula}</pre>
            <div className="absolute bottom-3 right-4 text-xs text-ink-500">Click to flip →</div>
          </div>
          {/* Back — Key point */}
          <div
            className="card p-8 absolute inset-0 flex flex-col items-center justify-center text-center"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="badge bg-amber-500/10 text-amber-300 mb-4">Key Point</div>
            <h3 className="text-lg font-bold text-ink-100 mb-3">{card.concept}</h3>
            <p className="text-ink-200 leading-relaxed text-sm max-w-md">{card.keyPoint}</p>
            <div className="absolute bottom-3 right-4 text-xs text-ink-500">← Click to flip back</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button onClick={prev} className="btn-ghost text-sm">← Previous</button>
        <div className="text-sm text-ink-400 font-mono">{(idx % cards.length) + 1} / {cards.length}</div>
        <button onClick={next} className="btn-ghost text-sm">Next →</button>
      </div>
    </div>
  )
}
