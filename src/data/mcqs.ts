import type { MCQ } from '../types'

// Hand-curated high-quality IOE/IOM questions
const curated: MCQ[] = [
  // === Units & Dimensions ===
  { id: 'u1', topic: 'Units, Dimensions & Measurement', question: 'The dimensional formula of Planck\'s constant is:', options: ['[ML²T⁻¹]', '[ML²T⁻²]', '[MLT⁻¹]', '[ML²T⁻³]'], answer: 0, explanation: 'E = hν → h = E/ν. [h] = [ML²T⁻²]/[T⁻¹] = [ML²T⁻¹]', difficulty: 'medium', exam: 'Both' },
  { id: 'u2', topic: 'Units, Dimensions & Measurement', question: 'Which of the following is a dimensionless quantity?', options: ['Strain', 'Stress', 'Young\'s modulus', 'Pressure'], answer: 0, explanation: 'Strain = ΔL/L, ratio of two lengths → dimensionless.', difficulty: 'easy', exam: 'Both' },
  { id: 'u3', topic: 'Units, Dimensions & Measurement', question: 'The SI unit of magnetic flux is:', options: ['Tesla', 'Weber', 'Henry', 'Gauss'], answer: 1, explanation: 'Magnetic flux Φ = B·A. SI unit is Weber (Wb). 1 Wb = 1 T·m².', difficulty: 'easy', exam: 'Both' },
  { id: 'u4', topic: 'Units, Dimensions & Measurement', question: 'The percentage error in measuring length and breadth of a rectangle are 2% and 3% respectively. The percentage error in its area is:', options: ['5%', '6%', '1%', '1.5%'], answer: 0, explanation: 'A = L × B. % error in A = %error L + %error B = 2% + 3% = 5%.', difficulty: 'medium', exam: 'Both' },
  { id: 'u5', topic: 'Units, Dimensions & Measurement', question: 'The number of significant figures in 0.00400 is:', options: ['3', '5', '6', '2'], answer: 0, explanation: 'Leading zeros are not significant. The trailing zeros after 4 are significant: 4, 0, 0 → 3 significant figures.', difficulty: 'easy', exam: 'Both' },
  { id: 'u6', topic: 'Units, Dimensions & Measurement', question: 'The dimensional formula for coefficient of viscosity is:', options: ['[ML⁻¹T⁻¹]', '[MLT⁻²]', '[ML⁻¹T⁻²]', '[ML²T⁻¹]'], answer: 0, explanation: 'η = F/(A·dv/dx). [η] = [MLT⁻²]/[L²·T⁻¹] = [ML⁻¹T⁻¹]', difficulty: 'medium', exam: 'IOE' },

  // === Vectors ===
  { id: 'v1', topic: 'Vectors', question: 'The dot product of two vectors A and B is zero when:', options: ['They are perpendicular', 'They are parallel', 'They are antiparallel', 'They have equal magnitude'], answer: 0, explanation: 'A·B = |A||B|cosθ. This is zero when cosθ = 0, i.e., θ = 90° (perpendicular).', difficulty: 'easy', exam: 'Both' },
  { id: 'v2', topic: 'Vectors', question: 'The cross product A × B gives a vector whose direction is:', options: ['Along A', 'Along B', 'Perpendicular to both A and B', 'In the plane of A and B'], answer: 2, explanation: 'A × B is perpendicular to the plane containing both A and B, determined by the right-hand rule.', difficulty: 'easy', exam: 'Both' },
  { id: 'v3', topic: 'Vectors', question: 'If A = 3i + 4j and B = i + j, then A·B equals:', options: ['7', '3', '4', '12'], answer: 0, explanation: 'A·B = (3)(1) + (4)(1) = 3 + 4 = 7.', difficulty: 'easy', exam: 'Both' },
  { id: 'v4', topic: 'Vectors', question: 'The magnitude of vector A = 2i + 3j + 6k is:', options: ['7', '11', '5', '√41'], answer: 0, explanation: '|A| = √(4+9+36) = √49 = 7.', difficulty: 'easy', exam: 'Both' },
  { id: 'v5', topic: 'Vectors', question: 'The unit vector along i + j + k is:', options: ['(i+j+k)/√3', '(i+j+k)/3', 'i+j+k', '(i+j+k)/√2'], answer: 0, explanation: 'Unit vector = A/|A| = (i+j+k)/√(1+1+1) = (i+j+k)/√3.', difficulty: 'easy', exam: 'Both' },

  // === Kinematics ===
  { id: 'k1', topic: 'Kinematics — Motion in 1D & 2D', question: 'A body starts from rest with uniform acceleration. The distances covered in 1st, 2nd, 3rd seconds are in ratio:', options: ['1:3:5', '1:4:9', '1:2:3', '1:8:27'], answer: 0, explanation: 'dₙ = u + ½a(2n-1). With u=0: d₁:d₂:d₃ = 1:3:5. Classic IOE favorite.', difficulty: 'medium', exam: 'Both', formula: 'dₙ = u + ½a(2n-1)' },
  { id: 'k2', topic: 'Kinematics — Motion in 1D & 2D', question: 'A ball is thrown upward at 20 m/s (g=10). Time to reach max height:', options: ['1 s', '2 s', '4 s', '0.5 s'], answer: 1, explanation: 'v = u - gt → 0 = 20 - 10t → t = 2 s.', difficulty: 'easy', exam: 'Both' },
  { id: 'k3', topic: 'Kinematics — Motion in 1D & 2D', question: 'A projectile launched at 45° with speed 20 m/s (g=10) has range:', options: ['20 m', '40 m', '10 m', '80 m'], answer: 1, explanation: 'R = u²sin(2θ)/g = 400×1/10 = 40 m.', difficulty: 'medium', exam: 'Both', formula: 'R = u²sin(2θ)/g' },
  { id: 'k4', topic: 'Kinematics — Motion in 1D & 2D', question: 'At what angle should a projectile be launched for maximum range?', options: ['30°', '45°', '60°', '90°'], answer: 1, explanation: 'R is maximum when sin(2θ) = 1, i.e., 2θ = 90°, θ = 45°.', difficulty: 'easy', exam: 'Both' },
  { id: 'k5', topic: 'Kinematics — Motion in 1D & 2D', question: 'A stone dropped from height 45 m (g=10) hits ground in:', options: ['2 s', '3 s', '4.5 s', '9 s'], answer: 1, explanation: 's = ½gt² → 45 = 5t² → t = 3 s.', difficulty: 'easy', exam: 'Both', formula: 's = ½gt²' },
  { id: 'k6', topic: 'Kinematics — Motion in 1D & 2D', question: 'Two projectiles launched with same speed at complementary angles have:', options: ['Same range, different max height', 'Same max height, different range', 'Same range and same max height', 'Different range and different max height'], answer: 0, explanation: 'R = u²sin(2θ)/g. For θ and (90°-θ), sin(2θ) = sin(180°-2θ) → same range. But heights differ.', difficulty: 'medium', exam: 'Both' },
  { id: 'k7', topic: 'Kinematics — Motion in 1D & 2D', question: 'The relation between linear velocity v and angular velocity ω is:', options: ['v = ωr', 'v = ω/r', 'v = r/ω', 'v = ω²r'], answer: 0, explanation: 'v = ωr. Linear velocity = angular velocity × radius.', difficulty: 'easy', exam: 'Both', formula: 'v = ωr' },
  { id: 'k8', topic: 'Kinematics — Motion in 1D & 2D', question: 'A car accelerates from 0 to 60 km/h in 5 s. Its acceleration in m/s² is:', options: ['3.33 m/s²', '12 m/s²', '300 m/s²', '0.083 m/s²'], answer: 0, explanation: '60 km/h = 16.67 m/s. a = 16.67/5 ≈ 3.33 m/s².', difficulty: 'medium', exam: 'Both' },
  { id: 'k9', topic: 'Kinematics — Motion in 1D & 2D', question: 'The trajectory of a projectile is:', options: ['Straight line', 'Parabola', 'Circle', 'Ellipse'], answer: 1, explanation: 'The horizontal motion is uniform while vertical motion is accelerated, producing a parabolic path.', difficulty: 'easy', exam: 'Both' },
  { id: 'k10', topic: 'Kinematics — Motion in 1D & 2D', question: 'A body thrown horizontally from a height with velocity v. Time to reach ground depends on:', options: ['v only', 'height only', 'both v and height', 'neither'], answer: 1, explanation: 'Time depends only on height: t = √(2h/g). Horizontal velocity does not affect fall time.', difficulty: 'medium', exam: 'Both' },

  // === Newton's Laws ===
  { id: 'n1', topic: "Newton's Laws of Motion", question: 'A force of 15 N acts on a 3 kg body. The acceleration is:', options: ['45 m/s²', '5 m/s²', '0.2 m/s²', '18 m/s²'], answer: 1, explanation: 'a = F/m = 15/3 = 5 m/s².', difficulty: 'easy', exam: 'Both', formula: 'a = F/m' },
  { id: 'n2', topic: "Newton's Laws of Motion", question: 'A rocket works on the principle of conservation of:', options: ['Energy', 'Mass', 'Momentum', 'Angular momentum'], answer: 2, explanation: 'The rocket expels gas backward, gaining forward momentum by conservation of total momentum.', difficulty: 'medium', exam: 'Both' },
  { id: 'n3', topic: "Newton's Laws of Motion", question: 'The apparent weight of a person in a freely falling lift is:', options: ['Zero', 'Equal to actual weight', 'Double', 'Half'], answer: 0, explanation: 'N = m(g-a) = m(g-g) = 0. This is weightlessness.', difficulty: 'medium', exam: 'Both', formula: 'N = m(g-a)' },
  { id: 'n4', topic: "Newton's Laws of Motion", question: 'A block of 2 kg on a frictionless 30° incline has acceleration (g=10):', options: ['10 m/s²', '5 m/s²', '8.66 m/s²', '2.5 m/s²'], answer: 1, explanation: 'a = g sinθ = 10 × sin30° = 5 m/s².', difficulty: 'medium', exam: 'IOE', formula: 'a = g sinθ' },
  { id: 'n5', topic: "Newton's Laws of Motion", question: 'When a bus suddenly accelerates forward, passengers are pushed backward due to:', options: ['Inertia', 'Friction', 'Gravity', 'Tension'], answer: 0, explanation: 'The body tends to stay at rest due to inertia (Newton\'s first law).', difficulty: 'easy', exam: 'Both' },
  { id: 'n6', topic: "Newton's Laws of Motion", question: 'The coefficient of friction μ is the ratio of:', options: ['Friction force to normal reaction', 'Normal to friction', 'Friction to weight', 'Weight to friction'], answer: 0, explanation: 'μ = f/N where f is limiting friction and N is normal reaction.', difficulty: 'easy', exam: 'Both', formula: 'μ = f/N' },
  { id: 'n7', topic: "Newton's Laws of Motion", question: 'Action and reaction forces act on:', options: ['Same body', 'Different bodies', 'Same point', 'No body'], answer: 1, explanation: 'By Newton\'s third law, action and reaction act on different bodies. They never cancel each other.', difficulty: 'easy', exam: 'Both' },
  { id: 'n8', topic: "Newton's Laws of Motion", question: 'A 5 kg block is pulled by 20 N force on a frictionless surface. Its acceleration is:', options: ['100 m/s²', '4 m/s²', '0.25 m/s²', '15 m/s²'], answer: 1, explanation: 'a = F/m = 20/5 = 4 m/s².', difficulty: 'easy', exam: 'Both' },
  { id: 'n9', topic: "Newton's Laws of Motion", question: 'The impulse on a body equals the change in:', options: ['Kinetic energy', 'Momentum', 'Potential energy', 'Force'], answer: 1, explanation: 'Impulse = F×t = Δp (change in momentum).', difficulty: 'easy', exam: 'Both', formula: 'J = Δp' },
  { id: 'n10', topic: "Newton's Laws of Motion", question: 'A horse pulls a cart. The force that makes the horse-cart system move forward is:', options: ['The horse pulls the cart', 'The cart pulls the horse', 'The ground pushes the horse', 'Gravity'], answer: 2, explanation: 'The horse pushes the ground backward; the ground pushes the horse forward (reaction). This is the net forward force.', difficulty: 'hard', exam: 'IOE' },

  // === Work, Energy & Power ===
  { id: 'w1', topic: 'Work, Energy & Power', question: 'The work done by a force is zero when the angle between force and displacement is:', options: ['0°', '45°', '90°', '180°'], answer: 2, explanation: 'W = F·d·cosθ. When θ = 90°, cosθ = 0, so W = 0.', difficulty: 'easy', exam: 'Both', formula: 'W = Fd cosθ' },
  { id: 'w2', topic: 'Work, Energy & Power', question: 'A 2 kg body moving at 3 m/s has kinetic energy:', options: ['6 J', '9 J', '3 J', '18 J'], answer: 1, explanation: 'KE = ½mv² = ½×2×9 = 9 J.', difficulty: 'easy', exam: 'Both', formula: 'KE = ½mv²' },
  { id: 'w3', topic: 'Work, Energy & Power', question: 'The work-energy theorem states:', options: ['Work = Force × distance', 'Work done = Change in kinetic energy', 'Work = Power × time', 'Work = Change in potential energy'], answer: 1, explanation: 'W_net = ΔKE. The net work done on a body equals its change in kinetic energy.', difficulty: 'easy', exam: 'Both' },
  { id: 'w4', topic: 'Work, Energy & Power', question: 'A ball is dropped from height h. At what height is its KE equal to its PE?', options: ['h/2', 'h', 'h/4', 'h/3'], answer: 0, explanation: 'Total energy = mgh. When KE = PE, each is mgh/2, so height = h/2.', difficulty: 'medium', exam: 'Both' },
  { id: 'w5', topic: 'Work, Energy & Power', question: 'A 100 W bulb is used for 10 hours. The energy consumed is:', options: ['1 kWh', '0.1 kWh', '10 kWh', '1000 kWh'], answer: 0, explanation: 'E = P×t = 100 W × 10 h = 1000 Wh = 1 kWh.', difficulty: 'easy', exam: 'Both' },
  { id: 'w6', topic: 'Work, Energy & Power', question: 'In a perfectly inelastic collision, the quantity that is conserved is:', options: ['Kinetic energy', 'Momentum', 'Both KE and momentum', 'Neither'], answer: 1, explanation: 'Momentum is always conserved. In perfectly inelastic collision, KE is not conserved (some is lost as heat/deformation).', difficulty: 'medium', exam: 'Both' },
  { id: 'w7', topic: 'Work, Energy & Power', question: 'A spring with k = 200 N/m is compressed 0.1 m. The stored energy is:', options: ['1 J', '2 J', '0.5 J', '20 J'], answer: 0, explanation: 'U = ½kx² = ½×200×0.01 = 1 J.', difficulty: 'easy', exam: 'Both', formula: 'U = ½kx²' },
  { id: 'w8', topic: 'Work, Energy & Power', question: 'Power is the rate of doing work. Its SI unit is:', options: ['Joule', 'Watt', 'Newton', 'Pascal'], answer: 1, explanation: 'Power = Work/time. SI unit is Watt (W) = 1 J/s.', difficulty: 'easy', exam: 'Both' },
  { id: 'w9', topic: 'Work, Energy & Power', question: 'A body of mass m is raised to height h. The work done against gravity is:', options: ['mgh', 'mgh/2', '2mgh', '0'], answer: 0, explanation: 'W = F×d = mg×h = mgh. This becomes potential energy.', difficulty: 'easy', exam: 'Both' },
  { id: 'w10', topic: 'Work, Energy & Power', question: 'Two bodies undergo elastic collision. Which is conserved?', options: ['KE only', 'Momentum only', 'Both KE and momentum', 'Neither'], answer: 2, explanation: 'In elastic collision, both kinetic energy and momentum are conserved.', difficulty: 'easy', exam: 'Both' },

  // === Circular Motion ===
  { id: 'c1', topic: 'Circular Motion', question: 'The centripetal force on a body moving in a circle of radius r with velocity v is:', options: ['mv²/r', 'mvr', 'mv/r', 'mv²r'], answer: 0, explanation: 'F = mv²/r, directed toward the center of the circle.', difficulty: 'easy', exam: 'Both', formula: 'F = mv²/r' },
  { id: 'c2', topic: 'Circular Motion', question: 'A car moves on a circular track of radius 50 m at 10 m/s. Its centripetal acceleration is:', options: ['2 m/s²', '0.2 m/s²', '5 m/s²', '500 m/s²'], answer: 0, explanation: 'a = v²/r = 100/50 = 2 m/s².', difficulty: 'easy', exam: 'Both' },
  { id: 'c3', topic: 'Circular Motion', question: 'The banking angle θ for a road of radius r with speed v is given by:', options: ['tanθ = v²/rg', 'sinθ = v²/rg', 'cosθ = v²/rg', 'tanθ = rg/v²'], answer: 0, explanation: 'tanθ = v²/(rg). This is the ideal banking angle for no friction.', difficulty: 'medium', exam: 'IOE', formula: 'tanθ = v²/rg' },
  { id: 'c4', topic: 'Circular Motion', question: 'In a vertical circular motion, the minimum velocity at the top for the body to complete the loop is:', options: ['√(gr)', '√(2gr)', '√(5gr)', '2√(gr)'], answer: 0, explanation: 'At the top, mg = mv²/r → v = √(gr). This is the critical velocity.', difficulty: 'hard', exam: 'IOE', formula: 'v_min = √(gr)' },
  { id: 'c5', topic: 'Circular Motion', question: 'A particle moves in a circle with constant speed. Its acceleration is:', options: ['Zero', 'Along the velocity', 'Toward the center', 'Away from the center'], answer: 2, explanation: 'Even with constant speed, the direction changes, so there is centripetal acceleration toward the center.', difficulty: 'medium', exam: 'Both' },

  // === Gravitation ===
  { id: 'g1', topic: 'Gravitation', question: 'The escape velocity from Earth is approximately:', options: ['11.2 km/s', '9.8 km/s', '7.9 km/s', '15 km/s'], answer: 0, explanation: 'v_esc = √(2gR) ≈ 11.2 km/s for Earth.', difficulty: 'easy', exam: 'Both', formula: 'v_esc = √(2gR)' },
  { id: 'g2', topic: 'Gravitation', question: 'The orbital velocity of a satellite near Earth\'s surface is:', options: ['7.9 km/s', '11.2 km/s', '9.8 km/s', '5 km/s'], answer: 0, explanation: 'v_orb = √(gR) ≈ 7.9 km/s for low Earth orbit.', difficulty: 'medium', exam: 'IOE', formula: 'v_orb = √(gR)' },
  { id: 'g3', topic: 'Gravitation', question: "Kepler's third law states that T² is proportional to:", options: ['r', 'r²', 'r³', '1/r'], answer: 2, explanation: 'T² ∝ r³. The square of the period is proportional to the cube of the orbital radius.', difficulty: 'easy', exam: 'Both', formula: 'T² ∝ r³' },
  { id: 'g4', topic: 'Gravitation', question: 'The acceleration due to gravity at height h above Earth (h << R) is approximately:', options: ['g(1 - 2h/R)', 'g(1 + h/R)', 'g(1 - h/R)', 'g(1 + 2h/R)'], answer: 0, explanation: 'g\' = g(1 - 2h/R) for small heights. Gravity decreases with altitude.', difficulty: 'medium', exam: 'IOE' },
  { id: 'g5', topic: 'Gravitation', question: 'The gravitational potential energy of a body of mass m at height h (h << R) is:', options: ['-mgh', 'mgh', '-mgR', 'zero'], answer: 0, explanation: 'U = -GMm/(R+h) ≈ -mgR + mgh. The change from surface is mgh, but absolute value is negative.', difficulty: 'hard', exam: 'IOE' },
  { id: 'g6', topic: 'Gravitation', question: 'A geostationary satellite has a period of:', options: ['1 hour', '12 hours', '24 hours', '48 hours'], answer: 2, explanation: 'A geostationary satellite matches Earth\'s rotation period of 24 hours, appearing stationary from the ground.', difficulty: 'easy', exam: 'Both' },
  { id: 'g7', topic: 'Gravitation', question: 'The value of gravitational acceleration at the center of Earth is:', options: ['Zero', 'Maximum', 'Same as surface', 'Infinite'], answer: 0, explanation: 'At the center, gravitational forces from all directions cancel out → g = 0.', difficulty: 'easy', exam: 'Both' },

  // === Rotational Motion ===
  { id: 'r1', topic: 'Rotational Dynamics', question: 'The moment of inertia of a solid sphere about its diameter is:', options: ['(2/5)MR²', '(2/3)MR²', 'MR²', '(1/2)MR²'], answer: 0, explanation: 'I = (2/5)MR² for a solid sphere. For a hollow sphere it\'s (2/3)MR².', difficulty: 'medium', exam: 'IOE', formula: 'I = (2/5)MR²' },
  { id: 'r2', topic: 'Rotational Dynamics', question: 'The moment of inertia of a thin rod about its center (perpendicular) is:', options: ['(1/12)ML²', '(1/3)ML²', '(1/2)ML²', 'ML²'], answer: 0, explanation: 'I = (1/12)ML² about center. About one end it\'s (1/3)ML².', difficulty: 'medium', exam: 'IOE' },
  { id: 'r3', topic: 'Rotational Dynamics', question: 'Angular momentum L is related to moment of inertia I and angular velocity ω as:', options: ['L = Iω', 'L = I/ω', 'L = Iω²', 'L = I²ω'], answer: 0, explanation: 'L = Iω. Angular momentum is the rotational analog of linear momentum p = mv.', difficulty: 'easy', exam: 'IOE', formula: 'L = Iω' },
  { id: 'r4', topic: 'Rotational Dynamics', question: 'The rotational kinetic energy is:', options: ['(1/2)Iω²', '(1/2)Iω', 'Iω²', '(1/2)I²ω'], answer: 0, explanation: 'KE_rot = (1/2)Iω². Analogous to (1/2)mv² in linear motion.', difficulty: 'easy', exam: 'IOE', formula: 'KE = (1/2)Iω²' },
  { id: 'r5', topic: 'Rotational Dynamics', question: 'A solid sphere rolls without slipping. The ratio of rotational to total KE is:', options: ['2/7', '5/7', '1/2', '2/5'], answer: 0, explanation: 'KE_rot = (1/2)(2/5)MR²ω² = (1/5)Mv². KE_total = (1/2)Mv² + (1/5)Mv² = (7/10)Mv². Ratio = (1/5)/(7/10) = 2/7.', difficulty: 'hard', exam: 'IOE' },
  { id: 'r6', topic: 'Rotational Dynamics', question: 'The theorem of parallel axes gives I about an axis parallel to one through the center of mass:', options: ['I = I_cm + Md²', 'I = I_cm - Md²', 'I = I_cm × Md²', 'I = Md²'], answer: 0, explanation: 'I = I_cm + Md² where d is the distance between the two parallel axes.', difficulty: 'medium', exam: 'IOE', formula: 'I = I_cm + Md²' },

  // === Fluids ===
  { id: 'f1', topic: 'Fluid Mechanics', question: "The pressure at depth h in a liquid of density ρ is (g = acceleration due to gravity):", options: ['ρgh', 'ρg/h', 'ρh/g', 'gh/ρ'], answer: 0, explanation: 'P = ρgh. Pressure increases linearly with depth in an incompressible fluid.', difficulty: 'easy', exam: 'Both', formula: 'P = ρgh' },
  { id: 'f2', topic: 'Fluid Mechanics', question: "According to Archimedes' principle, the buoyant force equals:", options: ['Weight of the body', 'Weight of fluid displaced', 'Volume of the body', 'Mass of the body'], answer: 1, explanation: 'Buoyant force = weight of fluid displaced by the body. This is Archimedes\' principle.', difficulty: 'easy', exam: 'Both' },
  { id: 'f3', topic: 'Fluid Mechanics', question: "Bernoulli's equation is based on the conservation of:", options: ['Mass', 'Momentum', 'Energy', 'Charge'], answer: 2, explanation: 'Bernoulli\'s equation: P + ½ρv² + ρgh = constant. It\'s conservation of energy for flowing fluids.', difficulty: 'medium', exam: 'IOE' },
  { id: 'f4', topic: 'Fluid Mechanics', question: 'The SI unit of coefficient of viscosity is:', options: ['Pa·s', 'N/m', 'N/m²', 'kg/m³'], answer: 0, explanation: 'η is measured in Pa·s (Pascal-second) in SI. In CGS it\'s poise.', difficulty: 'medium', exam: 'IOE' },
  { id: 'f5', topic: 'Fluid Mechanics', question: 'An object floats when its density is:', options: ['Greater than fluid density', 'Less than fluid density', 'Equal to fluid density', 'Zero'], answer: 1, explanation: 'A body floats when its average density is less than the fluid density. It sinks when denser.', difficulty: 'easy', exam: 'Both' },
  { id: 'f6', topic: 'Fluid Mechanics', question: 'The continuity equation A₁v₁ = A₂v₂ is based on conservation of:', options: ['Energy', 'Mass', 'Momentum', 'Force'], answer: 1, explanation: 'The continuity equation expresses conservation of mass (volume flow rate is constant for incompressible flow).', difficulty: 'medium', exam: 'IOE' },

  // === Elasticity ===
  { id: 'e1', topic: 'Elasticity', question: "Hooke's law states that stress is:", options: ['Directly proportional to strain', 'Inversely proportional to strain', 'Equal to strain', 'Independent of strain'], answer: 0, explanation: 'Within the elastic limit, stress ∝ strain. The proportionality constant is the modulus of elasticity.', difficulty: 'easy', exam: 'IOE', formula: 'Stress = Y × Strain' },
  { id: 'e2', topic: 'Elasticity', question: "Young's modulus has the same dimensions as:", options: ['Force', 'Stress', 'Strain', 'Energy'], answer: 1, explanation: 'Y = Stress/Strain. Since strain is dimensionless, Y has the same dimensions as stress (pressure).', difficulty: 'medium', exam: 'IOE' },
  { id: 'e3', topic: 'Elasticity', question: 'The SI unit of Young\'s modulus is:', options: ['N/m²', 'N/m', 'N·m', 'N/m³'], answer: 0, explanation: 'Y = Stress/Strain = (N/m²)/1 = N/m² (Pascal). Same as pressure.', difficulty: 'easy', exam: 'IOE' },
  { id: 'e4', topic: 'Elasticity', question: 'Within the elastic limit, the restoring force is proportional to:', options: ['Displacement', 'Velocity', 'Acceleration', 'Time'], answer: 0, explanation: 'F = -kx (Hooke\'s law). Restoring force is proportional to displacement from equilibrium.', difficulty: 'easy', exam: 'IOE' },

  // === Thermal Expansion ===
  { id: 'te1', topic: 'Thermal Expansion', question: 'The linear expansion of a rod depends on:', options: ['Original length only', 'Temperature change only', 'Both length and temperature change', 'Material only'], answer: 2, explanation: 'ΔL = L₀αΔT. Linear expansion depends on original length, coefficient, and temperature change.', difficulty: 'easy', exam: 'Both', formula: 'ΔL = L₀αΔT' },
  { id: 'te2', topic: 'Thermal Expansion', question: 'The coefficient of volume expansion γ is related to linear expansion α by:', options: ['γ = 3α', 'γ = α', 'γ = α/3', 'γ = 2α'], answer: 0, explanation: 'For isotropic solids, γ = 3α. Volume expansion is three times linear expansion.', difficulty: 'medium', exam: 'Both' },
  { id: 'te3', topic: 'Thermal Expansion', question: 'A bimetallic strip bends when heated because:', options: ['Both metals expand equally', 'The metals have different expansion coefficients', 'One metal contracts', 'The strip melts'], answer: 1, explanation: 'Different expansion coefficients cause one metal to expand more, bending the strip. Used in thermostats.', difficulty: 'easy', exam: 'Both' },

  // === Calorimetry ===
  { id: 'ca1', topic: 'Calorimetry & Heat Transfer', question: 'The heat required to raise the temperature of 1 kg of water by 1°C is:', options: ['1 calorie', '100 calories', '1000 calories', '4186 J'], answer: 3, explanation: 'Specific heat of water = 4186 J/(kg·K) = 1 cal/(g·°C). For 1 kg by 1°C, Q = 4186 J.', difficulty: 'easy', exam: 'Both' },
  { id: 'ca2', topic: 'Calorimetry & Heat Transfer', question: 'Heat transfer by conduction occurs in:', options: ['Solids only', 'Fluids only', 'Vacuum', 'All media'], answer: 0, explanation: 'Conduction requires a medium with particles in contact — primarily solids. Convection in fluids, radiation in vacuum.', difficulty: 'easy', exam: 'Both' },
  { id: 'ca3', topic: 'Calorimetry & Heat Transfer', question: 'Stefan\'s law gives the power radiated by a body as:', options: ['P = σAT⁴', 'P = σAT²', 'P = σAT', 'P = σA/T⁴'], answer: 0, explanation: 'P = σeAT⁴. Power radiated is proportional to the fourth power of absolute temperature.', difficulty: 'medium', exam: 'IOE', formula: 'P = σAT⁴' },
  { id: 'ca4', topic: 'Calorimetry & Heat Transfer', question: 'The latent heat of fusion of ice is approximately:', options: ['80 cal/g', '540 cal/g', '1 cal/g', '100 cal/g'], answer: 0, explanation: 'L_f = 80 cal/g = 336 kJ/kg. This is the heat needed to melt 1 g of ice at 0°C.', difficulty: 'easy', exam: 'Both' },

  // === Thermodynamics ===
  { id: 'th1', topic: 'Thermodynamics', question: 'In an isothermal process, the quantity that remains constant is:', options: ['Pressure', 'Volume', 'Temperature', 'Internal energy'], answer: 2, explanation: 'Isothermal means constant temperature. For an ideal gas, U depends only on T, so U is also constant.', difficulty: 'easy', exam: 'Both' },
  { id: 'th2', topic: 'Thermodynamics', question: 'The efficiency of a Carnot engine between 300 K and 600 K is:', options: ['25%', '50%', '75%', '100%'], answer: 1, explanation: 'η = 1 - Tc/Th = 1 - 300/600 = 50%.', difficulty: 'medium', exam: 'IOE', formula: 'η = 1 - Tc/Th' },
  { id: 'th3', topic: 'Thermodynamics', question: 'For an adiabatic process, the correct relation is:', options: ['Q = 0', 'W = 0', 'ΔU = 0', 'Q = W'], answer: 0, explanation: 'Adiabatic means no heat exchange: Q = 0. So ΔU = -W.', difficulty: 'medium', exam: 'IOE' },
  { id: 'th4', topic: 'Thermodynamics', question: 'The first law of thermodynamics is a statement of conservation of:', options: ['Momentum', 'Energy', 'Charge', 'Entropy'], answer: 1, explanation: 'ΔU = Q - W. Energy is conserved: heat added minus work done equals change in internal energy.', difficulty: 'easy', exam: 'Both' },
  { id: 'th5', topic: 'Thermodynamics', question: 'The second law of thermodynamics states that:', options: ['Energy is conserved', 'Entropy of the universe always increases', 'Heat flows from cold to hot', 'Work can be fully converted to heat'], answer: 1, explanation: 'The second law: total entropy of an isolated system never decreases. Heat naturally flows from hot to cold.', difficulty: 'medium', exam: 'Both' },
  { id: 'th6', topic: 'Thermodynamics', question: 'In an isothermal expansion of an ideal gas, the work done equals:', options: ['Zero', 'nRT ln(V₂/V₁)', 'nRT', 'PΔV'], answer: 1, explanation: 'W = nRT ln(V₂/V₁) for isothermal process. Since ΔU = 0, Q = W.', difficulty: 'medium', exam: 'IOE', formula: 'W = nRT ln(V₂/V₁)' },

  // === Kinetic Theory ===
  { id: 'kt1', topic: 'Kinetic Theory of Gases', question: 'The RMS speed of gas molecules is given by:', options: ['√(3RT/M)', '√(RT/M)', '√(2RT/M)', '√(RT/3M)'], answer: 0, explanation: 'v_rms = √(3RT/M) where M is molar mass and R is the gas constant.', difficulty: 'medium', exam: 'IOE', formula: 'v_rms = √(3RT/M)' },
  { id: 'kt2', topic: 'Kinetic Theory of Gases', question: 'The average kinetic energy of a gas molecule depends on:', options: ['Pressure', 'Volume', 'Temperature', 'Mass'], answer: 2, explanation: 'KE_avg = (3/2)kT. It depends only on temperature, not on the type of gas or its mass.', difficulty: 'medium', exam: 'IOE' },
  { id: 'kt3', topic: 'Kinetic Theory of Gases', question: 'The degrees of freedom for a monoatomic gas is:', options: ['3', '5', '6', '7'], answer: 0, explanation: 'A monoatomic gas has 3 translational degrees of freedom (no rotational for a point particle).', difficulty: 'easy', exam: 'IOE' },
  { id: 'kt4', topic: 'Kinetic Theory of Gases', question: 'The ratio of specific heats (γ = Cp/Cv) for a monoatomic gas is:', options: ['1.67', '1.40', '1.33', '1.00'], answer: 0, explanation: 'For monoatomic: γ = (f+2)/f = 5/3 ≈ 1.67 where f = 3 degrees of freedom.', difficulty: 'medium', exam: 'IOE' },

  // === Oscillations ===
  { id: 'o1', topic: 'Oscillations & SHM', question: 'The time period of a simple pendulum depends on:', options: ['Mass of bob', 'Length of pendulum', 'Amplitude', 'Material of bob'], answer: 1, explanation: 'T = 2π√(L/g). Period depends only on length and g — not on mass or amplitude (for small oscillations).', difficulty: 'easy', exam: 'Both', formula: 'T = 2π√(L/g)' },
  { id: 'o2', topic: 'Oscillations & SHM', question: 'A 0.5 kg mass on a spring (k=200 N/m) has period (π²≈10):', options: ['0.1 s', '0.314 s', '0.5 s', '1 s'], answer: 1, explanation: 'T = 2π√(m/k) = 2π√(0.5/200) = 2π×0.05 = 0.314 s.', difficulty: 'medium', exam: 'IOE', formula: 'T = 2π√(m/k)' },
  { id: 'o3', topic: 'Oscillations & SHM', question: 'In SHM, the velocity is maximum at:', options: ['Extreme position', 'Equilibrium position', 'Half amplitude', 'Any position'], answer: 1, explanation: 'At equilibrium, all energy is kinetic → maximum velocity. At extremes, velocity is zero.', difficulty: 'easy', exam: 'Both' },
  { id: 'o4', topic: 'Oscillations & SHM', question: 'The total energy in SHM is proportional to:', options: ['Amplitude', 'Square of amplitude', 'Square root of amplitude', 'Inverse of amplitude'], answer: 1, explanation: 'E = ½kA². Energy is proportional to the square of the amplitude.', difficulty: 'medium', exam: 'IOE', formula: 'E = ½kA²' },
  { id: 'o5', topic: 'Oscillations & SHM', question: 'The acceleration in SHM is maximum at:', options: ['Equilibrium position', 'Extreme position', 'Half amplitude', 'Everywhere equally'], answer: 1, explanation: 'a = -ω²x. Acceleration is proportional to displacement, so it\'s maximum at the extreme positions.', difficulty: 'medium', exam: 'Both' },
  { id: 'o6', topic: 'Oscillations & SHM', question: 'A pendulum of length 1 m (g=10, π²≈10) has period:', options: ['0.2 s', '2 s', '1 s', '6.28 s'], answer: 1, explanation: 'T = 2π√(L/g) = 2π√(0.1) = 2π×0.316 ≈ 2 s. This is the "seconds pendulum".', difficulty: 'medium', exam: 'Both' },

  // === Waves ===
  { id: 'wa1', topic: 'Wave Motion', question: 'The speed of a transverse wave on a string of tension T and mass per unit length μ is:', options: ['√(T/μ)', '√(μ/T)', 'T/μ', 'μ/T'], answer: 0, explanation: 'v = √(T/μ). Higher tension → faster wave. Heavier string → slower wave.', difficulty: 'medium', exam: 'Both', formula: 'v = √(T/μ)' },
  { id: 'wa2', topic: 'Wave Motion', question: 'The relation between wave speed v, frequency f, and wavelength λ is:', options: ['v = fλ', 'v = f/λ', 'v = λ/f', 'v = fλ²'], answer: 0, explanation: 'v = fλ. This is the fundamental wave equation.', difficulty: 'easy', exam: 'Both', formula: 'v = fλ' },
  { id: 'wa3', topic: 'Wave Motion', question: 'Two waves superpose to produce beats. The beat frequency equals:', options: ['Sum of frequencies', 'Difference of frequencies', 'Product of frequencies', 'Ratio of frequencies'], answer: 1, explanation: 'Beat frequency = |f₁ - f₂|. Beats occur when two waves of slightly different frequencies interfere.', difficulty: 'medium', exam: 'Both' },
  { id: 'wa4', topic: 'Wave Motion', question: 'In a stationary wave, the points of zero displacement are called:', options: ['Antinodes', 'Nodes', 'Crests', 'Troughs'], answer: 1, explanation: 'Nodes are points of zero amplitude in a stationary wave. Antinodes are points of maximum amplitude.', difficulty: 'easy', exam: 'Both' },

  // === Sound ===
  { id: 'so1', topic: 'Sound Waves & Acoustics', question: 'The Doppler effect refers to the change in:', options: ['Wave speed', 'Wavelength', 'Observed frequency', 'Amplitude'], answer: 2, explanation: 'The Doppler effect is the apparent change in frequency when source and observer are in relative motion.', difficulty: 'easy', exam: 'Both' },
  { id: 'so2', topic: 'Sound Waves & Acoustics', question: 'A source moves toward a stationary observer. The observed frequency:', options: ['Increases', 'Decreases', 'Stays the same', 'Becomes zero'], answer: 0, explanation: 'When source approaches, waves are compressed → higher observed frequency. Receding → lower frequency.', difficulty: 'easy', exam: 'Both' },
  { id: 'so3', topic: 'Sound Waves & Acoustics', question: 'The speed of sound in air at 0°C is approximately:', options: ['330 m/s', '340 m/s', '300 m/s', '1500 m/s'], answer: 0, explanation: 'Speed of sound in air at 0°C ≈ 331 m/s. It increases by ~0.6 m/s per °C rise.', difficulty: 'easy', exam: 'Both' },
  { id: 'so4', topic: 'Sound Waves & Acoustics', question: 'In a closed organ pipe, the fundamental frequency has wavelength:', options: ['4L', '2L', 'L', 'L/2'], answer: 0, explanation: 'For a closed pipe, fundamental: λ = 4L (quarter wavelength). Open pipe: λ = 2L.', difficulty: 'medium', exam: 'IOE' },

  // === Electrostatics ===
  { id: 'es1', topic: 'Electrostatics', question: "Coulomb's law gives the force between two charges as:", options: ['F = kq₁q₂/r²', 'F = kq₁q₂/r', 'F = kq₁q₂r²', 'F = kr²/q₁q₂'], answer: 0, explanation: 'F = kq₁q₂/r² where k = 9×10⁹ N·m²/C². Inverse square law like gravity.', difficulty: 'easy', exam: 'Both', formula: 'F = kq₁q₂/r²' },
  { id: 'es2', topic: 'Electrostatics', question: 'The electric field due to a point charge q at distance r is:', options: ['E = kq/r²', 'E = kq/r', 'E = kq²/r²', 'E = kq/r³'], answer: 0, explanation: 'E = kq/r², directed radially outward for positive charge, inward for negative.', difficulty: 'easy', exam: 'Both', formula: 'E = kq/r²' },
  { id: 'es3', topic: 'Electrostatics', question: "Gauss's law relates electric flux to:", options: ['Charge enclosed', 'Current', 'Potential', 'Resistance'], answer: 0, explanation: '∮E·dA = Q_enclosed/ε₀. The total electric flux through a closed surface equals enclosed charge / ε₀.', difficulty: 'medium', exam: 'IOE', formula: '∮E·dA = Q/ε₀' },
  { id: 'es4', topic: 'Electrostatics', question: 'The electric potential at distance r from a point charge q is:', options: ['V = kq/r', 'V = kq/r²', 'V = kq²/r', 'V = kr/q'], answer: 0, explanation: 'V = kq/r. Potential is a scalar quantity, measured in volts.', difficulty: 'easy', exam: 'Both', formula: 'V = kq/r' },
  { id: 'es5', topic: 'Electrostatics', question: 'The capacitance of a parallel plate capacitor is:', options: ['C = ε₀A/d', 'C = ε₀d/A', 'C = A/d', 'C = ε₀A'], answer: 0, explanation: 'C = ε₀A/d. Capacitance increases with plate area and decreases with separation.', difficulty: 'medium', exam: 'Both', formula: 'C = ε₀A/d' },
  { id: 'es6', topic: 'Electrostatics', question: 'Two charges +q and -q form a dipole. The dipole moment is:', options: ['qd', 'q/d', 'q²d', 'q/d²'], answer: 0, explanation: 'p = qd where d is the separation. Direction is from negative to positive charge.', difficulty: 'easy', exam: 'IOE' },
  { id: 'es7', topic: 'Electrostatics', question: 'The energy stored in a capacitor is:', options: ['(1/2)CV²', 'CV²', '(1/2)C/V', 'CV'], answer: 0, explanation: 'U = (1/2)CV² = Q²/(2C) = (1/2)QV. Energy stored in the electric field.', difficulty: 'easy', exam: 'Both', formula: 'U = (1/2)CV²' },

  // === Capacitors ===
  { id: 'cap1', topic: 'Capacitors & Dielectrics', question: 'Two capacitors C₁ and C₂ in series have equivalent capacitance:', options: ['C₁C₂/(C₁+C₂)', 'C₁+C₂', 'C₁C₂', '(C₁+C₂)/2'], answer: 0, explanation: '1/C = 1/C₁ + 1/C₂ → C = C₁C₂/(C₁+C₂). Series always gives less than the smallest.', difficulty: 'medium', exam: 'Both' },
  { id: 'cap2', topic: 'Capacitors & Dielectrics', question: 'Two capacitors in parallel have equivalent capacitance:', options: ['C₁+C₂', 'C₁C₂/(C₁+C₂)', 'C₁C₂', '1/(C₁+C₂)'], answer: 0, explanation: 'C = C₁ + C₂. Parallel always gives more than any individual capacitor.', difficulty: 'easy', exam: 'Both' },
  { id: 'cap3', topic: 'Capacitors & Dielectrics', question: 'Inserting a dielectric into a capacitor:', options: ['Increases capacitance', 'Decreases capacitance', 'No effect', 'Destroys the capacitor'], answer: 0, explanation: 'Dielectric increases capacitance by factor κ (dielectric constant). It reduces the electric field.', difficulty: 'easy', exam: 'Both' },
  { id: 'cap4', topic: 'Capacitors & Dielectrics', question: 'A 10 μF capacitor is charged to 12 V. The stored energy is:', options: ['0.72 mJ', '7.2 mJ', '72 mJ', '1.2 mJ'], answer: 0, explanation: 'U = (1/2)CV² = (1/2)(10×10⁻⁶)(144) = 0.72×10⁻³ J = 0.72 mJ.', difficulty: 'medium', exam: 'IOE' },

  // === Current Electricity ===
  { id: 'ce1', topic: 'Current Electricity', question: "Ohm's law states V = IR. The SI unit of resistance is:", options: ['Ohm (Ω)', 'Volt', 'Ampere', 'Watt'], answer: 0, explanation: 'R = V/I. SI unit is Ohm (Ω).', difficulty: 'easy', exam: 'Both' },
  { id: 'ce2', topic: 'Current Electricity', question: 'Two resistors 3 Ω and 6 Ω in parallel have equivalent resistance:', options: ['2 Ω', '9 Ω', '4.5 Ω', '18 Ω'], answer: 0, explanation: '1/R = 1/3 + 1/6 = 1/2 → R = 2 Ω. Parallel is always less than smallest.', difficulty: 'easy', exam: 'Both', formula: '1/R = 1/R₁ + 1/R₂' },
  { id: 'ce3', topic: 'Current Electricity', question: 'A wire of resistance R is stretched to double its length. New resistance is:', options: ['4R', '2R', 'R', 'R/2'], answer: 0, explanation: 'R = ρL/A. Doubling L halves A (volume constant). R\' = ρ(2L)/(A/2) = 4R. Very common IOE/IOM question.', difficulty: 'medium', exam: 'Both', formula: 'R = ρL/A' },
  { id: 'ce4', topic: 'Current Electricity', question: "Kirchhoff's current law (KCL) is based on conservation of:", options: ['Energy', 'Charge', 'Momentum', 'Mass'], answer: 1, explanation: 'KCL: ΣI_in = ΣI_out. Charge is conserved at a junction.', difficulty: 'easy', exam: 'Both' },
  { id: 'ce5', topic: 'Current Electricity', question: "Kirchhoff's voltage law (KVL) is based on conservation of:", options: ['Charge', 'Energy', 'Momentum', 'Mass'], answer: 1, explanation: 'KVL: ΣV = 0 around a loop. Energy is conserved — what goes up must come down.', difficulty: 'easy', exam: 'Both' },
  { id: 'ce6', topic: 'Current Electricity', question: 'A charge of 10 C flows through a wire in 2 s. The current is:', options: ['5 A', '20 A', '0.2 A', '10 A'], answer: 0, explanation: 'I = Q/t = 10/2 = 5 A.', difficulty: 'easy', exam: 'Both', formula: 'I = Q/t' },
  { id: 'ce7', topic: 'Current Electricity', question: 'The Wheatstone bridge is used to measure:', options: ['Current', 'Voltage', 'Unknown resistance', 'Capacitance'], answer: 2, explanation: 'A Wheatstone bridge precisely measures unknown resistance by balancing two legs of a bridge circuit.', difficulty: 'medium', exam: 'IOE' },
  { id: 'ce8', topic: 'Current Electricity', question: 'The power dissipated in a resistor is given by:', options: ['P = I²R', 'P = IR', 'P = I/R', 'P = R/I'], answer: 0, explanation: 'P = I²R = V²/R = VI. All three forms are equivalent.', difficulty: 'easy', exam: 'Both', formula: 'P = I²R' },
  { id: 'ce9', topic: 'Current Electricity', question: 'A 12 V battery connected to a 4 Ω resistor produces current:', options: ['3 A', '48 A', '0.33 A', '8 A'], answer: 0, explanation: 'I = V/R = 12/4 = 3 A.', difficulty: 'easy', exam: 'Both' },
  { id: 'ce10', topic: 'Current Electricity', question: 'The resistivity of a conductor depends on:', options: ['Length', 'Area', 'Material and temperature', 'Voltage'], answer: 2, explanation: 'Resistivity ρ is a material property. It depends on the material and temperature, not on dimensions.', difficulty: 'medium', exam: 'Both' },

  // === Magnetism ===
  { id: 'm1', topic: 'Magnetic Effects of Current', question: 'A current-carrying conductor in a magnetic field experiences a force given by:', options: ['F = BIL sinθ', 'F = BIL cosθ', 'F = B/IL', 'F = BIL²'], answer: 0, explanation: 'F = BIL sinθ where θ is the angle between current and field. Maximum when perpendicular.', difficulty: 'medium', exam: 'Both', formula: 'F = BIL sinθ' },
  { id: 'm2', topic: 'Magnetic Effects of Current', question: "The Biot-Savart law gives the magnetic field due to a current element as:", options: ['dB = (μ₀/4π)(Idl sinθ/r²)', 'dB = (μ₀/4π)(I dl/r²)', 'dB = (μ₀/4π)(Idl cosθ/r²)', 'dB = μ₀I/2πr'], answer: 0, explanation: 'dB = (μ₀/4π)(I dl sinθ/r²). The magnetic field from a current element falls off as 1/r².', difficulty: 'hard', exam: 'IOE', formula: 'dB = (μ₀/4π)(Idl sinθ/r²)' },
  { id: 'm3', topic: 'Magnetic Effects of Current', question: 'The magnetic field inside a long solenoid is:', options: ['μ₀nI', 'μ₀I/2πr', 'μ₀I/4πr', 'Zero'], answer: 0, explanation: 'B = μ₀nI where n = turns per unit length. The field is uniform inside and nearly zero outside.', difficulty: 'medium', exam: 'IOE', formula: 'B = μ₀nI' },
  { id: 'm4', topic: 'Magnetic Effects of Current', question: 'The magnetic field at the center of a circular loop of radius r carrying current I is:', options: ['μ₀I/2r', 'μ₀I/2πr', 'μ₀I/r', 'μ₀I/4πr²'], answer: 0, explanation: 'B = μ₀I/(2r) at the center of a circular loop.', difficulty: 'medium', exam: 'IOE', formula: 'B = μ₀I/(2r)' },
  { id: 'm5', topic: 'Magnetic Effects of Current', question: 'A charged particle moves in a magnetic field. Its path is:', options: ['Straight line', 'Circular', 'Parabolic', 'Random'], answer: 1, explanation: 'The magnetic force is always perpendicular to velocity → circular motion (or helical if v has a component along B).', difficulty: 'easy', exam: 'Both' },
  { id: 'm6', topic: 'Magnetic Effects of Current', question: 'The force between two parallel current-carrying wires is attractive when:', options: ['Currents are in same direction', 'Currents are opposite', 'One current is zero', 'Both currents are zero'], answer: 0, explanation: 'Parallel wires with same-direction currents attract. Opposite currents repel. Used to define the ampere.', difficulty: 'medium', exam: 'IOE' },

  // === EM Induction ===
  { id: 'emi1', topic: 'Electromagnetic Induction', question: "Faraday's law states that the induced EMF is proportional to:", options: ['Rate of change of magnetic flux', 'Magnetic flux', 'Current', 'Resistance'], answer: 0, explanation: 'ε = -dΦ/dt. The induced EMF equals the rate of change of magnetic flux. The minus sign is Lenz\'s law.', difficulty: 'medium', exam: 'IOE', formula: 'ε = -dΦ/dt' },
  { id: 'emi2', topic: 'Electromagnetic Induction', question: "Lenz's law is a consequence of conservation of:", options: ['Charge', 'Energy', 'Momentum', 'Mass'], answer: 1, explanation: 'The induced current opposes the change in flux. If it aided the change, energy would be created — violating conservation of energy.', difficulty: 'medium', exam: 'IOE' },
  { id: 'emi3', topic: 'Electromagnetic Induction', question: 'The self-inductance of a coil is measured in:', options: ['Henry', 'Tesla', 'Weber', 'Farad'], answer: 0, explanation: 'L is measured in Henry (H). ε = -L(dI/dt). 1 H = 1 V·s/A.', difficulty: 'easy', exam: 'IOE' },
  { id: 'emi4', topic: 'Electromagnetic Induction', question: 'A coil of N turns experiences a change in flux dΦ in time dt. The induced EMF is:', options: ['-N dΦ/dt', '-dΦ/dt', '-NΦ/dt', '-N dΦ'], answer: 0, explanation: 'ε = -N(dΦ/dt). The EMF is multiplied by the number of turns N.', difficulty: 'medium', exam: 'IOE', formula: 'ε = -N dΦ/dt' },

  // === AC Circuits ===
  { id: 'ac1', topic: 'AC Circuits', question: 'The RMS value of AC is related to peak value by:', options: ['I_rms = I₀/√2', 'I_rms = I₀', 'I_rms = I₀√2', 'I_rms = I₀/2'], answer: 0, explanation: 'I_rms = I₀/√2 ≈ 0.707 I₀. The RMS value gives the equivalent DC that produces the same heating.', difficulty: 'easy', exam: 'IOE', formula: 'I_rms = I₀/√2' },
  { id: 'ac2', topic: 'AC Circuits', question: 'In a purely resistive AC circuit, the current and voltage are:', options: ['In phase', '90° out of phase', '180° out of phase', '45° out of phase'], answer: 0, explanation: 'In a pure resistor, current and voltage are in phase. Power factor = 1.', difficulty: 'easy', exam: 'IOE' },
  { id: 'ac3', topic: 'AC Circuits', question: 'In a pure inductor, the current:', options: ['Leads voltage by 90°', 'Lags voltage by 90°', 'In phase with voltage', 'Leads by 45°'], answer: 1, explanation: 'In a pure inductor, current lags voltage by 90° (π/2). In a capacitor, current leads by 90°.', difficulty: 'medium', exam: 'IOE' },
  { id: 'ac4', topic: 'AC Circuits', question: 'The resonant frequency of an LCR circuit is:', options: ['1/(2π√(LC))', '1/(2πLC)', '2π√(LC)', '1/(LC)'], answer: 0, explanation: 'f₀ = 1/(2π√(LC)). At resonance, XL = XC, impedance is minimum, current is maximum.', difficulty: 'medium', exam: 'IOE', formula: 'f₀ = 1/(2π√(LC))' },
  { id: 'ac5', topic: 'AC Circuits', question: 'A transformer works on the principle of:', options: ['Self-induction', 'Mutual induction', 'Electrostatics', 'Ohm\'s law'], answer: 1, explanation: 'A transformer uses mutual induction. Changing flux in the primary induces EMF in the secondary.', difficulty: 'medium', exam: 'IOE' },
  { id: 'ac6', topic: 'AC Circuits', question: 'The power factor in an AC circuit is:', options: ['cosφ', 'sinφ', 'tanφ', '1/φ'], answer: 0, explanation: 'Power factor = cosφ where φ is the phase angle between voltage and current. P = VI cosφ.', difficulty: 'medium', exam: 'IOE', formula: 'P = VI cosφ' },

  // === EM Waves ===
  { id: 'emw1', topic: 'Electromagnetic Waves', question: 'Electromagnetic waves are:', options: ['Transverse', 'Longitudinal', 'Both', 'Neither'], answer: 0, explanation: 'EM waves are transverse — the electric and magnetic fields oscillate perpendicular to the direction of propagation.', difficulty: 'easy', exam: 'Both' },
  { id: 'emw2', topic: 'Electromagnetic Waves', question: 'The speed of electromagnetic waves in vacuum is:', options: ['3×10⁸ m/s', '3×10⁶ m/s', '3×10¹⁰ m/s', '340 m/s'], answer: 0, explanation: 'c = 3×10⁸ m/s. All EM waves travel at this speed in vacuum, regardless of frequency.', difficulty: 'easy', exam: 'Both' },
  { id: 'emw3', topic: 'Electromagnetic Waves', question: 'The EM wave with longest wavelength is:', options: ['Radio waves', 'Gamma rays', 'Visible light', 'X-rays'], answer: 0, explanation: 'Radio waves have the longest wavelength (and lowest frequency) in the EM spectrum. Gamma rays have the shortest.', difficulty: 'easy', exam: 'Both' },
  { id: 'emw4', topic: 'Electromagnetic Waves', question: 'The relationship between speed, wavelength, and frequency of EM waves is:', options: ['c = fλ', 'c = f/λ', 'c = λ/f', 'c = f²λ'], answer: 0, explanation: 'c = fλ. Since c is constant in vacuum, higher frequency means shorter wavelength.', difficulty: 'easy', exam: 'Both' },

  // === Ray Optics ===
  { id: 'ro1', topic: 'Ray Optics & Optical Instruments', question: 'The refractive index of glass is 1.5. The critical angle is approximately:', options: ['41.8°', '30°', '60°', '90°'], answer: 0, explanation: 'sinθc = 1/1.5 = 0.667 → θc ≈ 41.8°. Above this angle, total internal reflection occurs.', difficulty: 'medium', exam: 'Both', formula: 'sinθc = n₂/n₁' },
  { id: 'ro2', topic: 'Ray Optics & Optical Instruments', question: 'A convex lens has f = 20 cm. An object at 30 cm forms image at:', options: ['60 cm (real)', '15 cm (virtual)', '12 cm (real)', '20 cm (at focus)'], answer: 0, explanation: '1/v = 1/f + 1/(-u) = 1/20 - 1/30 = 1/60 → v = 60 cm. Real, inverted, magnified.', difficulty: 'medium', exam: 'Both', formula: '1/v - 1/u = 1/f' },
  { id: 'ro3', topic: 'Ray Optics & Optical Instruments', question: 'For a concave mirror, an object placed at the center of curvature forms an image that is:', options: ['At C, real, inverted, same size', 'At F, real, inverted, diminished', 'At infinity, real', 'Behind mirror, virtual'], answer: 0, explanation: 'Object at C → image at C, real, inverted, same size as object. This is a standard result.', difficulty: 'medium', exam: 'Both' },
  { id: 'ro4', topic: 'Ray Optics & Optical Instruments', question: 'The magnifying power of a simple microscope is:', options: ['M = 1 + D/f', 'M = D/f', 'M = f/D', 'M = 1 - D/f'], answer: 0, explanation: 'M = 1 + D/f where D = 25 cm (near point). For relaxed eye: M = D/f.', difficulty: 'medium', exam: 'IOM', formula: 'M = 1 + D/f' },
  { id: 'ro5', topic: 'Ray Optics & Optical Instruments', question: 'Optical fibers work on the principle of:', options: ['Diffraction', 'Total internal reflection', 'Dispersion', 'Polarization'], answer: 1, explanation: 'Light bounces along the fiber via total internal reflection at the core-cladding boundary.', difficulty: 'easy', exam: 'Both' },
  { id: 'ro6', topic: 'Ray Optics & Optical Instruments', question: 'The power of a lens of focal length 50 cm is:', options: ['2 D', '0.5 D', '50 D', '0.02 D'], answer: 0, explanation: 'P = 1/f (in meters) = 1/0.5 = 2 D (diopters).', difficulty: 'easy', exam: 'Both', formula: 'P = 1/f' },
  { id: 'ro7', topic: 'Ray Optics & Optical Instruments', question: 'When light passes from air to glass, it:', options: ['Bends toward normal', 'Bends away from normal', 'Does not bend', 'Reflects completely'], answer: 0, explanation: 'Going from less dense (air) to more dense (glass), light slows down and bends toward the normal.', difficulty: 'easy', exam: 'Both' },

  // === Wave Optics ===
  { id: 'wo1', topic: 'Wave Optics', question: "Young's double-slit experiment demonstrates:", options: ['Particle nature of light', 'Wave nature of light', 'Both', 'Neither'], answer: 1, explanation: 'The interference pattern (bright and dark fringes) demonstrates the wave nature of light.', difficulty: 'easy', exam: 'IOE' },
  { id: 'wo2', topic: 'Wave Optics', question: 'In Young\'s double-slit experiment, fringe width is:', options: ['λD/d', 'λd/D', 'Dd/λ', 'λD²/d'], answer: 0, explanation: 'β = λD/d where λ is wavelength, D is slit-to-screen distance, d is slit separation.', difficulty: 'medium', exam: 'IOE', formula: 'β = λD/d' },
  { id: 'wo3', topic: 'Wave Optics', question: 'The condition for constructive interference is:', options: ['Path difference = nλ', 'Path difference = (n+½)λ', 'Path difference = 0 only', 'Path difference = nλ/2'], answer: 0, explanation: 'Constructive (bright): path difference = nλ. Destructive (dark): path difference = (n+½)λ.', difficulty: 'medium', exam: 'IOE' },
  { id: 'wo4', topic: 'Wave Optics', question: 'Polarization of light proves that light is:', options: ['Longitudinal', 'Transverse', 'Both', 'Neither'], answer: 1, explanation: 'Only transverse waves can be polarized. Polarization filters out one plane of oscillation.', difficulty: 'medium', exam: 'IOE' },

  // === Dual Nature ===
  { id: 'dn1', topic: 'Dual Nature of Radiation & Matter', question: 'The photoelectric effect was explained by:', options: ['Newton', 'Maxwell', 'Einstein', 'Bohr'], answer: 2, explanation: 'Einstein explained the photoelectric effect using the photon model: E = hf. He won the Nobel Prize for this.', difficulty: 'easy', exam: 'Both' },
  { id: 'dn2', topic: 'Dual Nature of Radiation & Matter', question: 'The photoelectric equation is:', options: ['E = hf = Φ + ½mv²_max', 'E = mc²', 'E = hf', 'E = ½mv²'], answer: 0, explanation: 'hf = Φ + ½mv²_max. Photon energy = work function + maximum kinetic energy of emitted electron.', difficulty: 'medium', exam: 'Both', formula: 'hf = Φ + KE_max' },
  { id: 'dn3', topic: 'Dual Nature of Radiation & Matter', question: 'The de Broglie wavelength of a particle of momentum p is:', options: ['λ = h/p', 'λ = hp', 'λ = p/h', 'λ = h/p²'], answer: 0, explanation: 'λ = h/p = h/(mv). Every particle has an associated wavelength.', difficulty: 'medium', exam: 'Both', formula: 'λ = h/p' },
  { id: 'dn4', topic: 'Dual Nature of Radiation & Matter', question: 'The threshold frequency in the photoelectric effect is the minimum frequency needed to:', options: ['Emit an electron', 'Ionize the atom', 'Produce X-rays', 'Heat the metal'], answer: 0, explanation: 'Below threshold frequency f₀ = Φ/h, no electrons are emitted regardless of intensity. This proves light is quantized.', difficulty: 'medium', exam: 'Both' },
  { id: 'dn5', topic: 'Dual Nature of Radiation & Matter', question: 'Increasing the intensity of light in the photoelectric effect (above threshold) increases:', options: ['The number of emitted electrons', 'The kinetic energy of electrons', 'The threshold frequency', 'The work function'], answer: 0, explanation: 'More intensity = more photons = more electrons emitted. But KE depends on frequency, not intensity.', difficulty: 'medium', exam: 'Both' },

  // === Atomic Physics ===
  { id: 'ap1', topic: 'Atomic Physics', question: 'In Bohr\'s model, the radius of the nth orbit is proportional to:', options: ['n²', 'n', '1/n', '1/n²'], answer: 0, explanation: 'r_n = n²a₀/Z. The radius increases as n² (square of the principal quantum number).', difficulty: 'medium', exam: 'Both', formula: 'r_n = n²a₀' },
  { id: 'ap2', topic: 'Atomic Physics', question: 'The energy of the nth orbit in hydrogen is proportional to:', options: ['1/n²', '1/n', 'n²', 'n'], answer: 0, explanation: 'E_n = -13.6/n² eV. Energy becomes less negative (closer to zero) as n increases.', difficulty: 'medium', exam: 'Both', formula: 'E_n = -13.6/n² eV' },
  { id: 'ap3', topic: 'Atomic Physics', question: 'The energy of the ground state of hydrogen is:', options: ['-13.6 eV', '13.6 eV', '0 eV', '-27.2 eV'], answer: 0, explanation: 'E₁ = -13.6 eV. The negative sign indicates the electron is bound to the nucleus.', difficulty: 'easy', exam: 'Both' },
  { id: 'ap4', topic: 'Atomic Physics', question: 'The Lyman series in hydrogen spectrum corresponds to transitions to:', options: ['n = 1', 'n = 2', 'n = 3', 'n = 4'], answer: 0, explanation: 'Lyman series: transitions to n=1 (UV region). Balmer: to n=2 (visible). Paschen: to n=3 (IR).', difficulty: 'medium', exam: 'IOM' },
  { id: 'ap5', topic: 'Atomic Physics', question: 'X-rays are produced when:', options: ['Fast electrons hit a metal target', 'Light hits a metal surface', 'A nucleus decays', 'An electron is excited'], answer: 0, explanation: 'X-rays are produced when high-energy electrons decelerate upon hitting a heavy metal target (bremsstrahlung + characteristic X-rays).', difficulty: 'medium', exam: 'IOM' },

  // === Nuclear Physics ===
  { id: 'np1', topic: 'Nuclear Physics', question: 'The mass-energy equivalence is given by:', options: ['E = mc²', 'E = mc', 'E = mc³', 'E = m/c²'], answer: 0, explanation: 'E = mc². Mass and energy are interchangeable. This is the basis of nuclear energy.', difficulty: 'easy', exam: 'Both', formula: 'E = mc²' },
  { id: 'np2', topic: 'Nuclear Physics', question: 'In nuclear fission, a heavy nucleus splits into:', options: ['Two lighter nuclei', 'Two heavier nuclei', 'One lighter nucleus', 'Photons only'], answer: 0, explanation: 'Fission: a heavy nucleus (like U-235) splits into two lighter nuclei, releasing energy and neutrons.', difficulty: 'easy', exam: 'Both' },
  { id: 'np3', topic: 'Nuclear Physics', question: 'Nuclear fusion is the process that powers:', options: ['The Sun', 'Nuclear reactors', 'X-ray machines', 'Batteries'], answer: 0, explanation: 'The Sun and all stars fuse hydrogen into helium, releasing enormous energy via E = mc².', difficulty: 'easy', exam: 'Both' },
  { id: 'np4', topic: 'Nuclear Physics', question: 'The half-life of a radioactive sample is the time for:', options: ['Half the nuclei to decay', 'All nuclei to decay', 'One nucleus to decay', 'Double the nuclei to decay'], answer: 0, explanation: 'Half-life T₁/₂: the time for half of the radioactive nuclei to decay. N = N₀(1/2)^(t/T₁/₂).', difficulty: 'easy', exam: 'Both', formula: 'N = N₀(1/2)^(t/T₁/₂)' },
  { id: 'np5', topic: 'Nuclear Physics', question: 'The binding energy per nucleon is maximum for elements around mass number:', options: ['56 (Iron)', '1 (Hydrogen)', '238 (Uranium)', '100'], answer: 0, explanation: 'Iron-56 has the highest binding energy per nucleon. Fission releases energy for A > 56; fusion for A < 56.', difficulty: 'medium', exam: 'IOE' },
  { id: 'np6', topic: 'Nuclear Physics', question: 'Alpha particles are:', options: ['Helium nuclei', 'Electrons', 'Photons', 'Neutrons'], answer: 0, explanation: 'Alpha particle = ⁴He nucleus (2 protons + 2 neutrons). Beta = electron/positron. Gamma = photon.', difficulty: 'easy', exam: 'Both' },

  // === Semiconductors ===
  { id: 'sc1', topic: 'Semiconductors & Electronics', question: 'In a PN junction, the depletion region consists of:', options: ['Immobile ions', 'Free electrons', 'Free holes', 'Neutral atoms'], answer: 0, explanation: 'The depletion region has immobile positive and negative ions — no free carriers. It creates a built-in potential.', difficulty: 'medium', exam: 'IOE' },
  { id: 'sc2', topic: 'Semiconductors & Electronics', question: 'A PN junction diode allows current to flow:', options: ['Only in forward bias', 'Only in reverse bias', 'In both directions equally', 'Never'], answer: 0, explanation: 'Forward bias (P to +, N to -): current flows. Reverse bias: very little current. This is rectification.', difficulty: 'easy', exam: 'IOE' },
  { id: 'sc3', topic: 'Semiconductors & Electronics', question: 'A transistor has how many terminals?', options: ['3', '2', '4', '1'], answer: 0, explanation: 'A transistor has 3 terminals: emitter, base, and collector (BJT) or source, gate, and drain (FET).', difficulty: 'easy', exam: 'IOE' },
  { id: 'sc4', topic: 'Semiconductors & Electronics', question: 'In a common-emitter transistor amplifier, the output is taken from:', options: ['Collector', 'Base', 'Emitter', 'Gate'], answer: 0, explanation: 'CE configuration: input at base, output at collector. It provides voltage and current amplification.', difficulty: 'medium', exam: 'IOE' },

  // === University level ===
  { id: 'uni1', topic: 'Lagrangian & Hamiltonian Mechanics', question: 'The Euler-Lagrange equation is:', options: ['d/dt(∂L/∂q̇) - ∂L/∂q = 0', '∂L/∂q = 0', 'dL/dt = 0', '∂L/∂q̇ = 0'], answer: 0, explanation: 'The Euler-Lagrange equation: d/dt(∂L/∂q̇) - ∂L/∂q = 0. It\'s the equation of motion from the Lagrangian L = T - V.', difficulty: 'hard', exam: 'Both', formula: 'd/dt(∂L/∂q̇) = ∂L/∂q' },
  { id: 'uni2', topic: "Maxwell's Equations", question: "Which Maxwell equation states that there are no magnetic monopoles?", options: ['∇·B = 0', '∇·E = ρ/ε₀', '∇×E = -∂B/∂t', '∇×B = μ₀J + μ₀ε₀∂E/∂t'], answer: 0, explanation: '∇·B = 0 means the divergence of B is always zero — magnetic field lines form closed loops, no monopoles.', difficulty: 'hard', exam: 'IOE', formula: '∇·B = 0' },
  { id: 'uni3', topic: 'Quantum Mechanics', question: 'The time-dependent Schrödinger equation is:', options: ['iℏ∂ψ/∂t = Ĥψ', '∂ψ/∂t = Ĥψ', 'iℏ∂ψ/∂x = Ĥψ', 'ℏψ = Ĥψ'], answer: 0, explanation: 'iℏ∂ψ/∂t = Ĥψ. This governs the time evolution of the wavefunction ψ.', difficulty: 'hard', exam: 'IOE', formula: 'iℏ∂ψ/∂t = Ĥψ' },
  { id: 'uni4', topic: 'Special Relativity', question: 'In special relativity, as velocity approaches c, the length of an object:', options: ['Contracts', 'Expands', 'Stays the same', 'Becomes infinite'], answer: 0, explanation: 'L = L₀√(1-v²/c²). Length contracts in the direction of motion as v approaches c.', difficulty: 'medium', exam: 'IOE', formula: 'L = L₀√(1-v²/c²)' },
  { id: 'uni5', topic: 'Statistical Mechanics', question: 'The Boltzmann distribution gives the probability of a state with energy E as:', options: ['P ∝ e^(-E/kT)', 'P ∝ e^(E/kT)', 'P ∝ E/kT', 'P ∝ 1/E'], answer: 0, explanation: 'P(E) ∝ e^(-E/kT). Higher energy states are exponentially less probable at temperature T.', difficulty: 'hard', exam: 'IOE', formula: 'P ∝ e^(-E/kT)' },
]

// === MCQ Generator Engine ===
// Generates variations to reach 1000+ questions

interface GenTemplate {
  topic: string
  difficulty: 'easy' | 'medium' | 'hard'
  exam: 'IOE' | 'IOM' | 'Both'
  generate: () => Omit<MCQ, 'id'>
}

const g = 9.8
const π = Math.PI

function round(n: number, d = 2) {
  const f = Math.pow(10, d)
  return Math.round(n * f) / f
}

function shuffleOptions(correct: string, wrongs: string[]): { options: string[]; answer: number } {
  const options = [correct, ...wrongs]
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[options[i], options[j]] = [options[j], options[i]]
  }
  return { options, answer: options.indexOf(correct) }
}

const generators: GenTemplate[] = [
  // Kinematics: v = u + at
  {
    topic: 'Kinematics — Motion in 1D & 2D', difficulty: 'easy', exam: 'Both',
    generate: () => {
      const u = Math.floor(Math.random() * 20) + 1
      const a = Math.floor(Math.random() * 8) + 1
      const t = Math.floor(Math.random() * 8) + 1
      const v = u + a * t
      const { options, answer } = shuffleOptions(`${v} m/s`, [`${v + a} m/s`, `${v - a} m/s`, `${u} m/s`])
      return {
        topic: 'Kinematics — Motion in 1D & 2D',
        question: `A body starts with initial velocity ${u} m/s and accelerates at ${a} m/s² for ${t} s. Find the final velocity.`,
        options, answer, difficulty: 'easy', exam: 'Both',
        explanation: `Using v = u + at = ${u} + ${a}×${t} = ${v} m/s.`,
        formula: 'v = u + at',
      }
    }
  },
  // Kinematics: s = ut + ½at²
  {
    topic: 'Kinematics — Motion in 1D & 2D', difficulty: 'medium', exam: 'Both',
    generate: () => {
      const u = Math.floor(Math.random() * 15) + 1
      const a = Math.floor(Math.random() * 6) + 1
      const t = Math.floor(Math.random() * 6) + 2
      const s = round(u * t + 0.5 * a * t * t)
      const { options, answer } = shuffleOptions(`${s} m`, [`${round(s + a * t)} m`, `${round(s - a)} m`, `${round(u * t)} m`])
      return {
        topic: 'Kinematics — Motion in 1D & 2D',
        question: `A body starts with velocity ${u} m/s and accelerates at ${a} m/s². How far does it travel in ${t} s?`,
        options, answer, difficulty: 'medium', exam: 'Both',
        explanation: `s = ut + ½at² = ${u}×${t} + ½×${a}×${t}² = ${u*t} + ${round(0.5*a*t*t)} = ${s} m.`,
        formula: 's = ut + ½at²',
      }
    }
  },
  // Kinematics: free fall
  {
    topic: 'Kinematics — Motion in 1D & 2D', difficulty: 'easy', exam: 'Both',
    generate: () => {
      const h = Math.floor(Math.random() * 80) + 10
      const t = round(Math.sqrt(2 * h / g), 2)
      const { options, answer } = shuffleOptions(`${t} s`, [`${round(t * 2)} s`, `${round(t / 2)} s`, `${round(t * 1.5)} s`])
      return {
        topic: 'Kinematics — Motion in 1D & 2D',
        question: `A stone is dropped from a height of ${h} m (g = ${g} m/s²). How long does it take to reach the ground?`,
        options, answer, difficulty: 'easy', exam: 'Both',
        explanation: `s = ½gt² → ${h} = ½×${g}×t² → t = √(${2*h}/${g}) = ${t} s.`,
        formula: 't = √(2h/g)',
      }
    }
  },
  // Kinematics: projectile range
  {
    topic: 'Kinematics — Motion in 1D & 2D', difficulty: 'medium', exam: 'Both',
    generate: () => {
      const u = Math.floor(Math.random() * 30) + 10
      const angles = [30, 45, 60]
      const θ = angles[Math.floor(Math.random() * angles.length)]
      const rad = (θ * π) / 180
      const R = round((u * u * Math.sin(2 * rad)) / g, 1)
      const { options, answer } = shuffleOptions(`${R} m`, [`${round(R * 1.5)} m`, `${round(R * 0.5)} m`, `${round(R * 2)} m`])
      return {
        topic: 'Kinematics — Motion in 1D & 2D',
        question: `A projectile is launched at ${θ}° with speed ${u} m/s (g = ${g} m/s²). Find the range.`,
        options, answer, difficulty: 'medium', exam: 'Both',
        explanation: `R = u²sin(2θ)/g = ${u}²×sin(${2*θ}°)/${g} = ${R} m.`,
        formula: 'R = u²sin(2θ)/g',
      }
    }
  },
  // Newton's laws: F = ma
  {
    topic: "Newton's Laws of Motion", difficulty: 'easy', exam: 'Both',
    generate: () => {
      const m = Math.floor(Math.random() * 10) + 1
      const a = Math.floor(Math.random() * 10) + 1
      const F = m * a
      const { options, answer } = shuffleOptions(`${F} N`, [`${F + m} N`, `${F + a} N`, `${m + a} N`])
      return {
        topic: "Newton's Laws of Motion",
        question: `A force produces an acceleration of ${a} m/s² in a body of mass ${m} kg. Find the force.`,
        options, answer, difficulty: 'easy', exam: 'Both',
        explanation: `F = ma = ${m}×${a} = ${F} N.`,
        formula: 'F = ma',
      }
    }
  },
  // Newton's laws: friction on incline
  {
    topic: "Newton's Laws of Motion", difficulty: 'medium', exam: 'IOE',
    generate: () => {
      const angles = [30, 37, 45, 53]
      const θ = angles[Math.floor(Math.random() * angles.length)]
      const a = round(g * Math.sin((θ * π) / 180), 2)
      const { options, answer } = shuffleOptions(`${a} m/s²`, [`${round(g * Math.cos((θ * π) / 180))} m/s²`, `${g} m/s²`, `${round(a / 2)} m/s²`])
      return {
        topic: "Newton's Laws of Motion",
        question: `A block slides down a frictionless incline of ${θ}° (g = ${g} m/s²). Find the acceleration.`,
        options, answer, difficulty: 'medium', exam: 'IOE',
        explanation: `a = g sinθ = ${g}×sin${θ}° = ${a} m/s².`,
        formula: 'a = g sinθ',
      }
    }
  },
  // Work, Energy: KE
  {
    topic: 'Work, Energy & Power', difficulty: 'easy', exam: 'Both',
    generate: () => {
      const m = Math.floor(Math.random() * 10) + 1
      const v = Math.floor(Math.random() * 15) + 2
      const ke = round(0.5 * m * v * v, 1)
      const { options, answer } = shuffleOptions(`${ke} J`, [`${round(ke * 2)} J`, `${round(ke / 2)} J`, `${m * v} J`])
      return {
        topic: 'Work, Energy & Power',
        question: `A body of mass ${m} kg moves at ${v} m/s. Find its kinetic energy.`,
        options, answer, difficulty: 'easy', exam: 'Both',
        explanation: `KE = ½mv² = ½×${m}×${v}² = ${ke} J.`,
        formula: 'KE = ½mv²',
      }
    }
  },
  // Work, Energy: PE
  {
    topic: 'Work, Energy & Power', difficulty: 'easy', exam: 'Both',
    generate: () => {
      const m = Math.floor(Math.random() * 10) + 1
      const h = Math.floor(Math.random() * 20) + 2
      const pe = round(m * g * h, 1)
      const { options, answer } = shuffleOptions(`${pe} J`, [`${round(pe * 2)} J`, `${round(pe / 2)} J`, `${m * h} J`])
      return {
        topic: 'Work, Energy & Power',
        question: `A body of mass ${m} kg is raised to height ${h} m (g = ${g} m/s²). Find its potential energy.`,
        options, answer, difficulty: 'easy', exam: 'Both',
        explanation: `PE = mgh = ${m}×${g}×${h} = ${pe} J.`,
        formula: 'PE = mgh',
      }
    }
  },
  // Work, Energy: Power
  {
    topic: 'Work, Energy & Power', difficulty: 'medium', exam: 'Both',
    generate: () => {
      const F = Math.floor(Math.random() * 50) + 10
      const d = Math.floor(Math.random() * 20) + 5
      const t = Math.floor(Math.random() * 10) + 2
      const P = round((F * d) / t, 1)
      const { options, answer } = shuffleOptions(`${P} W`, [`${round(P * t)} W`, `${round(P / t)} W`, `${round(F * t)} W`])
      return {
        topic: 'Work, Energy & Power',
        question: `A force of ${F} N moves an object ${d} m in ${t} s. Find the power.`,
        options, answer, difficulty: 'medium', exam: 'Both',
        explanation: `P = W/t = Fd/t = ${F}×${d}/${t} = ${P} W.`,
        formula: 'P = Fd/t',
      }
    }
  },
  // Circular motion: centripetal force
  {
    topic: 'Circular Motion', difficulty: 'medium', exam: 'Both',
    generate: () => {
      const m = Math.floor(Math.random() * 5) + 1
      const r = Math.floor(Math.random() * 20) + 5
      const v = Math.floor(Math.random() * 15) + 5
      const F = round((m * v * v) / r, 1)
      const { options, answer } = shuffleOptions(`${F} N`, [`${round(F * r)} N`, `${round(F * 2)} N`, `${round(m * v)} N`])
      return {
        topic: 'Circular Motion',
        question: `A body of mass ${m} kg moves in a circle of radius ${r} m at ${v} m/s. Find the centripetal force.`,
        options, answer, difficulty: 'medium', exam: 'Both',
        explanation: `F = mv²/r = ${m}×${v}²/${r} = ${F} N.`,
        formula: 'F = mv²/r',
      }
    }
  },
  // Gravitation: escape velocity
  {
    topic: 'Gravitation', difficulty: 'medium', exam: 'IOE',
    generate: () => {
      const R = 6.4e6
      const v = round(Math.sqrt(2 * g * R) / 1000, 1)
      const { options, answer } = shuffleOptions(`${v} km/s`, [`${round(v * 2)} km/s`, `${round(v / 2)} km/s`, `${round(v * 1.5)} km/s`])
      return {
        topic: 'Gravitation',
        question: `Calculate the escape velocity from Earth (g = ${g} m/s², R = 6.4×10⁶ m).`,
        options, answer, difficulty: 'medium', exam: 'IOE',
        explanation: `v_esc = √(2gR) = √(2×${g}×6.4×10⁶) = ${v} km/s.`,
        formula: 'v_esc = √(2gR)',
      }
    }
  },
  // SHM: spring period
  {
    topic: 'Oscillations & SHM', difficulty: 'medium', exam: 'IOE',
    generate: () => {
      const m = (Math.floor(Math.random() * 10) + 1) / 10
      const k = Math.floor(Math.random() * 200) + 50
      const T = round(2 * π * Math.sqrt(m / k), 3)
      const { options, answer } = shuffleOptions(`${T} s`, [`${round(T * 2)} s`, `${round(T / 2)} s`, `${round(T * π)} s`])
      return {
        topic: 'Oscillations & SHM',
        question: `A mass of ${m} kg on a spring (k = ${k} N/m) oscillates. Find the period (π ≈ ${π}).`,
        options, answer, difficulty: 'medium', exam: 'IOE',
        explanation: `T = 2π√(m/k) = 2×${π}×√(${m}/${k}) = ${T} s.`,
        formula: 'T = 2π√(m/k)',
      }
    }
  },
  // SHM: pendulum period
  {
    topic: 'Oscillations & SHM', difficulty: 'medium', exam: 'Both',
    generate: () => {
      const L = (Math.floor(Math.random() * 20) + 5) / 10
      const T = round(2 * π * Math.sqrt(L / g), 2)
      const { options, answer } = shuffleOptions(`${T} s`, [`${round(T * 2)} s`, `${round(T / 2)} s`, `${round(T * 1.5)} s`])
      return {
        topic: 'Oscillations & SHM',
        question: `A simple pendulum has length ${L} m (g = ${g} m/s², π ≈ ${π}). Find its period.`,
        options, answer, difficulty: 'medium', exam: 'Both',
        explanation: `T = 2π√(L/g) = 2×${π}×√(${L}/${g}) = ${T} s.`,
        formula: 'T = 2π√(L/g)',
      }
    }
  },
  // SHM: energy
  {
    topic: 'Oscillations & SHM', difficulty: 'medium', exam: 'IOE',
    generate: () => {
      const k = Math.floor(Math.random() * 200) + 50
      const A = (Math.floor(Math.random() * 10) + 1) / 100
      const E = round(0.5 * k * A * A, 4)
      const { options, answer } = shuffleOptions(`${E} J`, [`${round(E * 2)} J`, `${round(E / 2)} J`, `${round(k * A)} J`])
      return {
        topic: 'Oscillations & SHM',
        question: `A spring (k = ${k} N/m) oscillates with amplitude ${A} m. Find the total energy.`,
        options, answer, difficulty: 'medium', exam: 'IOE',
        explanation: `E = ½kA² = ½×${k}×${A}² = ${E} J.`,
        formula: 'E = ½kA²',
      }
    }
  },
  // Current electricity: Ohm's law
  {
    topic: 'Current Electricity', difficulty: 'easy', exam: 'Both',
    generate: () => {
      const V = Math.floor(Math.random() * 20) + 5
      const R = Math.floor(Math.random() * 20) + 2
      const I = round(V / R, 2)
      const { options, answer } = shuffleOptions(`${I} A`, [`${round(I * R)} A`, `${round(V * R)} A`, `${round(V + R)} A`])
      return {
        topic: 'Current Electricity',
        question: `A ${V} V battery is connected to a ${R} Ω resistor. Find the current.`,
        options, answer, difficulty: 'easy', exam: 'Both',
        explanation: `I = V/R = ${V}/${R} = ${I} A.`,
        formula: 'I = V/R',
      }
    }
  },
  // Current electricity: power
  {
    topic: 'Current Electricity', difficulty: 'medium', exam: 'Both',
    generate: () => {
      const I = Math.floor(Math.random() * 5) + 1
      const R = Math.floor(Math.random() * 20) + 2
      const P = round(I * I * R, 1)
      const { options, answer } = shuffleOptions(`${P} W`, [`${round(I * R)} W`, `${round(P * 2)} W`, `${round(P / I)} W`])
      return {
        topic: 'Current Electricity',
        question: `A current of ${I} A flows through a ${R} Ω resistor. Find the power dissipated.`,
        options, answer, difficulty: 'medium', exam: 'Both',
        explanation: `P = I²R = ${I}²×${R} = ${P} W.`,
        formula: 'P = I²R',
      }
    }
  },
  // Current electricity: parallel resistance
  {
    topic: 'Current Electricity', difficulty: 'medium', exam: 'Both',
    generate: () => {
      const r1 = Math.floor(Math.random() * 10) + 2
      const r2 = Math.floor(Math.random() * 10) + 2
      const R = round((r1 * r2) / (r1 + r2), 2)
      const { options, answer } = shuffleOptions(`${R} Ω`, [`${round(r1 + r2)} Ω`, `${round(r1 * r2)} Ω`, `${round((r1 + r2) / 2)} Ω`])
      return {
        topic: 'Current Electricity',
        question: `Two resistors ${r1} Ω and ${r2} Ω are connected in parallel. Find the equivalent resistance.`,
        options, answer, difficulty: 'medium', exam: 'Both',
        explanation: `1/R = 1/${r1} + 1/${r2} → R = ${r1}×${r2}/(${r1}+${r2}) = ${R} Ω.`,
        formula: 'R = R₁R₂/(R₁+R₂)',
      }
    }
  },
  // Current electricity: charge
  {
    topic: 'Current Electricity', difficulty: 'easy', exam: 'Both',
    generate: () => {
      const I = Math.floor(Math.random() * 10) + 1
      const t = Math.floor(Math.random() * 20) + 2
      const Q = I * t
      const { options, answer } = shuffleOptions(`${Q} C`, [`${round(Q / 2)} C`, `${round(Q * 2)} C`, `${I + t} C`])
      return {
        topic: 'Current Electricity',
        question: `A current of ${I} A flows for ${t} s. Find the total charge transferred.`,
        options, answer, difficulty: 'easy', exam: 'Both',
        explanation: `Q = It = ${I}×${t} = ${Q} C.`,
        formula: 'Q = It',
      }
    }
  },
  // Electrostatics: Coulomb's law
  {
    topic: 'Electrostatics', difficulty: 'medium', exam: 'Both',
    generate: () => {
      const q1 = Math.floor(Math.random() * 5) + 1
      const q2 = Math.floor(Math.random() * 5) + 1
      const r = Math.floor(Math.random() * 5) + 1
      const k = 9e9
      const F = round((k * q1 * q2 * 1e-6) / (r * r), 4)
      const { options, answer } = shuffleOptions(`${F} N`, [`${round(F * 2)} N`, `${round(F / 2)} N`, `${round(F * r)} N`])
      return {
        topic: 'Electrostatics',
        question: `Two charges ${q1} μC and ${q2} μC are placed ${r} m apart. Find the force between them (k = 9×10⁹).`,
        options, answer, difficulty: 'medium', exam: 'Both',
        explanation: `F = kq₁q₂/r² = 9×10⁹×${q1}×10⁻⁶×${q2}×10⁻⁶/${r}² = ${F} N.`,
        formula: 'F = kq₁q₂/r²',
      }
    }
  },
  // Electrostatics: electric field
  {
    topic: 'Electrostatics', difficulty: 'medium', exam: 'Both',
    generate: () => {
      const q = Math.floor(Math.random() * 5) + 1
      const r = Math.floor(Math.random() * 5) + 1
      const k = 9e9
      const E = round((k * q * 1e-6) / (r * r), 3)
      const { options, answer } = shuffleOptions(`${E} N/C`, [`${round(E * 2)} N/C`, `${round(E / 2)} N/C`, `${round(E * r)} N/C`])
      return {
        topic: 'Electrostatics',
        question: `Find the electric field at a distance of ${r} m from a ${q} μC charge (k = 9×10⁹).`,
        options, answer, difficulty: 'medium', exam: 'Both',
        explanation: `E = kq/r² = 9×10⁹×${q}×10⁻⁶/${r}² = ${E} N/C.`,
        formula: 'E = kq/r²',
      }
    }
  },
  // Capacitors: energy
  {
    topic: 'Capacitors & Dielectrics', difficulty: 'medium', exam: 'Both',
    generate: () => {
      const C = Math.floor(Math.random() * 20) + 2
      const V = Math.floor(Math.random() * 20) + 5
      const U = round(0.5 * C * V * V / 1000, 4)
      const { options, answer } = shuffleOptions(`${U} mJ`, [`${round(U * 2)} mJ`, `${round(U / 2)} mJ`, `${round(C * V / 1000)} mJ`])
      return {
        topic: 'Capacitors & Dielectrics',
        question: `A ${C} μF capacitor is charged to ${V} V. Find the stored energy.`,
        options, answer, difficulty: 'medium', exam: 'Both',
        explanation: `U = ½CV² = ½×${C}×10⁻⁶×${V}² = ${U} mJ.`,
        formula: 'U = ½CV²',
      }
    }
  },
  // Thermodynamics: Carnot efficiency
  {
    topic: 'Thermodynamics', difficulty: 'medium', exam: 'IOE',
    generate: () => {
      const Tc = Math.floor(Math.random() * 200) + 100
      const Th = Tc + Math.floor(Math.random() * 200) + 100
      const η = round((1 - Tc / Th) * 100, 1)
      const { options, answer } = shuffleOptions(`${η}%`, [`${round(η + 20)}%`, `${round(η - 10)}%`, `${round(100 - η)}%`])
      return {
        topic: 'Thermodynamics',
        question: `A Carnot engine operates between ${Tc} K and ${Th} K. Find its efficiency.`,
        options, answer, difficulty: 'medium', exam: 'IOE',
        explanation: `η = 1 - Tc/Th = 1 - ${Tc}/${Th} = ${η}%.`,
        formula: 'η = 1 - Tc/Th',
      }
    }
  },
  // Waves: speed
  {
    topic: 'Wave Motion', difficulty: 'medium', exam: 'Both',
    generate: () => {
      const f = Math.floor(Math.random() * 500) + 100
      const λ = (Math.floor(Math.random() * 5) + 1) / 10
      const v = round(f * λ, 1)
      const { options, answer } = shuffleOptions(`${v} m/s`, [`${round(v * 2)} m/s`, `${round(v / 2)} m/s`, `${round(f / λ)} m/s`])
      return {
        topic: 'Wave Motion',
        question: `A wave has frequency ${f} Hz and wavelength ${λ} m. Find its speed.`,
        options, answer, difficulty: 'medium', exam: 'Both',
        explanation: `v = fλ = ${f}×${λ} = ${v} m/s.`,
        formula: 'v = fλ',
      }
    }
  },
  // Fluids: pressure
  {
    topic: 'Fluid Mechanics', difficulty: 'easy', exam: 'Both',
    generate: () => {
      const ρ = 1000
      const h = Math.floor(Math.random() * 20) + 2
      const P = round(ρ * g * h / 1000, 1)
      const { options, answer } = shuffleOptions(`${P} kPa`, [`${round(P * 2)} kPa`, `${round(P / 2)} kPa`, `${round(P * 10)} kPa`])
      return {
        topic: 'Fluid Mechanics',
        question: `Find the pressure at a depth of ${h} m in water (ρ = 1000 kg/m³, g = ${g} m/s²).`,
        options, answer, difficulty: 'easy', exam: 'Both',
        explanation: `P = ρgh = 1000×${g}×${h} = ${P * 1000} Pa = ${P} kPa.`,
        formula: 'P = ρgh',
      }
    }
  },
  // Optics: lens formula
  {
    topic: 'Ray Optics & Optical Instruments', difficulty: 'medium', exam: 'Both',
    generate: () => {
      const f = (Math.floor(Math.random() * 20) + 10)
      const u = f + Math.floor(Math.random() * 30) + 10
      const v = round((f * u) / (u - f), 1)
      const { options, answer } = shuffleOptions(`${v} cm`, [`${round(v * 2)} cm`, `${round(v / 2)} cm`, `${round(f * u / (u + f))} cm`])
      return {
        topic: 'Ray Optics & Optical Instruments',
        question: `A convex lens has f = ${f} cm. An object is placed at ${u} cm. Find the image distance.`,
        options, answer, difficulty: 'medium', exam: 'Both',
        explanation: `1/v - 1/u = 1/f → 1/v = 1/${f} + 1/(-${u}) = (${u}-${f})/(${f}×${u}) → v = ${v} cm.`,
        formula: '1/v - 1/u = 1/f',
      }
    }
  },
  // Optics: lens power
  {
    topic: 'Ray Optics & Optical Instruments', difficulty: 'easy', exam: 'Both',
    generate: () => {
      const f = (Math.floor(Math.random() * 40) + 10)
      const P = round(100 / f, 2)
      const { options, answer } = shuffleOptions(`${P} D`, [`${round(P * 2)} D`, `${round(P / 2)} D`, `${round(f / 100)} D`])
      return {
        topic: 'Ray Optics & Optical Instruments',
        question: `A lens has focal length ${f} cm. Find its power.`,
        options, answer, difficulty: 'easy', exam: 'Both',
        explanation: `P = 1/f (in meters) = 1/${(f/100).toFixed(2)} = ${P} D.`,
        formula: 'P = 1/f',
      }
    }
  },
  // Nuclear: half-life
  {
    topic: 'Nuclear Physics', difficulty: 'medium', exam: 'Both',
    generate: () => {
      const T = Math.floor(Math.random() * 10) + 2
      const n = Math.floor(Math.random() * 4) + 1
      const remaining = round(100 / Math.pow(2, n), 1)
      const { options, answer } = shuffleOptions(`${remaining}%`, [`${round(100 - remaining)}%`, `${round(remaining * 2)}%`, `${round(100 / n)}%`])
      return {
        topic: 'Nuclear Physics',
        question: `A radioactive sample has half-life ${T} years. What percentage remains after ${n * T} years?`,
        options, answer, difficulty: 'medium', exam: 'Both',
        explanation: `After ${n} half-lives: N/N₀ = (1/2)^${n} = ${remaining}%.`,
        formula: 'N = N₀(1/2)^(t/T)',
      }
    }
  },
  // Thermal expansion
  {
    topic: 'Thermal Expansion', difficulty: 'medium', exam: 'Both',
    generate: () => {
      const α = 1.2e-5
      const L = Math.floor(Math.random() * 5) + 1
      const ΔT = Math.floor(Math.random() * 80) + 20
      const ΔL = round(L * α * ΔT * 1000, 2)
      const { options, answer } = shuffleOptions(`${ΔL} mm`, [`${round(ΔL * 2)} mm`, `${round(ΔL / 2)} mm`, `${round(ΔL * 10)} mm`])
      return {
        topic: 'Thermal Expansion',
        question: `A steel rod of length ${L} m (α = 12×10⁻⁶/°C) is heated by ${ΔT}°C. Find the expansion.`,
        options, answer, difficulty: 'medium', exam: 'Both',
        explanation: `ΔL = LαΔT = ${L}×12×10⁻⁶×${ΔT} = ${ΔL} mm.`,
        formula: 'ΔL = L₀αΔT',
      }
    }
  },
  // Calorimetry: heat
  {
    topic: 'Calorimetry & Heat Transfer', difficulty: 'easy', exam: 'Both',
    generate: () => {
      const m = Math.floor(Math.random() * 5) + 1
      const c = 4186
      const ΔT = Math.floor(Math.random() * 50) + 10
      const Q = round((m * c * ΔT) / 1000, 1)
      const { options, answer } = shuffleOptions(`${Q} kJ`, [`${round(Q * 2)} kJ`, `${round(Q / 2)} kJ`, `${round(m * ΔT)} kJ`])
      return {
        topic: 'Calorimetry & Heat Transfer',
        question: `How much heat is needed to raise ${m} kg of water by ${ΔT}°C (c = 4186 J/kg·K)?`,
        options, answer, difficulty: 'easy', exam: 'Both',
        explanation: `Q = mcΔT = ${m}×4186×${ΔT} = ${Q * 1000} J = ${Q} kJ.`,
        formula: 'Q = mcΔT',
      }
    }
  },
  // Magnetism: force on wire
  {
    topic: 'Magnetic Effects of Current', difficulty: 'medium', exam: 'IOE',
    generate: () => {
      const I = Math.floor(Math.random() * 10) + 1
      const L = Math.floor(Math.random() * 2) + 1
      const B = Math.floor(Math.random() * 5) + 1
      const F = round(I * L * B * 0.001, 3)
      const { options, answer } = shuffleOptions(`${F} N`, [`${round(F * 2)} N`, `${round(F / 2)} N`, `${round(I * B * 0.001)} N`])
      return {
        topic: 'Magnetic Effects of Current',
        question: `A ${L} m wire carries ${I} A current perpendicular to a ${B} mT field. Find the force.`,
        options, answer, difficulty: 'medium', exam: 'IOE',
        explanation: `F = BIL = ${B}×10⁻³×${I}×${L} = ${F} N.`,
        formula: 'F = BIL',
      }
    }
  },
  // Rotational: moment of inertia of solid sphere
  {
    topic: 'Rotational Dynamics', difficulty: 'hard', exam: 'IOE',
    generate: () => {
      const M = Math.floor(Math.random() * 5) + 1
      const R = Math.floor(Math.random() * 3) + 1
      const I = round((2/5) * M * R * R, 2)
      const { options, answer } = shuffleOptions(`${I} kg·m²`, [`${round((2/3) * M * R * R)} kg·m²`, `${round(M * R * R)} kg·m²`, `${round((1/2) * M * R * R)} kg·m²`])
      return {
        topic: 'Rotational Dynamics',
        question: `Find the moment of inertia of a solid sphere of mass ${M} kg and radius ${R} m about its diameter.`,
        options, answer, difficulty: 'hard', exam: 'IOE',
        explanation: `I = (2/5)MR² = (2/5)×${M}×${R}² = ${I} kg·m².`,
        formula: 'I = (2/5)MR²',
      }
    }
  },
  // EM induction: Faraday's law
  {
    topic: 'Electromagnetic Induction', difficulty: 'medium', exam: 'IOE',
    generate: () => {
      const N = Math.floor(Math.random() * 50) + 10
      const dΦ = Math.floor(Math.random() * 5) + 1
      const dt = Math.floor(Math.random() * 5) + 1
      const ε = round(N * dΦ / dt, 1)
      const { options, answer } = shuffleOptions(`${ε} V`, [`${round(ε * 2)} V`, `${round(ε / 2)} V`, `${round(N * dΦ)} V`])
      return {
        topic: 'Electromagnetic Induction',
        question: `A coil of ${N} turns has flux change of ${dΦ} Wb in ${dt} s. Find the induced EMF.`,
        options, answer, difficulty: 'medium', exam: 'IOE',
        explanation: `ε = -N(dΦ/dt) = -${N}×(${dΦ}/${dt}) = ${ε} V (magnitude).`,
        formula: 'ε = N dΦ/dt',
      }
    }
  },
  // AC circuits: RMS value
  {
    topic: 'AC Circuits', difficulty: 'easy', exam: 'IOE',
    generate: () => {
      const I0 = Math.floor(Math.random() * 20) + 5
      const Irms = round(I0 / Math.sqrt(2), 2)
      const { options, answer } = shuffleOptions(`${Irms} A`, [`${I0} A`, `${round(I0 * 2)} A`, `${round(I0 / 2)} A`])
      return {
        topic: 'AC Circuits',
        question: `An AC current has peak value ${I0} A. Find its RMS value.`,
        options, answer, difficulty: 'easy', exam: 'IOE',
        explanation: `I_rms = I₀/√2 = ${I0}/1.414 = ${Irms} A.`,
        formula: 'I_rms = I₀/√2',
      }
    }
  },
  // Modern physics: de Broglie wavelength
  {
    topic: 'Dual Nature of Radiation & Matter', difficulty: 'medium', exam: 'Both',
    generate: () => {
      const v = (Math.floor(Math.random() * 10) + 1) * 1e6
      const m = 9.1e-31
      const h = 6.6e-34
      const λ = round((h / (m * v)) * 1e10, 2)
      const { options, answer } = shuffleOptions(`${λ} Å`, [`${round(λ * 2)} Å`, `${round(λ / 2)} Å`, `${round(λ * 10)} Å`])
      return {
        topic: 'Dual Nature of Radiation & Matter',
        question: `Find the de Broglie wavelength of an electron moving at ${v.toExponential()} m/s (h = 6.6×10⁻³⁴, m = 9.1×10⁻³¹).`,
        options, answer, difficulty: 'medium', exam: 'Both',
        explanation: `λ = h/(mv) = 6.6×10⁻³⁴/(9.1×10⁻³¹×${v.toExponential()}) = ${λ} Å.`,
        formula: 'λ = h/p',
      }
    }
  },
  // Atomic: Bohr energy
  {
    topic: 'Atomic Physics', difficulty: 'medium', exam: 'Both',
    generate: () => {
      const n = Math.floor(Math.random() * 4) + 2
      const E = round(-13.6 / (n * n), 2)
      const { options, answer } = shuffleOptions(`${E} eV`, [`${round(-13.6 / ((n+1) * (n+1)), 2)} eV`, `${round(-13.6 / n)} eV`, `${round(-13.6 * n)} eV`])
      return {
        topic: 'Atomic Physics',
        question: `Find the energy of the ${n}th orbit of hydrogen atom.`,
        options, answer, difficulty: 'medium', exam: 'Both',
        explanation: `E_n = -13.6/n² = -13.6/${n}² = ${E} eV.`,
        formula: 'E_n = -13.6/n² eV',
      }
    }
  },
]

export function generateMCQs(count: number): MCQ[] {
  const generated: MCQ[] = []
  let id = 0
  const totalNeeded = count - curated.length
  while (generated.length < totalNeeded) {
    const gen = generators[Math.floor(Math.random() * generators.length)]
    const mcq = gen.generate()
    generated.push({ ...mcq, id: `gen-${id++}` })
  }
  return [...curated, ...generated]
}

export const allMCQs = generateMCQs(1000)
