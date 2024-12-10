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


  async loadState(): Promise<QuestionModel[]> {
    const { value } = await Preferences.get({ key: 'questions' });
    if (value) {
      return JSON.parse(value); // Pokud otázky existují, vrátí je jako pole
    }
    return []; // Pokud nejsou, vrátí prázdné pole
  }

  async saveState(questions: QuestionModel[]): Promise<void> {
    for (const question of questions) {
      await Preferences.set({
        key: `question_${question.id}`, // Uložení podle id otázky
        value: JSON.stringify(question),
      });
    }
  }

  async loadQuestionById(id: number): Promise<QuestionModel | null> {
    const { value } = await Preferences.get({ key: `question_${id}` });
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  async saveQuestionById(question: QuestionModel): Promise<void> {
    await Preferences.set({
      key: `question_${question.id}`, // Ukládá otázku podle jejího id
      value: JSON.stringify(question),
    });
  }
}

