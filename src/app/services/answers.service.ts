import { Injectable } from '@angular/core';
import {Question} from "../models/question.model";

@Injectable({
  providedIn: 'root',
})
export class AnswersService {
  private questions: Question[] = [
    {
      question: 'Jaké je hlavní město Francie?',
      options: [
        { label: 'A) Londýn', value: 'a' },
        { label: 'B) Paříž', value: 'b' },
        { label: 'C) Berlín', value: 'c' },
        { label: 'D) Řím', value: 'd' },
      ],
      correctAnswer: 'b',
    },
    {
      question: 'Jaké je hlavní město Německa?',
      options: [
        { label: 'A) Berlín', value: 'a' },
        { label: 'B) Mnichov', value: 'b' },
        { label: 'C) Hamburk', value: 'c' },
        { label: 'D) Frankfurt', value: 'd' },
      ],
      correctAnswer: 'a',
    },
    {
      question: 'Která planeta je nejblíže Slunci?',
      options: [
        { label: 'A) Venuše', value: 'a' },
        { label: 'B) Mars', value: 'b' },
        { label: 'C) Merkur', value: 'c' },
        { label: 'D) Země', value: 'd' },
      ],
      correctAnswer: 'c',
    },
  ];

  getQuestions() {
    return this.questions;
  }
}
