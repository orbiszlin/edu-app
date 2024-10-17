import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';
import {
  IonButton,
  IonItem,
  IonInput,
  IonLabel,
  IonList,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonRow,
  IonCol,
  IonIcon,
  IonCard,
  IonCardContent,
  IonGrid,
  IonModal,
  IonButtons,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonModal,
    IonButton,
    IonItem,
    IonInput,
    IonLabel,
    IonList,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonRow,
    IonCol,
    IonIcon,
    IonCard,
    IonCardContent,
    IonGrid,
    IonButtons,
  ],
})
export class QuestionsPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal; // Odkaz na modální okno

  questionForm!: FormGroup; // Reaktivní formulář
  questions: { text: string; answers: string[]; showAnswers: boolean }[] = []; // Seznam otázek
  selectedQuestion: number | null = null; // Vybraná otázka
  isEditing: boolean = false; // Flag pro editaci

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Načíst otázky při inicializaci
    this.loadQuestions();
    // Inicializace formuláře
    this.initializeForm();
  }

  loadQuestions() {
    // Načíst otázky ze statického pole
    this.questions = [];
  }

  initializeForm() {
    this.questionForm = this.fb.group({
      question: [''], // Pole pro otázku
      answers: this.fb.array([this.fb.control(''), this.fb.control(''), this.fb.control(''), this.fb.control('')]), // Pole pro odpovědi
    });
  }

  get answersControls() {
    return (this.questionForm.get('answers') as FormArray).controls; // Přístup k ovládacím prvkům odpovědí
  }

  goBack() {
    // Zatím nic neděláme, můžeš přidat logiku později
  }

  selectQuestion(index: number) {
    // Vyber otázku a přepni viditelnost odpovědí
    this.selectedQuestion = index;
    this.questions[index].showAnswers = !this.questions[index].showAnswers;
  }

  openModal() {
    this.resetForm(); // Resetovat formulář před otevřením
    this.modal.present(); // Otevřít modální okno
  }

  removeQuestion() {
    if (this.selectedQuestion !== null) {
      this.questions.splice(this.selectedQuestion, 1); // Odebrat vybranou otázku
      this.selectedQuestion = null; // Resetovat vybranou otázku
    }
  }

  modifyQuestion() {
    if (this.selectedQuestion !== null) {
      const questionToEdit = this.questions[this.selectedQuestion];
      this.questionForm.patchValue({
        question: questionToEdit.text, // Předvyplnit otázku
        answers: questionToEdit.answers // Předvyplnit odpovědi
      });
      this.isEditing = true; // Přepnout na režim úpravy
      this.modal.present(); // Otevřít modální okno
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel'); // Zavřít modální okno bez uložení
    this.resetForm(); // Resetovat formulář
  }

  confirm() {
    const { question, answers }: { question: string; answers: string[] } = this.questionForm.value; // Explicitní typy

    // Kontrola, zda je otázka nebo alespoň jedna odpověď vyplněná
    if (question.trim() || answers.some((answer: string) => answer.trim())) { // Přidání typu pro answer
      if (this.isEditing) {
        // Aktualizace existující otázky
        const questionToEdit = this.questions[this.selectedQuestion!];
        questionToEdit.text = question; // Aktualizovat text otázky
        questionToEdit.answers = answers; // Aktualizovat odpovědi
      } else {
        // Přidání nové otázky
        this.questions.push({
          text: question,
          answers: answers,
          showAnswers: false,
        });
      }

      this.resetForm(); // Resetovat formulář
      this.modal.dismiss(null, 'confirm'); // Zavřít modální okno
    } else {
      alert('Please fill in at least the question or one answer'); // Kontrola, zda jsou pole vyplněna
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent;
    if (ev.detail.role === 'confirm') {
      console.log('Confirmed');
    }
  }

  resetForm() {
    this.questionForm.reset(); // Resetovat formulář
    this.isEditing = false; // Nastavit režim úpravy na false
    this.selectedQuestion = null; // Resetovat vybranou otázku
  }
}
