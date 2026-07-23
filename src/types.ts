export type Mode = 'concept' | 'numerical' | 'experiment' | 'exam' | 'revision' | 'ai-tutor'
export type Level = 'class11_12' | 'ioe' | 'iom' | 'university'

export interface LessonStep {
  title: string
  content: string
  analogy?: string
  formula?: string
  question: string
  options: string[]
  answer: number
  explanation: string
}

export interface ConceptLesson {
  id: string
  title: string
  category: string
  icon: string
  description: string
  steps: LessonStep[]
}

export interface MCQ {
  id: string
  topic: string
  question: string
  options: string[]
  answer: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  exam: 'IOE' | 'IOM' | 'Both'
  formula?: string
}

export interface Experiment {
  id: string
  title: string
  category: string
  icon: string
  aim: string
  apparatus: string[]
  theory: string
  procedure: string[]
  variables: Variable[]
  observations: string
  graph: string
  conclusion: string
  predictionQuestion: string
  predictionOptions: string[]
  predictionAnswer: number
}

export interface Variable {
  name: string
  label: string
  min: number
  max: number
  step: number
  default: number
  unit: string
}

export interface QuizResult {
  question: string
  correct: boolean
  userAnswer: string
  correctAnswer: string
}
