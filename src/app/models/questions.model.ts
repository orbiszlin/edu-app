// questions.model.ts
export interface QuestionModel {
  question: string;    // Text otázky
  answers: string[];   // Pole odpovědí
  showAnswers: boolean; // Flag pro zobrazení/skrytí odpovědí
}
