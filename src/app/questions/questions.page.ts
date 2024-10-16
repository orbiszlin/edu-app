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
  history: { action: string; question?: string; answers?: string[] }[] = []; // Historie akcí

  constructor() {}

  ngOnInit() {
    this.loadQuestions(); // Načíst otázky z local storage při inicializaci
  }

  loadQuestions() {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      this.questions = JSON.parse(storedQuestions); // Načtení a parsování otázek z local storage
    }
  }

  saveQuestions() {
    localStorage.setItem('questions', JSON.stringify(this.questions)); // Uložení otázek do local storage
  }

  addQuestion() {
    if (this.newQuestion.trim() && this.newAnswers.every(answer => answer.trim())) {
      // Uložení otázky a odpovědí
      this.questions.push({
        text: this.newQuestion,
        answers: this.newAnswers.slice(),
        showAnswers: false // Zajištění, že odpovědi jsou skryté při přidání
      });

      // Uložení akce do historie
      this.history.push({ action: 'add', question: this.newQuestion, answers: this.newAnswers.slice() });

      // Uložení otázek do local storage
      this.saveQuestions();

      // Vyprázdnění vstupních polí
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
        // Vrátit otázku a odpovědi zpět
        this.newQuestion = lastAction.question || ''; // Zajištění, že bude mít nějakou hodnotu
        this.newAnswers = lastAction.answers ? lastAction.answers.slice() : ['', '', '', '']; // Zajištění, že array nebude undefined
        this.questions.pop(); // Smaž poslední přidanou otázku

        // Uložení otázek do local storage
        this.saveQuestions();
      } else if (lastAction.action === 'toggle') {
        const index = this.questions.findIndex(q => q.text === lastAction.question);
        if (index !== -1) {
          this.questions[index].showAnswers = false; // Zabalit otázku
        }
      }
    } else {
      alert('No previous action to revert to.');
    }
  }

  toggleAnswers(index: number) {
    this.questions[index].showAnswers = !this.questions[index].showAnswers; // Přepnutí zobrazení odpovědí
    // Uložení akce do historie
    this.history.push({ action: 'toggle', question: this.questions[index].text });
  }

  removeQuestion() {
    const selectedQuestionIndex = this.questions.findIndex(q => q.showAnswers); // Zjistit, která otázka je vybrána
    if (selectedQuestionIndex !== -1) {
      // Uložení akce do historie
      this.history.push({
        action: 'remove',
        question: this.questions[selectedQuestionIndex].text,
        answers: this.questions[selectedQuestionIndex].answers
      });
      this.questions.splice(selectedQuestionIndex, 1); // Odstranění otázky

      // Uložení otázek do local storage
      this.saveQuestions();
    } else {
      alert('Please select a question to remove.');
    }
  }

  modifyQuestion() {
    const selectedQuestionIndex = this.questions.findIndex(q => q.showAnswers); // Zjistit, která otázka je vybrána
    if (selectedQuestionIndex !== -1) {
      const questionToModify = this.questions[selectedQuestionIndex];
      this.newQuestion = questionToModify.text; // Naplnění vstupního pole otázky
      this.newAnswers = questionToModify.answers.slice(); // Naplnění odpovědí

      this.questions.splice(selectedQuestionIndex, 1); // Odstranění otázky z listu
      // Uložení akce do historie
      this.history.push({
        action: 'modify',
        question: questionToModify.text,
        answers: questionToModify.answers
      });

      // Uložení otázek do local storage
      this.saveQuestions();
    } else {
      alert('Please select a question to modify.');
    }
  }
}
