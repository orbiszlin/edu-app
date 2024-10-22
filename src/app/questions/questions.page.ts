import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { IonButton, IonItem, IonInput, IonLabel, IonList, IonContent, IonHeader, IonToolbar, IonTitle, IonRow, IonCol, IonIcon, IonCard, IonCardContent, IonGrid, IonModal, IonButtons } from '@ionic/angular/standalone';
import { Preferences } from '@capacitor/preferences'; // Import pro Preferences

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
  @ViewChild(IonModal) modal!: IonModal; // Reference to the modal

  questionForm!: FormGroup; // Reactive form
  questions: { question: string; answers: string[]; showAnswers: boolean }[] = []; // Questions list
  selectedQuestion: number | null = null; // Selected question
  isEditing: boolean = false; // Editing flag
  private router: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loadQuestions(); // Načtení otázek při inicializaci
    this.initializeForm(); // Inicializace formuláře
    this.loadState(); // Načtení uloženého stavu
  }

  loadQuestions() {
    // Load questions from a static array
    this.questions = [];
  }

  initializeForm() {
    this.questionForm = new FormGroup({ // Inicializace formuláře
      question: new FormControl(""),
      answers: new FormArray([ // Pole pro odpovědi
        new FormControl(""),
        new FormControl(""),
        new FormControl(""),
        new FormControl("")
      ]),
    });
  }

  get answersControls() {
    return (this.questionForm.get('answers') as FormArray).controls as FormControl[]; // Přístup k ovládacím prvkům odpovědí
  }

  goBack() {
    // Navigace na předchozí stránku
    this.router.navigate(['../']);
  }

  selectQuestion(index: number) {
    this.selectedQuestion = index; // Nastavení vybrané otázky
    this.questions[index].showAnswers = !this.questions[index].showAnswers; // Přepnutí viditelnosti odpovědí
  }

  openModal() {
    this.resetForm(); // Reset form before opening
    this.modal.present(); // Open modal
  }

  removeQuestion() {
    if (this.selectedQuestion !== null) {
      this.questions.splice(this.selectedQuestion, 1); // Odstranit vybranou otázku
      this.selectedQuestion = null; // Reset vybrané otázky
    }
  }

  modifyQuestion() {
    if (this.selectedQuestion !== null) {
      const questionToEdit = this.questions[this.selectedQuestion];
      this.questionForm.patchValue({ // Předvyplnění otázky a odpovědí
        question: questionToEdit.question,
        answers: questionToEdit.answers
      });
      this.isEditing = true; // Přepnout do režimu úpravy
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
    if (question.trim() || answers.some((answer: string) => answer.trim())) {
      if (this.isEditing) {
        // Aktualizace existující otázky
        const questionToEdit = this.questions[this.selectedQuestion!];
        questionToEdit.question = question; // Aktualizovat text otázky
        questionToEdit.answers = answers; // Aktualizovat odpovědi
      } else {
        // Přidání nové otázky
        this.questions.push({
          question: question,
          answers: answers,
          showAnswers: false,
        });
      }

      this.saveState(); // Uložit stav po potvrzení
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

  // Uloží aktuální otázky a odpovědi do preferencí
  private async saveState() {
    const state = {
      questions: this.questions, // Uložení aktuálních otázek
    };

    await Preferences.set({
      key: 'questionState',
      value: JSON.stringify(state), // Uložení stavu jako JSON
    });
  }

  // Načte uložený stav z preferencí
  private async loadState() {
    const { value } = await Preferences.get({ key: 'questionState' }); // Načtení stavu

    if (value) {
      const state = JSON.parse(value); // Převod z JSON zpět na objekt
      this.questions = state.questions; // Nastavení otázek z uloženého stavu
    }
  }
}
