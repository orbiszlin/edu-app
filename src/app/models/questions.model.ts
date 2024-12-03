export interface QuestionModel {
  question: string,
  answers: AnswerModel[],
  showAnswers: boolean,
}

export interface AnswerModel {
  answer: string,
  correct: boolean,
}

/*const žid: QuestionModel = {
  question: "mrdko",
  answers: [{
    answer: "odpoved",
    correct: false},
    {answer: "odpoved",
    correct: true}],
  showAnswers: false,
}*/
