import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonRow,
    IonCol,
    IonGrid,
    IonLabel,
    IonItem,
    IonList,
    IonButton,
    IonInput,
    IonCard,
    IonCardContent,
    IonIcon
  ]
})
export class QuestionsPage implements OnInit {
  newQuestion: string = '';
  newAnswers: string[] = ['', '', '', ''];
  questions: { text: string; answers: string[]; showAnswers: boolean }[] = [];
  history: { action: string; question?: string; answers?: string[] }[] = [];

  constructor() {}

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      this.questions = JSON.parse(storedQuestions);
    }
  }

  saveQuestions() {
    localStorage.setItem('questions', JSON.stringify(this.questions));
  }

  addQuestion() {
    if (this.newQuestion.trim() && this.newAnswers.every(answer => answer.trim())) {
      // Uložení otázky a odpovědí
      this.questions.push({
        text: this.newQuestion,
        answers: this.newAnswers.slice(),
        showAnswers: false
      });

      this.history.push({ action: 'add', question: this.newQuestion, answers: this.newAnswers.slice() });

      this.saveQuestions();

      this.newQuestion = '';
      this.newAnswers = ['', '', '', ''];
    } else {
      alert('Please fill in all fields');
    }
  }

  goBack() {
    const lastAction = this.history.pop();
    if (lastAction) {
      if (lastAction.action === 'add') {
        this.newQuestion = lastAction.question || '';
        this.newAnswers = lastAction.answers ? lastAction.answers.slice() : ['', '', '', ''];
        this.questions.pop();

        // Uložení otázek do local storage
        this.saveQuestions();
      } else if (lastAction.action === 'toggle') {
        const index = this.questions.findIndex(q => q.text === lastAction.question);
        if (index !== -1) {
          this.questions[index].showAnswers = false;
        }
      }
    } else {
      alert('No previous action to revert to.');
    }
  }

  toggleAnswers(index: number) {
    this.questions[index].showAnswers = !this.questions[index].showAnswers;
    this.history.push({ action: 'toggle', question: this.questions[index].text });
  }

  removeQuestion() {
    const selectedQuestionIndex = this.questions.findIndex(q => q.showAnswers);
    if (selectedQuestionIndex !== -1) {
      this.history.push({
        action: 'remove',
        question: this.questions[selectedQuestionIndex].text,
        answers: this.questions[selectedQuestionIndex].answers
      });
      this.questions.splice(selectedQuestionIndex, 1);

      this.saveQuestions();
    } else {
      alert('Please select a question to remove.');
    }
  }

  modifyQuestion() {
    const selectedQuestionIndex = this.questions.findIndex(q => q.showAnswers);
    if (selectedQuestionIndex !== -1) {
      const questionToModify = this.questions[selectedQuestionIndex];
      this.newQuestion = questionToModify.text;
      this.newAnswers = questionToModify.answers.slice();

      this.questions.splice(selectedQuestionIndex, 1);

      this.history.push({
        action: 'modify',
        question: questionToModify.text,
        answers: questionToModify.answers
      });


      this.saveQuestions();
    } else {
      alert('Please select a question to modify.');
    }
  }
}
