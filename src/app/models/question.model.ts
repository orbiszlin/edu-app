export interface Question {
  question: string,
  options: Option[],
  correctAnswer: string,
}

export interface Option {
  label: string,
  value: string,
}

