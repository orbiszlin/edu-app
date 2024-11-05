import {Component, OnInit} from '@angular/core';
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
export class AnswersPage implements OnInit {
  questions = [
    {
      question: "Jaké je hlavní město Francie?",
      options: [
        { label: "A) Londýn", value: "a" },
        { label: "B) Paříž", value: "b" },
        { label: "C) Berlín", value: "c" },
        { label: "D) Řím", value: "d" }
      ],
      correctAnswer: "b"
    },
    {
      question: "Jaké je hlavní město Německa?",
      options: [
        { label: "A) Berlín", value: "a" },
        { label: "B) Mnichov", value: "b" },
        { label: "C) Hamburk", value: "c" },
        { label: "D) Frankfurt", value: "d" }
      ],
      correctAnswer: "a"
    },
    {
      question: "Která planeta je nejblíže Slunci?",
      options: [
        { label: "A) Venuše", value: "a" },
        { label: "B) Mars", value: "b" },
        { label: "C) Merkur", value: "c" },
        { label: "D) Země", value: "d" }
      ],
      correctAnswer: "c"
    },
  ];

  currentQuestionIndex = 0;
  totalQuestions = this.questions.length;
  selectedAnswer: string = '';
  isAnswerCorrect: boolean | null = null;
  remainingTime: string = ''; // Nastavte čas, pokud je to potřeba

  ngOnInit() {
    this.loadQuestion();
  }

  loadQuestion() {
    this.selectedAnswer = '';
    this.isAnswerCorrect = null;
  }

  submitAnswer() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.isAnswerCorrect = this.selectedAnswer === currentQuestion.correctAnswer;

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
    if (this.isAnswerCorrect === true && answer === this.questions[this.currentQuestionIndex].correctAnswer) {
      return 'correct-answer';
    } else if (this.isAnswerCorrect === false && answer === this.selectedAnswer) {
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
