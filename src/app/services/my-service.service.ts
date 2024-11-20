import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import {QuestionModel} from "../models/questions.model";

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
   * Seznam otázek je uložen ve formátu JSON pro pozdější načtení.
   * @param {Array} questions - Pole otázek a odpovědí.
   * @returns {Promise<void>} - Vrací prázdnou promise, která označuje úspěšné dokončení operace.
   */
  async saveState(questions: QuestionModel[]): Promise<void> {
    await Preferences.set({ key: 'questions', value: JSON.stringify(questions) });
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
   * @param {any[]} questions - Seznam všech otázek, ze kterého je vybraná otázka.
   */
  modifyQuestion(questionForm: FormGroup, selectedQuestion: number, questions: any[]): void {
    const questionToEdit = questions[selectedQuestion];
    questionForm.patchValue({
      question: questionToEdit.question
    });

    const answersArray = questionForm.get('answers') as FormArray;
    answersArray.clear();
    questionToEdit.answers.forEach((answer: string) => {
      answersArray.push(new FormControl(answer)); // Naplní formulář existujícími odpovědmi
    });
  }

  /**
   * Potvrdí změny nebo přidání nové otázky.
   * Pokud je aktivní režim úpravy, aktualizuje existující otázku, jinak přidá novou.
   * @param {FormGroup} questionData - Formulář s otázkou a odpovědmi.
   * @param {any[]} questions - Seznam otázek, který bude upraven.
   * @param {number | null} selectedQuestion - Index vybrané otázky (null, pokud je nová otázka).
   * @param {boolean} isEditing - Určuje, zda je otázka upravována nebo přidávána nová.
   */
  confirm(questionData: any, questions: any[], selectedQuestion: number | null, isEditing: boolean): void {
    if (isEditing) {
      if (selectedQuestion !== null) {
        // Edituje vybranou otázku
        questions[selectedQuestion] = {
          question: questionData.question,
          answers: questionData.answers,
          showAnswers: false
        };
      }
    } else {
      // Přidá novou otázku
      questions.push({
        question: questionData.question,
        answers: questionData.answers,
        showAnswers: false
      });
    }
  }

  /**
   * Odstraní vybranou otázku ze seznamu.
   * @param {number | null} selectedQuestion - Index vybrané otázky, která bude odstraněna.
   * @param {any[]} questions - Seznam otázek, ze kterého bude vybraná otázka odstraněna.
   */
  removeQuestion(selectedQuestion: number | null, questions: any[]): void {
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
}
