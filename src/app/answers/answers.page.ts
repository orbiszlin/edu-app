import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonCol,
  IonContent, IonGrid,
  IonHeader,
  IonItem,
  IonLabel, IonList,
  IonRadio, IonRadioGroup, IonRow, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.page.html',
  styleUrls: ['./answers.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonRadio, IonItem, IonLabel, IonRadioGroup, IonList, IonGrid, IonRow, IonCol, IonText]
})
export class AnswersPage  {
  selectedAnswer: any;
  currentQuestion: number = 0;
  totalQuestions: number = 0;
  currentTime!: string;

  constructor() {
    this.currentQuestion = 15;
    this.totalQuestions = 49;
  }



  submitAnswer() {

  }

  getAnswerClass(a: string) {
    return undefined;
  }
}
