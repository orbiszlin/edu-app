import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { QuestionModel } from "../models/questions.model";
import {AnswerModel} from "../models/questions.model";

@Injectable({
  providedIn: 'root',
})
export class MyService {
  constructor() {}

  /**
   * Načte seznam otázek ze storage.
   * Pokud jsou otázky uložené v zařízení, vrátí je jako pole objektů.
   * Pokud otázky nejsou nalezeny, vrátí prázdné pole.
   * @returns {Promise<{ question: string; answers: string[]; showAnswers: boolean }[]>} - Seznam otázek a odpovědí.
   */
  async loadState(): Promise<QuestionModel[]> {
    const { value } = await Preferences.get({ key: 'questions' });
    if (value) {
      return JSON.parse(value); // Pokud otázky existují, vrátí je jako pole
    }
    return []; // Pokud nejsou, vrátí prázdné pole
  }

  /**
   * Uloží seznam otázek do storage.
   * Každá otázka je uložena zvlášť podle jejího id.
   * @param {QuestionModel[]} questions - Pole otázek a odpovědí.
   * @returns {Promise<void>} - Vrací prázdnou promise, která označuje úspěšné dokončení operace.
   */
  async saveState(questions: QuestionModel[]): Promise<void> {
    for (const question of questions) {
      await Preferences.set({
        key: `question_${question.id}`, // Uložení podle id otázky
        value: JSON.stringify(question),
      });
    }
  }

  /**
   * Přidá novou odpověď do formuláře.
   * Limit odpovědí je stanoven na 4. Pokud je již přidáno 4 odpovědí, zobrazení upozornění.
   * @param {FormGroup} questionForm - Formulář s otázkou a odpovědmi.
   * @deprecated
   */
  addAnswer(questionForm: FormGroup): void {
    const answersArray = questionForm.get('answers') as FormArray;
    if (answersArray.length < 4) {
      answersArray.push(new FormControl("")); // Limit odpovědí na 4
    } else {
      alert("You can only add up to 4 answers.");
    }
  }

  /**
   * Odstraní odpověď na zadaném indexu.
   * Pokud existuje více než jedna odpověď, vybraná odpověď je odstraněna.
   * @param {FormGroup} questionForm - Formulář s otázkou a odpovědmi.
   * @param {number} index - Index odpovědi, kterou je potřeba odstranit.
   * @deprecated
   */
  removeAnswer(questionForm: FormGroup, index: number): void {
    const answersArray = questionForm.get('answers') as FormArray;
    if (answersArray.length > 1) {
      answersArray.removeAt(index); // Odstraní odpověď
    }
  }

  /**
   * Upraví existující otázku ve formuláři.
   * Načte data vybrané otázky a naplní formulář s těmito hodnotami.
   * @param {FormGroup} questionForm - Formulář, který bude naplněn daty.
   * @param {number} selectedQuestion - Index vybrané otázky.
   * @param {QuestionModel[]} questions - Seznam všech otázek, ze kterého je vybraná otázka.
   */
  modifyQuestion(questionForm: FormGroup, selectedQuestion: number, questions: QuestionModel[]): void {
    const questionToEdit = questions[selectedQuestion];
    questionForm.patchValue({
      question: questionToEdit.question
    });

    const answersArray = questionForm.get('answers') as FormArray;
    answersArray.clear();
    questionToEdit.answers.forEach((answer: AnswerModel) => {
      answersArray.push(new FormControl(answer.answer)); // Naplní formulář existujícími odpovědmi
    });
  }

  /**
   * Potvrdí změny nebo přidání nové otázky.
   * Pokud je aktivní režim úpravy, aktualizuje existující otázku, jinak přidá novou.
   * @param {FormGroup} questionData - Formulář s otázkou a odpovědmi.
   * @param {QuestionModel[]} questions - Seznam otázek, který bude upraven.
   * @param {number | null} selectedQuestion - Index vybrané otázky (null, pokud je nová otázka).
   * @param {boolean} isEditing - Určuje, zda je otázka upravována nebo přidávána nová.
   */
  confirm(questionData: any, questions: QuestionModel[], selectedQuestion: number | null, isEditing: boolean): void {
    if (isEditing && selectedQuestion !== null) {
      // Edituje vybranou otázku
      questions[selectedQuestion] = {
        question: questionData.question,
        answers: questionData.answers,
        showAnswers: false,
        id: questions[selectedQuestion].id // Keep the same ID
      };
    } else {
      // Přidá novou otázku s novým ID
      const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
      questions.push({
        question: questionData.question,
        answers: questionData.answers,
        showAnswers: false,
        id: newId, // Přiřadí nové unikátní ID
      });
    }
  }

  /**
   * Odstraní vybranou otázku ze seznamu.
   * @param {number | null} selectedQuestion - Index vybrané otázky, která bude odstraněna.
   * @param {QuestionModel[]} questions - Seznam otázek, ze kterého bude vybraná otázka odstraněna.
   */
  removeQuestion(selectedQuestion: number | null, questions: QuestionModel[]): void {
    if (selectedQuestion !== null) {
      questions.splice(selectedQuestion, 1); // Odstraní vybranou otázku
    }
  }

  /**
   * Resetuje formulář pro zadávání nové otázky.
   * Vyčistí všechny hodnoty a přidá jednu prázdnou odpověď.
   * @param {FormGroup} questionForm - Formulář, který bude resetován.
   * @deprecated
   */
  resetForm(questionForm: FormGroup): void {
    questionForm.reset();
    const answersArray = questionForm.get('answers') as FormArray;
    answersArray.clear();
    answersArray.push(new FormControl("")); // Přidá novou prázdnou odpověď
  }

  /**
   * Načte jednu otázku ze storage podle jejího id.
   * @param {number} id - ID otázky.
   * @returns {Promise<QuestionModel | null>} - Vrátí otázku s odpověďmi nebo null, pokud neexistuje.
   */
  async loadQuestionById(id: number): Promise<QuestionModel | null> {
    const { value } = await Preferences.get({ key: `question_${id}` });
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  /**
   * Uloží otázku podle jejího id.
   * @param {QuestionModel} question - Otázka, která bude uložena.
   * @returns {Promise<void>} - Vrátí promise pro dokončení operace.
   */
  async saveQuestionById(question: QuestionModel): Promise<void> {
    await Preferences.set({
      key: `question_${question.id}`, // Ukládá otázku podle jejího id
      value: JSON.stringify(question),
    });
  }
}
