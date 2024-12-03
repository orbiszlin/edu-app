import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnswersService } from '../../services/answers.service';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.page.html',
  styleUrls: ['./answers.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonRadio,
    IonItem,
    IonLabel,
    IonRadioGroup,
    IonList,
    IonGrid,
    IonRow,
    IonCol,
    IonText
  ]
})
export class AnswersPage implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex = 0;
  totalQuestions = 0;
  selectedAnswer: string = '';
  isAnswerCorrect: boolean | null = null;
  answerFeedback: string | null = null;
  remainingTime: string = ''; // Lze využít pro časový limit

  constructor(private answService: AnswersService) {}

  ngOnInit() {
    this.initializeQuiz();
  }

  /**
   * Inicializace kvízu: načtení otázek a příprava první otázky.
   */
  initializeQuiz() {
    this.questions = this.answService.getQuestions();
    this.totalQuestions = this.questions.length;
    this.loadQuestion();
  }

  /**
   * Načtení aktuální otázky a reset výchozích hodnot pro odpověď.
   */
  loadQuestion() {
    this.selectedAnswer = '';
    this.isAnswerCorrect = null;
    this.answerFeedback = null;
  }

  /**
   * Odeslání odpovědi, vyhodnocení a zobrazení zpětné vazby.
   */
  submitAnswer() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;

    this.isAnswerCorrect = this.selectedAnswer === correctAnswer;

    this.answerFeedback = this.isAnswerCorrect
      ? 'Správná odpověď!'
      : `Špatná odpověď. Správná odpověď je ${this.getCorrectAnswerLabel()}.`;

    setTimeout(() => {
      this.moveToNextQuestion();
    }, 1500); // Zpoždění pro zobrazení zpětné vazby
  }

  /**
   * Posun na další otázku nebo ukončení kvízu, pokud byl poslední dotaz.
   */
  moveToNextQuestion() {
    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      this.currentQuestionIndex++;
      this.loadQuestion();
    } else {
      this.endQuiz();
    }
  }

  /**
   * Vrátí CSS třídu pro odpověď na základě její správnosti.
   * @param answer Odpověď, která se vyhodnocuje
   */
  getAnswerClass(answer: string): string {
    if (this.isAnswerCorrect === null) {
      return ''; // Odpověď zatím nebyla vyhodnocena
    }
    if (this.isAnswerCorrect && answer === this.questions[this.currentQuestionIndex].correctAnswer) {
      return 'correct-answer'; // Správná odpověď
    }
    if (!this.isAnswerCorrect && answer === this.selectedAnswer) {
      return 'incorrect-answer'; // Špatná odpověď
    }
    return ''; // Žádná speciální třída
  }

  /**
   * Vrátí popisek správné odpovědi.
   */
  getCorrectAnswerLabel(): string {
    const correctOption = this.questions[this.currentQuestionIndex]?.options.find(
      option => option.value === this.questions[this.currentQuestionIndex].correctAnswer
    );
    return correctOption ? correctOption.label : '';
  }

  /**
   * Akce při ukončení kvízu (lze rozšířit o logiku pro zobrazení výsledků).
   */
  endQuiz() {
    console.log('Konec kvízu.');
    // Místo pro logiku při ukončení kvízu, např. navigace na jinou stránku
  }
}
