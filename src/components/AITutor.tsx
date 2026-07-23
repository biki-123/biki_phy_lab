import { useState, useRef, useEffect } from 'react'
import type { Level } from '../types'
import { conceptLessons } from '../data/concepts'
import { allMCQs } from '../data/mcqs'
import { numericalProblems } from '../data/numericals'
import { topics } from '../data/topics'

interface Message {
  role: 'user' | 'ai'
  content: string
  references?: string[]
}

interface AITutorProps {
  level: Level
}

// Physics knowledge base for the AI tutor
const knowledgeBase: { keywords: string[]; response: string; references?: string[] }[] = [
  {
    keywords: ['newton', 'law', 'motion', 'force', 'inertia', 'f=ma'],
    response: "Newton's Three Laws of Motion:\n\n1. **First Law (Inertia):** An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted on by a net external force.\n\n2. **Second Law (F = ma):** The net force on an object equals its mass times acceleration. F = ma. The direction of acceleration is the same as the direction of the net force.\n\n3. **Third Law (Action-Reaction):** For every action, there is an equal and opposite reaction. The forces act on different objects.\n\nKey formulas:\n• F = ma\n• Impulse: J = F×t = Δp\n• Apparent weight in lift: N = m(g ± a)\n• Friction: f = μN\n\nWould you like me to explain any of these in more detail, or try a practice problem?",
    references: ['Newton\'s Laws of Motion'],
  },
  {
    keywords: ['kinematics', 'motion', 'velocity', 'acceleration', 'projectile', 'equation of motion'],
    response: "Kinematics — Motion in 1D and 2D:\n\n**Equations of Motion (constant acceleration):**\n1. v = u + at\n2. s = ut + ½at²\n3. v² = u² + 2as\n\n**Projectile Motion:**\n• Range: R = u²sin(2θ)/g\n• Max Height: H = u²sin²θ/(2g)\n• Time of Flight: T = 2usinθ/g\n• Maximum range occurs at θ = 45°\n• Complementary angles (θ and 90°−θ) give the same range\n\n**Key concepts:**\n• Distance in nth second: dₙ = u + ½a(2n−1)\n• For free fall: u = 0, a = g (downward)\n• Horizontal and vertical motions are independent in projectiles\n\nWould you like a worked example or practice problem?",
    references: ['Kinematics — Motion in 1D & 2D'],
  },
  {
    keywords: ['shm', 'simple harmonic', 'oscillation', 'pendulum', 'spring', 'period'],
    response: "Simple Harmonic Motion (SHM):\n\n**Key formulas:**\n• Restoring force: F = −kx\n• Angular frequency: ω = √(k/m) for spring, ω = √(g/L) for pendulum\n• Period: T = 2π√(m/k) for spring, T = 2π√(L/g) for pendulum\n• Total energy: E = ½kA²\n• Max velocity: v_max = Aω (at equilibrium)\n• Max acceleration: a_max = ω²A (at extremes)\n\n**Key points:**\n• Velocity is maximum at equilibrium, zero at extremes\n• Acceleration is maximum at extremes, zero at equilibrium\n• Pendulum period is independent of mass and amplitude (small angles)\n• Energy oscillates between KE and PE\n\nWould you like to see a worked problem on SHM?",
    references: ['Oscillations & SHM'],
  },
  {
    keywords: ['ohm', 'current', 'resistance', 'circuit', 'voltage', 'kirchhoff'],
    response: "Current Electricity:\n\n**Ohm's Law:** V = IR\n\n**Resistance:**\n• R = ρL/A (depends on material, length, area)\n• Series: R = R₁ + R₂ + ...\n• Parallel: 1/R = 1/R₁ + 1/R₂ + ...\n• Stretching wire to 2L → R becomes 4R\n\n**Kirchhoff's Laws:**\n• KCL (Junction Rule): ΣI_in = ΣI_out (conservation of charge)\n• KVL (Loop Rule): ΣV = 0 around any loop (conservation of energy)\n\n**Power:** P = VI = I²R = V²/R\n\n**Wheatstone Bridge:** Used for precise resistance measurement. Balanced when P/Q = R/S.\n\nWould you like to solve a circuit problem?",
    references: ['Current Electricity'],
  },
  {
    keywords: ['electrostatics', 'charge', 'coulomb', 'electric field', 'gauss', 'potential'],
    response: "Electrostatics:\n\n**Coulomb's Law:** F = kq₁q₂/r² (k = 9×10⁹ N·m²/C²)\n\n**Electric Field:** E = kq/r² (point charge), F = qE\n\n**Electric Potential:** V = kq/r (point charge), V = W/q\n\n**Gauss's Law:** ∮E·dA = Q_enclosed/ε₀\n\n**Electric Dipole:** p = qd, moment points from − to +\n\n**Key relationships:**\n• E = −dV/dx (field is negative gradient of potential)\n• Equipotential surfaces are perpendicular to field lines\n• Inside a conductor, E = 0 and V = constant\n\nWould you like a worked example on any of these?",
    references: ['Electrostatics'],
  },
  {
    keywords: ['optics', 'lens', 'mirror', 'reflection', 'refraction', 'light', 'snell'],
    response: "Optics — Ray Optics:\n\n**Reflection:** Angle of incidence = Angle of reflection (both from normal)\n\n**Refraction (Snell's Law):** n₁sinθ₁ = n₂sinθ₂\n• Light bends toward normal entering denser medium\n• Total internal reflection when θ > critical angle: sinθc = n₂/n₁\n\n**Lens Formula:** 1/v − 1/u = 1/f\n**Mirror Formula:** 1/v + 1/u = 1/f\n**Magnification:** m = v/u = h_i/h_o\n**Power of lens:** P = 1/f (in meters, unit: diopter)\n\n**Sign convention (Cartesian):**\n• Distances measured from optical center/pole\n• Right = positive, Left = negative\n• Above principal axis = positive\n\nWould you like to solve a lens or mirror problem?",
    references: ['Ray Optics & Optical Instruments'],
  },
  {
    keywords: ['thermodynamics', 'heat', 'entropy', 'carnot', 'engine', 'adiabatic', 'isothermal'],
    response: "Thermodynamics:\n\n**First Law:** ΔU = Q − W\n• Q = heat added to system\n• W = work done BY system\n• ΔU = change in internal energy\n\n**Special processes:**\n• Isothermal (T = const): ΔU = 0, Q = W = nRT ln(V₂/V₁)\n• Adiabatic (Q = 0): ΔU = −W, PV^γ = const\n• Isobaric (P = const): W = PΔV\n• Isochoric (V = const): W = 0, Q = ΔU\n\n**Second Law:** Entropy of the universe always increases\n\n**Carnot Engine:**\n• Efficiency: η = 1 − Tc/Th\n• Maximum possible efficiency between two temperatures\n• Tc and Th must be in Kelvin\n\nWould you like a worked thermodynamics problem?",
    references: ['Thermodynamics'],
  },
  {
    keywords: ['gravitation', 'gravity', 'kepler', 'orbit', 'satellite', 'escape velocity'],
    response: "Gravitation:\n\n**Newton's Law of Gravitation:** F = Gm₁m₂/r² (G = 6.67×10⁻¹¹)\n\n**Kepler's Laws:**\n1. Planets orbit in ellipses with Sun at one focus\n2. Equal areas in equal times (areal velocity is constant)\n3. T² ∝ r³ (period squared proportional to semi-major axis cubed)\n\n**Key formulas:**\n• g = GM/R² (surface gravity)\n• g' = g(1 − 2h/R) at height h (h << R)\n• Escape velocity: v_esc = √(2gR) ≈ 11.2 km/s\n• Orbital velocity: v_orb = √(gR) ≈ 7.9 km/s\n• Geostationary period: 24 hours\n\n• g at center of Earth = 0\n• g decreases with altitude and depth\n\nWould you like a worked problem on gravitation?",
    references: ['Gravitation'],
  },
  {
    keywords: ['capacitor', 'capacitance', 'dielectric'],
    response: "Capacitors & Dielectrics:\n\n**Capacitance:** C = Q/V\n• Parallel plate: C = ε₀A/d\n• With dielectric: C = κε₀A/d (κ = dielectric constant)\n\n**Combinations:**\n• Series: 1/C = 1/C₁ + 1/C₂ → C = C₁C₂/(C₁+C₂)\n• Parallel: C = C₁ + C₂\n\n**Energy stored:** U = ½CV² = Q²/(2C) = ½QV\n\n**RC Charging:** V(t) = V₀(1 − e^(-t/RC))\n**RC Discharging:** V(t) = V₀ × e^(-t/RC)\n**Time constant:** τ = RC (63.2% charge in one τ)\n\nWould you like a worked capacitor problem?",
    references: ['Capacitors & Dielectectors'],
  },
  {
    keywords: ['magnetic', 'magnetism', 'biot', 'ampere', 'solenoid', 'field'],
    response: "Magnetic Effects of Current:\n\n**Biot-Savart Law:** dB = (μ₀/4π)(I dl sinθ/r²)\n\n**Ampere's Law:** ∮B·dl = μ₀I (for long straight wire: B = μ₀I/2πr)\n\n**Field configurations:**\n• Long straight wire: B = μ₀I/2πr\n• Circular loop center: B = μ₀I/2r\n• Solenoid: B = μ₀nI (n = turns/m)\n• Toroid: B = μ₀NI/2πr\n\n**Force on current:** F = BIL sinθ (on straight wire)\n**Force on charge:** F = qvB sinθ (Lorentz force)\n\n**Parallel wires:** Same direction → attract, opposite → repel\n\nWould you like a worked magnetism problem?",
    references: ['Magnetic Effects of Current'],
  },
  {
    keywords: ['em', 'induction', 'faraday', 'lenz', 'flux', 'generator'],
    response: "Electromagnetic Induction:\n\n**Faraday's Law:** ε = −N(dΦ/dt)\n• EMF induced = rate of change of magnetic flux × number of turns\n\n**Lenz's Law:** Induced current opposes the change in flux (conservation of energy)\n\n**Motional EMF:** ε = BLv (rod moving in B field)\n\n**Self-inductance:** ε = −L(dI/dt), L measured in Henry\n**Mutual inductance:** ε₂ = −M(dI₁/dt)\n\n**AC Generator:** ε = NBAω sin(ωt) — converts mechanical to electrical energy\n\n**Eddy currents:** Circulating currents in conductors opposing change in flux — used in braking, induction cooktops\n\nWould you like a worked EM induction problem?",
    references: ['Electromagnetic Induction'],
  },
  {
    keywords: ['ac', 'alternating', 'rms', 'resonance', 'lcr', 'transformer', 'power factor'],
    response: "AC Circuits:\n\n**RMS values:** I_rms = I₀/√2, V_rms = V₀/√2\n\n**Reactance:**\n• Inductive: X_L = ωL = 2πfL\n• Capacitive: X_C = 1/(ωC) = 1/(2πfC)\n\n**Impedance (LCR series):** Z = √(R² + (X_L − X_C)²)\n\n**Phase:**\n• Pure R: V and I in phase\n• Pure L: Current lags V by 90°\n• Pure C: Current leads V by 90°\n\n**Resonance:** X_L = X_C → f₀ = 1/(2π√(LC))\n• Z = R (minimum), I = V/R (maximum)\n\n**Power:** P = VI cosφ (cosφ = power factor = R/Z)\n\n**Transformer:** V_s/V_p = N_s/N_p (step-up/step-down)\n\nWould you like a worked AC circuit problem?",
    references: ['AC Circuits'],
  },
  {
    keywords: ['photoelectric', 'photon', 'de broglie', 'dual nature', 'work function'],
    response: "Dual Nature of Radiation & Matter:\n\n**Photoelectric Effect (Einstein):**\n• hf = Φ + KE_max\n• Φ = work function (minimum energy to eject electron)\n• Threshold frequency: f₀ = Φ/h\n• Below f₀, no emission regardless of intensity\n• KE depends on frequency, not intensity\n• Number of electrons depends on intensity\n\n**de Broglie Wavelength:** λ = h/p = h/(mv)\n• Every particle has an associated wavelength\n• For electron: λ = 12.27/√V Å (V in volts)\n\n**Key evidence:**\n• Photoelectric effect → particle nature\n• Interference/diffraction → wave nature\n• Both coexist (complementarity principle)\n\nWould you like a worked problem on photoelectric effect or de Broglie wavelength?",
    references: ['Dual Nature of Radiation & Matter'],
  },
  {
    keywords: ['bohr', 'atom', 'hydrogen', 'energy level', 'spectrum', 'rydberg'],
    response: "Atomic Physics — Bohr Model:\n\n**Bohr's Postulates:**\n1. Electrons orbit in stationary states (no radiation)\n2. Angular momentum is quantized: L = nh/(2π)\n3. Energy emitted/absorbed when electron transitions: hf = E₂ − E₁\n\n**Hydrogen atom formulas:**\n• Radius: r_n = n²a₀ (a₀ = 0.529 Å)\n• Energy: E_n = −13.6/n² eV\n• Velocity: v_n = c × (1/137)/n\n\n**Spectral series:**\n• Lyman (UV): transitions to n=1\n• Balmer (Visible): transitions to n=2\n• Paschen (IR): transitions to n=3\n\n**Rydberg formula:** 1/λ = R(1/n_f² − 1/n_i²), R = 1.097×10⁷ m⁻¹\n\nWould you like a worked atomic physics problem?",
    references: ['Atomic Physics'],
  },
  {
    keywords: ['nuclear', 'fission', 'fusion', 'radioactivity', 'half life', 'binding energy'],
    response: "Nuclear Physics:\n\n**Mass-Energy:** E = mc² (c = 3×10⁸ m/s)\n\n**Radioactive decay:** N = N₀(1/2)^(t/T₁/₂)\n• Half-life T₁/₂: time for half the nuclei to decay\n• Decay constant: λ = ln2/T₁/₂\n• Activity: A = λN\n\n**Binding energy:**\n• BE = Δm × c² (mass defect × c²)\n• BE per nucleon peaks at Iron-56 (≈8.8 MeV/nucleon)\n• Fission (A > 56): releases energy\n• Fusion (A < 56): releases energy\n\n**Alpha (⁴He), Beta (e⁻/e⁺), Gamma (photon) decay**\n\n**Nuclear reactors:** Controlled fission of U-235\n**Hydrogen bomb/Fusion:** Uncontrolled fusion of H → He\n\nWould you like a worked nuclear physics problem?",
    references: ['Nuclear Physics'],
  },
  {
    keywords: ['fluid', 'pressure', 'bernoulli', 'buoyancy', 'archimedes', 'viscosity'],
    response: "Fluid Mechanics:\n\n**Pressure:** P = ρgh (at depth h in fluid)\n• Pascal's Law: Pressure applied to enclosed fluid is transmitted equally\n\n**Buoyancy (Archimedes):** F_b = ρ_fluid × V_displaced × g\n• Float if ρ_body < ρ_fluid\n• Sink if ρ_body > ρ_fluid\n\n**Bernoulli's Principle:** P + ½ρv² + ρgh = constant\n• Conservation of energy for flowing fluids\n• Higher speed → lower pressure (airplane wing)\n\n**Continuity:** A₁v₁ = A₂v₂ (conservation of mass)\n• Narrower pipe → faster flow\n\n**Viscosity:** η (coefficient of viscosity), SI unit: Pa·s\n• Stokes' Law: F = 6πηrv (sphere in fluid)\n• Terminal velocity: v_t = 2r²(ρ−σ)g/(9η)\n\nWould you like a worked fluid mechanics problem?",
    references: ['Fluid Mechanics'],
  },
  {
    keywords: ['wave', 'interference', 'diffraction', 'polarization', 'young', 'fringe'],
    response: "Wave Optics:\n\n**Interference (Young's Double Slit):**\n• Fringe width: β = λD/d\n• Bright: path difference = nλ\n• Dark: path difference = (n + ½)λ\n• Intensity: I = 4I₀cos²(φ/2)\n\n**Diffraction (Single Slit):**\n• First minimum: a sinθ = λ\n• Central maximum is twice as wide as secondary maxima\n• Intensity pattern: sinc² function\n\n**Polarization:**\n• Only transverse waves can be polarized\n• Malus' Law: I = I₀cos²θ\n• Brewster's Law: tanθ_p = n (polarizing angle)\n\n**Key point:** Interference = superposition of waves from two sources. Diffraction = bending around obstacles/apertures.\n\nWould you like a worked wave optics problem?",
    references: ['Wave Optics'],
  },
  {
    keywords: ['semiconductor', 'diode', 'transistor', 'pn junction', 'logic gate'],
    response: "Semiconductors & Electronics:\n\n**PN Junction:**\n• Depletion region: immobile ions, no free carriers\n• Forward bias: P→+, N→−, current flows\n• Reverse bias: very little current (leakage)\n\n**Diode:**\n• Half-wave rectifier: passes one half of AC\n• Full-wave rectifier: uses 4 diodes (bridge) or center-tap transformer\n• Zener diode: operates in reverse breakdown for voltage regulation\n\n**Transistor (BJT):**\n• Three terminals: Emitter, Base, Collector\n• Common-Emitter (CE): most common amplifier\n• Current gain: β = I_C/I_B (typically 50-200)\n• V_CE = V_CC − I_C R_C\n\n**Logic Gates:**\n• AND, OR, NOT, NAND, NOR, XOR\n• NAND and NOR are universal gates\n\nWould you like a worked semiconductor problem?",
    references: ['Semiconductors & Electronics'],
  },
  {
    keywords: ['quantum', 'schrodinger', 'wavefunction', 'uncertainty', 'operator'],
    response: "Quantum Mechanics:\n\n**Schrödinger Equation:**\n• Time-dependent: iℏ∂ψ/∂t = Ĥψ\n• Time-independent: Ĥψ = Eψ\n• Ĥ = −ℏ²/(2m)∇² + V(x) (Hamiltonian operator)\n\n**Key principles:**\n• |ψ|² gives probability density\n• ψ must be normalized: ∫|ψ|²dV = 1\n• ψ and dψ/dx must be continuous\n\n**Uncertainty Principle:** ΔxΔp ≥ ℏ/2\n• Cannot simultaneously know position and momentum precisely\n• Also: ΔEΔt ≥ ℏ/2\n\n**Operators:**\n• Momentum: p̂ = −iℏ∂/∂x\n• Position: x̂ = x\n• Energy: Ĥ = p̂²/(2m) + V\n\n**Infinite square well:** E_n = n²π²ℏ²/(2mL²), ψ_n = √(2/L)sin(nπx/L)\n\nWould you like a worked quantum mechanics problem?",
    references: ['Quantum Mechanics'],
  },
  {
    keywords: ['relativity', 'lorentz', 'time dilation', 'length contraction', 'e=mc'],
    response: "Special Relativity:\n\n**Postulates:**\n1. Laws of physics are the same in all inertial frames\n2. Speed of light c is constant in all frames\n\n**Lorentz Transformations:**\n• x' = γ(x − vt), t' = γ(t − vx/c²)\n• γ = 1/√(1 − v²/c²) (Lorentz factor)\n\n**Time Dilation:** Δt' = γΔt₀ (moving clock runs slow)\n**Length Contraction:** L = L₀/γ (moving objects appear shorter)\n**Velocity Addition:** u = (u' + v)/(1 + u'v/c²)\n\n**Mass-Energy:** E = mc², E² = (pc)² + (m₀c²)²\n• Rest energy: E₀ = m₀c²\n• Relativistic momentum: p = γm₀v\n\n**Key effects:**\n• Muon decay: atmospheric muons reach ground due to time dilation\n• GPS satellites must account for relativistic effects\n\nWould you like a worked relativity problem?",
    references: ['Special Relativity'],
  },
  {
    keywords: ['lagrangian', 'hamiltonian', 'euler', 'generalized coordinate', 'action'],
    response: "Lagrangian & Hamiltonian Mechanics:\n\n**Lagrangian:** L = T − V (kinetic minus potential energy)\n\n**Euler-Lagrange Equation:**\nd/dt(∂L/∂q̇) − ∂L/∂q = 0\n• q = generalized coordinate\n• This gives the equations of motion\n\n**Example — Simple Pendulum:**\n• T = ½mL²θ̇², V = −mgL cosθ\n• L = ½mL²θ̇² + mgL cosθ\n• E-L equation: mL²θ̈ + mgL sinθ = 0 → θ̈ = −(g/L)sinθ\n\n**Hamiltonian:** H = T + V (when coordinates are natural)\n• H = Σp_i q̇_i − L\n• Hamilton's equations: q̇ = ∂H/∂p, ṗ = −∂H/∂q\n\n**Advantages over Newtonian:**\n• Works in any coordinate system\n• Conservation laws follow from symmetries (Noether's theorem)\n• Essential for quantum mechanics and field theory\n\nWould you like a worked Lagrangian problem?",
    references: ['Lagrangian & Hamiltonian Mechanics'],
  },
  {
    keywords: ['maxwell', 'electromagnetic wave', 'displacement current', 'ampere maxwell'],
    response: "Maxwell's Equations:\n\n1. **Gauss's Law (Electric):** ∇·E = ρ/ε₀\n   → Electric charges produce electric fields\n\n2. **Gauss's Law (Magnetic):** ∇·B = 0\n   → No magnetic monopoles; field lines form closed loops\n\n3. **Faraday's Law:** ∇×E = −∂B/∂t\n   → Changing magnetic field induces electric field (EMF)\n\n4. **Ampère-Maxwell Law:** ∇×B = μ₀J + μ₀ε₀ ∂E/∂t\n   → Currents AND changing E fields produce magnetic fields\n   → The displacement current term (μ₀ε₀ ∂E/∂t) was Maxwell's addition\n\n**From Maxwell's equations in vacuum:**\n• Wave equation: ∇²E = μ₀ε₀ ∂²E/∂t²\n• Speed of EM waves: c = 1/√(μ₀ε₀) ≈ 3×10⁸ m/s\n• E and B are perpendicular to each other and to direction of propagation\n• EM waves are transverse\n\n**EM Spectrum:** Radio → Microwave → IR → Visible → UV → X-ray → Gamma\n\nWould you like a worked problem on Maxwell's equations?",
    references: ['Maxwell\'s Equations'],
  },
  {
    keywords: ['statistical', 'boltzmann', 'partition function', 'maxwell-boltzmann', 'entropy'],
    response: "Statistical Mechanics:\n\n**Boltzmann Distribution:**\n• P(E) ∝ e^(−E/kT) (probability of state with energy E)\n• k = Boltzmann constant = 1.38×10⁻²³ J/K\n\n**Partition Function:** Z = Σ e^(−E_i/kT)\n• All thermodynamic quantities derive from Z\n• F = −kT ln Z (Helmholtz free energy)\n• ⟨E⟩ = −∂(ln Z)/∂β where β = 1/(kT)\n• S = k ln Z + ⟨E⟩/T (entropy)\n\n**Maxwell-Boltzmann Speed Distribution:**\n• f(v) = 4π(m/2πkT)^(3/2) v² e^(−mv²/2kT)\n• v_rms = √(3kT/m), v_avg = √(8kT/πm), v_mp = √(2kT/m)\n\n**Equipartition Theorem:** Each quadratic degree of freedom contributes ½kT to average energy\n\n**Boltzmann Entropy:** S = k ln(W) (W = number of microstates)\n\nWould you like a worked statistical mechanics problem?",
    references: ['Statistical Mechanics'],
  },
  {
    keywords: ['circular', 'centripetal', 'banking', 'vertical circle'],
    response: "Circular Motion:\n\n**Centripetal Force:** F = mv²/r (toward center)\n**Centripetal Acceleration:** a = v²/r\n\n**Banking of Roads (no friction):**\n• tanθ = v²/(rg)\n• Ideal banking angle for given speed and radius\n\n**Vertical Circular Motion:**\n• Minimum velocity at top: v_top = √(gr) (just completes loop)\n• Minimum velocity at bottom: v_bottom = √(5gr)\n• Tension at top: T_top = mv²/r − mg\n• Tension at bottom: T_bottom = mv²/r + mg\n\n**Conical Pendulum:**\n• T cosθ = mg, T sinθ = mv²/r\n• Period: T = 2π√(L cosθ/g)\n\n**Key point:** Centripetal force is not a new force — it's the NET force toward the center, provided by tension, gravity, friction, or normal force.\n\nWould you like a worked circular motion problem?",
    references: ['Circular Motion'],
  },
  {
    keywords: ['work', 'energy', 'power', 'kinetic', 'potential', 'collision'],
    response: "Work, Energy & Power:\n\n**Work:** W = F·d·cosθ (force × displacement × angle)\n• Positive: force aids motion\n• Negative: force opposes motion (e.g., friction)\n• Zero: force perpendicular to displacement\n\n**Kinetic Energy:** KE = ½mv²\n**Potential Energy:** PE = mgh (gravity), PE = ½kx² (spring)\n\n**Work-Energy Theorem:** W_net = ΔKE\n\n**Conservation of Energy:** E_total = KE + PE = constant (conservative forces only)\n\n**Power:** P = W/t = F·v (rate of doing work)\n• SI unit: Watt (W) = 1 J/s\n• 1 horsepower = 746 W\n\n**Collisions:**\n• Elastic: KE and momentum conserved\n• Inelastic: Only momentum conserved\n• Perfectly inelastic: Bodies stick together, max KE lost\n\n**Key formula:** For elastic 1D collision:\nv₁' = ((m₁−m₂)v₁ + 2m₂v₂)/(m₁+m₂)\n\nWould you like a worked energy problem?",
    references: ['Work, Energy & Power'],
  },
  {
    keywords: ['rotational', 'torque', 'moment of inertia', 'angular momentum', 'rolling'],
    response: "Rotational Dynamics:\n\n**Torque:** τ = r × F (rotational analog of force)\n**Moment of Inertia:** I = Σmr² (resistance to rotational change)\n\n**Common I values:**\n• Solid sphere: I = (2/5)MR²\n• Hollow sphere: I = (2/3)MR²\n• Solid cylinder: I = (1/2)MR²\n• Thin rod (center): I = (1/12)ML²\n• Thin rod (end): I = (1/3)ML²\n• Ring: I = MR²\n\n**Parallel Axis Theorem:** I = I_cm + Md²\n**Perpendicular Axis Theorem:** I_z = I_x + I_y (for planar bodies)\n\n**Angular Momentum:** L = Iω (conserved if no external torque)\n**Rotational KE:** = ½Iω²\n\n**Rolling without slipping:** v = rω, a = g sinθ/(1 + I/(mr²))\n• Solid sphere: a = (5/7)g sinθ\n• Solid cylinder: a = (2/3)g sinθ\n• Ring: a = (1/2)g sinθ\n\nWould you like a worked rotational dynamics problem?",
    references: ['Rotational Dynamics'],
  },
  {
    keywords: ['thermal', 'expansion', 'heat transfer', 'conduction', 'radiation', 'stefan'],
    response: "Thermal Physics — Heat & Expansion:\n\n**Thermal Expansion:**\n• Linear: ΔL = L₀αΔT\n• Area: ΔA = A₀(2α)ΔT\n• Volume: ΔV = V₀(3α)ΔT = V₀γΔT\n• γ = 3α (for isotropic solids)\n\n**Heat Transfer:**\n• Conduction: Q/t = kA(ΔT/Δx) (solids)\n• Convection: Heat transfer by fluid motion (fluids)\n• Radiation: Stefan's Law P = σeAT⁴ (no medium needed)\n\n**Newton's Law of Cooling:** dT/dt = −k(T − T_s)\n\n**Wien's Displacement Law:** λ_max × T = b (b = 2.898×10⁻³ m·K)\n\n**Calorimetry:** Q = mcΔT (sensible heat), Q = mL (latent heat)\n• Specific heat of water: 4186 J/(kg·K)\n• L_f (ice) = 3.36×10⁵ J/kg, L_v (water) = 22.6×10⁵ J/kg\n\nWould you like a worked thermal physics problem?",
    references: ['Thermal Expansion', 'Calorimetry & Heat Transfer'],
  },
  {
    keywords: ['wave motion', 'transverse', 'longitudinal', 'speed', 'superposition'],
    response: "Wave Motion:\n\n**Types:**\n• Transverse: particles oscillate ⊥ to wave direction (e.g., string)\n• Longitudinal: particles oscillate ∥ to wave direction (e.g., sound)\n\n**Wave Equation:** v = fλ (speed = frequency × wavelength)\n\n**Speed of wave on string:** v = √(T/μ) (T = tension, μ = mass/length)\n\n**Speed of sound:** v = √(γRT/M) in gases\n• At 0°C: v ≈ 331 m/s, increases by 0.6 m/s per °C\n\n**Superposition Principle:** When two waves meet, the displacement is the algebraic sum\n\n**Standing Waves:**\n• String fixed both ends: λ = 2L/n, f = nv/(2L)\n• Open pipe: λ = 2L/n, f = nv/(2L)\n• Closed pipe: λ = 4L/(2n−1), f = (2n−1)v/(4L) (only odd harmonics)\n\n**Beats:** Beat frequency = |f₁ − f₂|\n\nWould you like a worked wave problem?",
    references: ['Wave Motion', 'Sound Waves & Acoustics'],
  },
  {
    keywords: ['doppler', 'sound', 'acoustics', 'frequency shift'],
    response: "Sound & Doppler Effect:\n\n**Doppler Effect:**\n• Source approaching observer: f' = f × v/(v − v_s)\n• Source receding: f' = f × v/(v + v_s)\n• Observer approaching: f' = f × (v + v_o)/v\n• Observer receding: f' = f × (v − v_o)/v\n• General: f' = f × (v ± v_o)/(v ∓ v_s)\n\n**Speed of Sound:**\n• v ≈ 331 m/s at 0°C, v = 331 + 0.6T m/s\n• v = √(γP/ρ) = √(γRT/M)\n\n**Characteristics of Sound:**\n• Pitch = frequency\n• Loudness = intensity (dB: β = 10 log(I/I₀), I₀ = 10⁻¹² W/m²)\n• Quality/Timbre = waveform (distinguishes instruments)\n\n**Resonance:** When forced frequency = natural frequency → maximum amplitude\n\n**Reverberation:** Persistence of sound after source stops\n• Reverberation time: time for intensity to drop by 60 dB\n\nWould you like a worked Doppler effect problem?",
    references: ['Sound Waves & Acoustics'],
  },
  {
    keywords: ['elasticity', 'stress', 'strain', 'young', 'hooke'],
    response: "Elasticity:\n\n**Hooke's Law:** Stress ∝ Strain (within elastic limit)\n• Stress = Force/Area (N/m² or Pa)\n• Strain = ΔL/L (dimensionless)\n\n**Moduli of Elasticity:**\n• Young's modulus: Y = (F/A)/(ΔL/L) = stress/strain (linear)\n• Bulk modulus: K = −V(ΔP/ΔV) (volume)\n• Shear modulus: G = (F/A)/θ (tangential)\n\n**Relationships:**\n• Y = 2G(1 + σ) where σ = Poisson's ratio\n• K = Y/(3(1 − 2σ))\n• For most materials: 0 < σ < 0.5\n\n**Stress-Strain Curve:**\n• Proportional limit → Elastic limit → Yield point → Ultimate strength → Fracture\n• Area under curve = work done per unit volume\n\n**Elastic Potential Energy:** U = ½ × stress × strain × volume = ½Y(strain)² × volume\n\nWould you like a worked elasticity problem?",
    references: ['Elasticity'],
  },
  {
    keywords: ['units', 'dimension', 'measurement', 'error', 'significant'],
    response: "Units, Dimensions & Measurement:\n\n**SI Base Units:**\n• Length (m), Mass (kg), Time (s), Current (A), Temperature (K), Amount (mol), Luminous intensity (cd)\n\n**Dimensional Analysis:**\n• Force: [MLT⁻²]\n• Energy: [ML²T⁻²]\n• Power: [ML²T⁻³]\n• Pressure: [ML⁻¹T⁻²]\n• Viscosity: [ML⁻¹T⁻¹]\n• Planck's constant: [ML²T⁻¹]\n\n**Error Analysis:**\n• For x = a + b: Δx = Δa + Δb (absolute errors add)\n• For x = a × b: Δx/x = Δa/a + Δb/b (relative errors add)\n• For x = a^n: Δx/x = n(Δa/a)\n\n**Significant Figures:**\n• Leading zeros: not significant (0.004 → 1 sig fig)\n• Trailing zeros after decimal: significant (4.00 → 3 sig figs)\n• In multiplication/division: result has sig figs of least precise\n• In addition/subtraction: result has decimal places of least precise\n\nWould you like a worked problem on dimensional analysis?",
    references: ['Units, Dimensions & Measurement'],
  },
  {
    keywords: ['vector', 'dot product', 'cross product', 'unit vector'],
    response: "Vectors:\n\n**Vector Operations:**\n• Addition: A + B (parallelogram or component method)\n• Subtraction: A − B = A + (−B)\n\n**Dot (Scalar) Product:** A·B = |A||B|cosθ = AₓBₓ + AᵧBᵧ + A_zB_z\n• Maximum when parallel (θ = 0°)\n• Zero when perpendicular (θ = 90°)\n• Used for: work (W = F·d), power (P = F·v)\n\n**Cross (Vector) Product:** A×B = |A||B|sinθ n̂\n• Direction: perpendicular to both A and B (right-hand rule)\n• Magnitude: |A×B| = |A||B|sinθ\n• Components: (A×B)_x = AᵧB_z − A_zBᵧ, etc.\n• Zero when parallel (θ = 0°)\n• Used for: torque (τ = r×F), angular momentum (L = r×p)\n\n**Unit Vector:** Â = A/|A| (magnitude = 1)\n\n**Key identities:**\n• A×B = −(B×A) (anti-commutative)\n• A·(B×C) = scalar triple product (volume of parallelepiped)\n• A×(B×C) = B(A·C) − C(A·B) (BAC-CAB rule)\n\nWould you like a worked vector problem?",
    references: ['Vectors'],
  },
]

function findResponse(query: string): { content: string; references?: string[] } {
  const q = query.toLowerCase()

  // Check if user is asking for a practice problem
  if (q.includes('practice') || q.includes('problem') || q.includes('example') || q.includes('solve')) {
    // Find matching topic
    for (const kb of knowledgeBase) {
      if (kb.keywords.some((kw) => q.includes(kw))) {
        const topicName = kb.references?.[0] || ''
        const problems = numericalProblems.filter((p) => p.topic === topicName)
        if (problems.length > 0) {
          const problem = problems[Math.floor(Math.random() * problems.length)]
          return {
            content: `Here's a practice problem on ${topicName}:\n\n**${problem.question}**\n\nGiven: ${problem.given.join(', ')}\n\nTry to solve it! Here are some hints:\n${problem.hints.map((h, i) => `${i + 1}. ${h}`).join('\n')}\n\nWhen you're ready, I can walk you through the solution step by step. Just say "show solution".`,
            references: [topicName],
          }
        }
      }
    }
    // Generic practice problem
    const randomProblem = numericalProblems[Math.floor(Math.random() * numericalProblems.length)]
    return {
      content: `Here's a practice problem on ${randomProblem.topic}:\n\n**${randomProblem.question}**\n\nGiven: ${randomProblem.given.join(', ')}\n\nHints:\n${randomProblem.hints.map((h, i) => `${i + 1}. ${h}`).join('\n')}\n\nSay "show solution" when you want the step-by-step answer.`,
      references: [randomProblem.topic],
    }
  }

  // Check for "show solution"
  if (q.includes('show solution') || q.includes('show answer') || q.includes('how to solve')) {
    return {
      content: "I'd be happy to walk you through a solution! Could you specify which topic or problem you'd like me to solve? For example, you can say:\n\n• \"Solve a kinematics problem\"\n• \"Show me how to solve Ohm's law problems\"\n• \"Give me a worked example of SHM\"\n\nI have 34+ worked numerical problems across all physics topics.",
    }
  }

  // Check for topic list
  if (q.includes('topics') || q.includes('list') || q.includes('what can') || q.includes('help') || q.includes('what do you know')) {
    return {
      content: `I can help you with any physics topic! Here are the areas I cover:\n\n**Mechanics:** Units & Dimensions, Vectors, Kinematics, Newton's Laws, Work-Energy, Circular Motion, Gravitation, Rotational Dynamics, Fluid Mechanics, Elasticity\n\n**Thermal Physics:** Thermal Expansion, Calorimetry, Thermodynamics, Kinetic Theory\n\n**Waves & Oscillations:** SHM, Wave Motion, Sound & Acoustics\n\n**Electromagnetism:** Electrostatics, Capacitors, Current Electricity, Magnetism, EM Induction, AC Circuits, EM Waves\n\n**Optics:** Ray Optics, Wave Optics\n\n**Modern Physics:** Dual Nature, Atomic Physics, Nuclear Physics, Semiconductors\n\n**University:** Lagrangian Mechanics, Maxwell's Equations, Quantum Mechanics, Special Relativity, Statistical Mechanics\n\nJust ask me about any topic, or say \"give me a practice problem\" for a random challenge!\n\nI also know 1000+ IOE/IOM MCQs and 34+ worked numerical problems.`,
    }
  }

  // Search knowledge base
  for (const kb of knowledgeBase) {
    if (kb.keywords.some((kw) => q.includes(kw))) {
      return { content: kb.response, references: kb.references }
    }
  }

  // Check concept lessons
  for (const lesson of conceptLessons) {
    const lessonTitle = lesson.title.toLowerCase()
    if (q.includes(lesson.id) || (lessonTitle.split(' ').some((word) => word.length > 3 && q.includes(word.toLowerCase())))) {
      return {
        content: `**${lesson.title}**\n\n${lesson.description}\n\nHere's a quick overview:\n\n${lesson.steps.map((s, i) => `**Step ${i + 1}: ${s.title}**\n${s.content}\n${s.formula ? `\nFormula: ${s.formula}` : ''}`).join('\n\n---\n\n')}\n\nWould you like me to give you a practice problem on this topic?`,
        references: [lesson.title],
      }
    }
  }

  // Check available topics
  const matchingTopic = topics.find((t) => q.includes(t.id) || q.includes(t.title.toLowerCase().split(' ')[0]))
  if (matchingTopic) {
    return {
      content: `**${matchingTopic.title}**\n\n${matchingTopic.description}\n\nCategory: ${matchingTopic.category}\nLevel: ${matchingTopic.level.join(', ')}\n\nWould you like me to:\n1. Explain the concepts in detail\n2. Give you a practice problem\n3. Show key formulas\n\nJust let me know!`,
      references: [matchingTopic.title],
    }
  }

  // Default response
  return {
    content: "I'm your AI Physics Tutor! I can help you with any physics topic from high school to university level.\n\nHere's what I can do:\n\n• **Explain concepts** — Ask me about any topic (e.g., \"explain Newton's laws\")\n• **Solve problems** — Say \"give me a practice problem\" or \"solve a kinematics problem\"\n• **Show formulas** — Ask for key formulas on any topic\n• **IOE/IOM prep** — I have 1000+ MCQs and 34+ worked problems\n\nTry asking me about:\n- Kinematics, Newton's Laws, SHM, Gravitation\n- Electrostatics, Current Electricity, Magnetism\n- Optics, Thermodynamics, Modern Physics\n- Quantum Mechanics, Special Relativity (university level)\n\nWhat would you like to learn?",
  }
}

export default function AITutor({ level: _level }: AITutorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: "Hello! I'm your AI Physics Tutor. I can help you with any physics topic from Class 11 to University level.\n\nI know about:\n• 35 physics topics with detailed explanations\n• 1000+ IOE/IOM MCQs\n• 34+ worked numerical problems\n• Key formulas and shortcuts\n\nJust ask me about any topic, or say \"give me a practice problem\" to get started!\n\nWhat would you like to learn today?",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = () => {
    if (!input.trim()) return
    const userMessage: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(() => {
      const response = findResponse(input)
      setMessages((prev) => [...prev, { role: 'ai', content: response.content, references: response.references }])
      setIsTyping(false)
    }, 600 + Math.random() * 400)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickPrompts = [
    'Explain Newton\'s laws',
    'Give me a practice problem',
    'Explain SHM',
    'Show me Ohm\'s law formulas',
    'Explain photoelectric effect',
    'What topics do you know?',
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xl shadow-lg">
          🤖
        </div>
        <div>
          <h2 className="text-2xl font-bold text-ink-100">AI Physics Tutor</h2>
          <p className="text-sm text-ink-400">Ask any physics question. Get instant explanations, formulas, and practice problems.</p>
        </div>
      </div>

      {/* Chat container */}
      <div className="card flex flex-col" style={{ height: 'calc(100vh - 320px)', minHeight: '400px' }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : ''}`}>
                <div className={`rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-ink-800 text-ink-100 border border-ink-700'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                </div>
                {msg.references && msg.references.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {msg.references.map((ref, j) => (
                      <span key={j} className="badge bg-violet-500/10 text-violet-300 text-[10px]">
                        📚 {ref}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-ink-800 border border-ink-700 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-ink-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-ink-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-ink-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompts */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => { setInput(prompt); }}
                className="px-3 py-1.5 rounded-lg bg-ink-800 hover:bg-ink-700 text-xs text-ink-300 transition-colors border border-ink-700"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="border-t border-ink-800 p-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask any physics question..."
            className="input flex-1"
          />
          <button onClick={handleSend} disabled={!input.trim()} className="btn-primary px-4">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
