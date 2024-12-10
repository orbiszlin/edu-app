export interface QuestionModel {
  title: string,
  id: number;
  answers: AnswerModel[],
  showAnswers: boolean,
}

export interface AnswerModel {
  answer: string,
  correct: boolean,
}


export interface SetModel {
  id: number;
  name: string;
  questions: QuestionModel[];
}

const model: SetModel = {
  id: 1,
  name: "Čeština",
  questions: [

  ]
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
