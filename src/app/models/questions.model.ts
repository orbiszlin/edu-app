// questions.model.ts

/**
 * Interface representing a single question and its associated answers.
 */
export interface Question {
  question: string;      // The text of the question
  answers: string[];     // List of possible answers for the question
  showAnswers: boolean;   // Flag indicating whether to show the answers
}
