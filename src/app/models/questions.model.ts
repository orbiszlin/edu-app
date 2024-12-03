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
  question: "",
  answers: [{
    answer: "",
    correct: false},
    {answer: "",
    correct: true}],
  showAnswers: false,
}*/
