export interface Topic {
  id: string
  title: string
  category: string
  class: '11' | '12' | 'both'
  level: ('class11_12' | 'ioe' | 'iom' | 'university')[]
  icon: string
  description: string
}

export const topics: Topic[] = [
  // Class 11 — Mechanics
  { id: 'units-dimensions', title: 'Units, Dimensions & Measurement', category: 'Mechanics', class: '11', level: ['class11_12', 'ioe', 'iom'], icon: '📏', description: 'SI units, dimensional analysis, error analysis, significant figures.' },
  { id: 'vectors', title: 'Vectors', category: 'Mechanics', class: '11', level: ['class11_12', 'ioe', 'iom'], icon: '➡️', description: 'Vector addition, dot and cross products, unit vectors.' },
  { id: 'kinematics', title: 'Kinematics — Motion in 1D & 2D', category: 'Mechanics', class: '11', level: ['class11_12', 'ioe', 'iom'], icon: '🏃', description: 'Equations of motion, projectile motion, relative velocity.' },
  { id: 'newtons-laws', title: "Newton's Laws of Motion", category: 'Mechanics', class: '11', level: ['class11_12', 'ioe', 'iom'], icon: '🍎', description: 'Force, inertia, friction, free-body diagrams.' },
  { id: 'work-energy', title: 'Work, Energy & Power', category: 'Mechanics', class: '11', level: ['class11_12', 'ioe', 'iom'], icon: '⚡', description: 'Work-energy theorem, conservative forces, collisions.' },
  { id: 'circular-motion', title: 'Circular Motion', category: 'Mechanics', class: '11', level: ['class11_12', 'ioe', 'iom'], icon: '🔄', description: 'Centripetal force, banking of roads, vertical circles.' },
  { id: 'gravitation', title: 'Gravitation', category: 'Mechanics', class: '11', level: ['class11_12', 'ioe', 'iom'], icon: '🪐', description: "Kepler's laws, orbital velocity, escape velocity, satellites." },
  { id: 'rotational-motion', title: 'Rotational Dynamics', category: 'Mechanics', class: '11', level: ['class11_12', 'ioe'], icon: '🎡', description: 'Torque, moment of inertia, angular momentum, rolling motion.' },
  { id: 'fluids', title: 'Fluid Mechanics', category: 'Mechanics', class: '11', level: ['class11_12', 'ioe', 'iom'], icon: '💧', description: "Pressure, Pascal's law, Bernoulli's principle, viscosity." },
  { id: 'elasticity', title: 'Elasticity', category: 'Mechanics', class: '11', level: ['class11_12', 'ioe'], icon: '🦴', description: "Hooke's law, Young's modulus, stress-strain curves." },

  // Class 11 — Thermal & Waves
  { id: 'thermal-expansion', title: 'Thermal Expansion', category: 'Thermal Physics', class: '11', level: ['class11_12', 'ioe', 'iom'], icon: '🔥', description: 'Linear, area, volume expansion, bimetallic strips.' },
  { id: 'calorimetry', title: 'Calorimetry & Heat Transfer', category: 'Thermal Physics', class: '11', level: ['class11_12', 'ioe', 'iom'], icon: '🌡️', description: 'Conduction, convection, radiation, specific heat, latent heat.' },
  { id: 'thermodynamics', title: 'Thermodynamics', category: 'Thermal Physics', class: '11', level: ['class11_12', 'ioe', 'iom'], icon: '🔥', description: 'First & second laws, Carnot engine, entropy.' },
  { id: 'kinetic-theory', title: 'Kinetic Theory of Gases', category: 'Thermal Physics', class: '11', level: ['class11_12', 'ioe'], icon: '🔵', description: 'RMS speed, pressure, degrees of freedom, equipartition.' },
  { id: 'oscillations', title: 'Oscillations & SHM', category: 'Waves & Oscillations', class: '11', level: ['class11_12', 'ioe', 'iom'], icon: '🌊', description: 'SHM, pendulum, spring-mass, damped and forced oscillations.' },
  { id: 'waves', title: 'Wave Motion', category: 'Waves & Oscillations', class: '11', level: ['class11_12', 'ioe', 'iom'], icon: '📡', description: 'Transverse & longitudinal waves, speed, superposition.' },
  { id: 'sound', title: 'Sound Waves & Acoustics', category: 'Waves & Oscillations', class: '11', level: ['class11_12', 'ioe', 'iom'], icon: '🔊', description: 'Doppler effect, beats, resonance, organ pipes.' },

  // Class 12 — Electrostatics & Current Electricity
  { id: 'electrostatics', title: 'Electrostatics', category: 'Electromagnetism', class: '12', level: ['class11_12', 'ioe', 'iom'], icon: '⚡', description: "Coulomb's law, electric field, Gauss's law, potential." },
  { id: 'capacitors', title: 'Capacitors & Dielectrics', category: 'Electromagnetism', class: '12', level: ['class11_12', 'ioe', 'iom'], icon: '🔋', description: 'Capacitance, series/parallel, energy stored, RC circuits.' },
  { id: 'current-electricity', title: 'Current Electricity', category: 'Electromagnetism', class: '12', level: ['class11_12', 'ioe', 'iom'], icon: '🔌', description: "Ohm's law, Kirchhoff's laws, Wheatstone bridge, meter bridge." },
  { id: 'magnetism', title: 'Magnetic Effects of Current', category: 'Electromagnetism', class: '12', level: ['class11_12', 'ioe', 'iom'], icon: '🧲', description: "Biot-Savart law, Ampere's law, force on current-carrying conductor." },
  { id: 'em-induction', title: 'Electromagnetic Induction', category: 'Electromagnetism', class: '12', level: ['class11_12', 'ioe'], icon: '🔄', description: "Faraday's law, Lenz's law, self & mutual inductance, AC generator." },
  { id: 'ac-circuits', title: 'AC Circuits', category: 'Electromagnetism', class: '12', level: ['class11_12', 'ioe'], icon: '〰️', description: 'RMS value, LCR circuit, resonance, power factor, transformer.' },
  { id: 'em-waves', title: 'Electromagnetic Waves', category: 'Electromagnetism', class: '12', level: ['class11_12', 'ioe', 'iom'], icon: '📻', description: 'Maxwell equations, EM spectrum, properties of EM waves.' },

  // Class 12 — Optics & Modern Physics
  { id: 'ray-optics', title: 'Ray Optics & Optical Instruments', category: 'Optics', class: '12', level: ['class11_12', 'ioe', 'iom'], icon: '🔍', description: 'Reflection, refraction, lenses, prism, microscope, telescope.' },
  { id: 'wave-optics', title: 'Wave Optics', category: 'Optics', class: '12', level: ['class11_12', 'ioe'], icon: '🌈', description: 'Interference, diffraction, polarization, Young\'s double slit.' },
  { id: 'dual-nature', title: 'Dual Nature of Radiation & Matter', category: 'Modern Physics', class: '12', level: ['class11_12', 'ioe', 'iom'], icon: '⚛️', description: 'Photoelectric effect, de Broglie waves, wave-particle duality.' },
  { id: 'atomic-physics', title: 'Atomic Physics', category: 'Modern Physics', class: '12', level: ['class11_12', 'ioe', 'iom'], icon: '🔵', description: 'Bohr model, hydrogen spectrum, energy levels, X-rays.' },
  { id: 'nuclear-physics', title: 'Nuclear Physics', category: 'Modern Physics', class: '12', level: ['class11_12', 'ioe', 'iom'], icon: '☢️', description: 'Fission, fusion, mass-energy, half-life, binding energy.' },
  { id: 'semiconductors', title: 'Semiconductors & Electronics', category: 'Modern Physics', class: '12', level: ['class11_12', 'ioe'], icon: '💻', description: 'PN junction, diodes, transistors, logic gates, amplifiers.' },

  // University level
  { id: 'lagrangian', title: 'Lagrangian & Hamiltonian Mechanics', category: 'University', class: 'both', level: ['university'], icon: '📐', description: 'Generalized coordinates, Euler-Lagrange equation, Hamiltonian formulation.' },
  { id: 'maxwell-equations', title: "Maxwell's Equations", category: 'University', class: 'both', level: ['university'], icon: '🌐', description: 'Full Maxwell equations, electromagnetic waves, boundary conditions.' },
  { id: 'quantum-mechanics', title: 'Quantum Mechanics', category: 'University', class: 'both', level: ['university'], icon: '🌀', description: 'Schrödinger equation, wavefunctions, operators, uncertainty principle.' },
  { id: 'special-relativity', title: 'Special Relativity', category: 'University', class: 'both', level: ['university'], icon: '🚀', description: 'Lorentz transformations, time dilation, length contraction, E=mc².' },
  { id: 'statistical-mechanics', title: 'Statistical Mechanics', category: 'University', class: 'both', level: ['university'], icon: '🎲', description: 'Boltzmann distribution, partition function, Maxwell-Boltzmann statistics.' },
]

export const categories = Array.from(new Set(topics.map((t) => t.category)))

export function topicsByCategory(cat: string) {
  return topics.filter((t) => t.category === cat)
}

export function topicsByLevel(level: string) {
  return topics.filter((t) => t.level.includes(level as any))
}
