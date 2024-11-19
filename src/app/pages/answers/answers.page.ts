import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AnswService} from "../../services/answ.service";
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
import {Question} from "../../models/question.model";

@Component({
  selector: 'app-answers',
  templateUrl: './answers.page.html',
  styleUrls: ['./answers.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonRadio, IonItem, IonLabel, IonRadioGroup, IonList, IonGrid, IonRow, IonCol, IonText]
})
export class AnswersPage implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex = 0;
  totalQuestions = 0;
  selectedAnswer: string = '';
  isAnswerCorrect: boolean | null = null;
  answerFeedback: string | null = null;
  remainingTime: string = ''; // Nastavte čas, pokud je to potřeba

  constructor(
    private answService: AnswService,
  ) {}

  ngOnInit() {
    this.questions = this.answService.getQuestions();
    this.totalQuestions = this.questions.length;
    this.loadQuestion();
  }

  loadQuestion() {
    this.selectedAnswer = '';
    this.isAnswerCorrect = null;
    this.answerFeedback = null;
  }

  submitAnswer() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;

    this.isAnswerCorrect = this.selectedAnswer === correctAnswer;

    this.answerFeedback = this.isAnswerCorrect
      ? 'Správná odpověď!'
      : `Špatná odpověď. Správná odpověď je ${this.getCorrectAnswerLabel()}.`;

    setTimeout(() => {
      this.moveToNextQuestion();
    }, 1500); // Čas na zobrazení zpětné vazby
  }

  moveToNextQuestion() {
    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      this.currentQuestionIndex++;
      this.loadQuestion();
    } else {
      console.log('Konec kvízu.');
      // Můžete zde přidat logiku pro ukončení kvízu
    }
  }

  getAnswerClass(answer: string) {
    if (this.isAnswerCorrect === null) {
      return '';
    }
    if (this.isAnswerCorrect && answer === this.questions[this.currentQuestionIndex].correctAnswer) {
      return 'correct-answer';
    } else if (!this.isAnswerCorrect && answer === this.selectedAnswer) {
      return 'incorrect-answer';
    }
    return '';
  }

  getCorrectAnswerLabel() {
    const correctOption = this.questions[this.currentQuestionIndex].options.find(
      option => option.value === this.questions[this.currentQuestionIndex].correctAnswer
    );
    return correctOption ? correctOption.label : '';
  }
}
