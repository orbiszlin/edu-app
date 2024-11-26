 export interface QuestionModel {
   question: string,
   answers: { answer: string, correct: boolean }[],
   showAnswers: boolean,
   isAnswerCorrect: boolean,
 }
