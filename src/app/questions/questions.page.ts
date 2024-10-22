import {Component, ViewChild, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
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
  @ViewChild(IonModal) modal!: IonModal; // Reference na modální okno

  questionForm!: FormGroup; // Reaktivní formulář pro otázky a odpovědi
  questions: { question: string; answers: string[]; showAnswers: boolean }[] = []; // Pole pro otázky
  selectedQuestion: number | null = null; // Index aktuálně vybrané otázky
  isEditing: boolean = false; // Příznak pro kontrolu, zda je formulář v režimu úpravy

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    // Načtení otázek a inicializace formuláře při inicializaci komponenty
    this.loadQuestions();
    this.initializeForm();
  }

  loadQuestions() {
    // Načtení otázek z statického pole (momentálně prázdné, může být změněno na načtení ze služby)
    this.questions = [];
  }

  initializeForm() {
    // Inicializace reaktivního formuláře s poli pro otázku a odpovědi
    this.questionForm = new FormGroup({
      question: new FormControl(""), // Ovládací prvek pro text otázky
      answers: new FormArray([ // Pole ovládacích prvků pro odpovědi
        new FormControl(""),
        new FormControl(""),
        new FormControl(""),
        new FormControl("")
      ]),
    });
  }

  get answersControls() {
    // Získání ovládacích prvků pro odpovědi pro dynamické vytvoření polí
    return (this.questionForm.get('answers') as FormArray).controls as FormControl[];
  }

  goBack() {
    // Implementace logiky pro návrat na předchozí stránku (pokud je potřeba)
  }

  selectQuestion(index: number) {
    // Vybrání otázky a přepnutí viditelnosti odpovědí
    this.selectedQuestion = index;
    this.questions[index].showAnswers = !this.questions[index].showAnswers;
  }

  openModal() {
    this.resetForm(); // Resetovat formulář před otevřením
    this.modal.present(); // Otevřít modální okno pro přidání nebo úpravu otázky
  }

  removeQuestion() {
    // Odebrat vybranou otázku ze seznamu, pokud je nějaká vybraná
    if (this.selectedQuestion !== null) {
      this.questions.splice(this.selectedQuestion, 1); // Odebrat otázku
      this.selectedQuestion = null; // Resetovat vybranou otázku
    }
  }

  modifyQuestion() {
    // Načíst data vybrané otázky do formuláře pro úpravu
    if (this.selectedQuestion !== null) {
      const questionToEdit = this.questions[this.selectedQuestion];
      this.questionForm.patchValue({
        question: questionToEdit.question, // Předvyplnit pole otázky
        answers: questionToEdit.answers // Předvyplnit pole odpovědí
      });
      this.isEditing = true; // Nastavit příznak úpravy na true
      this.modal.present(); // Otevřít modální okno pro úpravu
    }
  }

  cancel() {
    // Zavřít modální okno a resetovat formulář bez uložení změn
    this.modal.dismiss(null, 'cancel');
    this.resetForm();
  }

  confirm() {
    // Zpracovat odeslání formuláře pro přidání nebo aktualizaci otázky
    const {question, answers}: { question: string; answers: string[] } = this.questionForm.value;

    // Zkontrolovat, zda je otázka nebo alespoň jedna odpověď vyplněná
    if (question.trim() || answers.some((answer: string) => answer.trim())) {
      if (this.isEditing) {
        // Pokud je v režimu úpravy, aktualizovat existující otázku
        const questionToEdit = this.questions[this.selectedQuestion!];
        questionToEdit.question = question; // Aktualizovat text otázky
        questionToEdit.answers = answers; // Aktualizovat pole odpovědí
      } else {
        // Pokud se přidává nová otázka, přidat ji do pole otázek
        this.questions.push({
          question: question,
          answers: answers,
          showAnswers: false, // Výchozí viditelnost nastavena na false
        });
      }

      this.resetForm(); // Resetovat formulář po odeslání
      this.modal.dismiss(null, 'confirm'); // Zavřít modální okno
    } else {
      alert('Please fill in at least the question or one answer'); // Upozornění v případě selhání validace
    }
  }

  onWillDismiss(event: Event) {
    // Zpracování události při zavření modálního okna
    const ev = event as CustomEvent;
    if (ev.detail.role === 'confirm') {
      console.log('Confirmed'); // Zpráva do konzole při potvrzení
    }
  }

  resetForm() {
    // Resetovat formulář a příznaky
    this.questionForm.reset(); // Resetovat formulář
    this.isEditing = false; // Nastavit příznak úpravy na false
    this.selectedQuestion = null; // Resetovat vybranou otázku
  }
}
