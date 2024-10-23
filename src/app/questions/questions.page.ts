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
  IonButtons
} from '@ionic/angular/standalone';
import {Preferences} from '@capacitor/preferences'; // Import pro Preferences

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
  @ViewChild(IonModal) modal!: IonModal; // Reference na modalní okno

  questionForm!: FormGroup; // Reaktivní formulář
  questions: { question: string; answers: string[]; showAnswers: boolean }[] = []; // Seznam otázek
  selectedQuestion: number | null = null; // Vybraná otázka
  isEditing: boolean = false; // Příznak pro úpravu otázky
  private router: any;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.loadQuestions(); // Načtení otázek při inicializaci
    this.initializeForm(); // Inicializace formuláře
    this.loadState(); // Načtení uloženého stavu
  }

  loadQuestions() {
    this.questions = [];
  }

  // Inicializace formuláře
  initializeForm() {
    this.questionForm = new FormGroup({
      question: new FormControl(""),
      answers: new FormArray([new FormControl("")]), // Začínáme s jednou odpovědí
    });
  }

  // Přístup k dynamickým kontrolám pro odpovědi
  get answersControls() {
    return (this.questionForm.get('answers') as FormArray).controls as FormControl[];
  }

  // Přidá novou odpověď do formuláře
  addAnswer() {
    const answersArray = this.questionForm.get('answers') as FormArray;
    answersArray.push(new FormControl("")); // Přidá nový kontrolní prvek pro odpověď
  }

  // Odebere odpověď na základě indexu
  removeAnswer(index: number) {
    const answersArray = this.questionForm.get('answers') as FormArray;
    if (answersArray.length > 1) { // Umožňuje odebrat odpověď jen pokud je více než jedna
      answersArray.removeAt(index);
    }
  }

  goBack() {
    // Navigace zpět
    this.router.navigate(['../']);
  }

  selectQuestion(index: number) {
    this.selectedQuestion = index; // Nastavení vybrané otázky
    this.questions[index].showAnswers = !this.questions[index].showAnswers; // Přepnutí viditelnosti odpovědí
  }

  openModal() {
    this.resetForm(); // Resetování formuláře před otevřením modálního okna
    this.modal.present(); // Otevření modálního okna
  }

  removeQuestion() {
    if (this.selectedQuestion !== null) {
      this.questions.splice(this.selectedQuestion, 1); // Odstranění vybrané otázky
      this.selectedQuestion = null; // Reset vybrané otázky

      this.saveState(); // Uložit stav po odstranění otázky
    }
  }

  modifyQuestion() {
    if (this.selectedQuestion !== null) {
      const questionToEdit = this.questions[this.selectedQuestion];

      // Nastavení otázky
      this.questionForm.patchValue({
        question: questionToEdit.question
      });

      // Vyčištění existujících odpovědí ve FormArray a nastavení nových
      const answersArray = this.questionForm.get('answers') as FormArray;
      answersArray.clear(); // Vyčistíme pole odpovědí

      // Dynamicky přidáme všechny odpovědi z vybrané otázky
      questionToEdit.answers.forEach((answer: string) => {
        answersArray.push(new FormControl(answer));
      });

      this.isEditing = true;
      this.modal.present(); // Otevřít modální okno
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel'); // Zavření modálního okna
    this.resetForm(); // Resetování formuláře
  }

  confirm() {
    const {question, answers}: { question: string; answers: string[] } = this.questionForm.value;

    if (this.isEditing && this.selectedQuestion !== null) {
      // Aktualizace existující otázky
      this.questions[this.selectedQuestion] = {question, answers, showAnswers: false};
      this.isEditing = false;
    } else {
      // Přidání nové otázky
      this.questions.push({question, answers, showAnswers: false});
    }

    this.saveState(); // Uložit stav po přidání/aktualizaci otázky
    this.modal.dismiss(null, 'confirm'); // Zavření modálního okna
    this.resetForm(); // Resetování formuláře
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent;
    if (ev.detail.role === 'confirm') {
      this.resetForm(); // Resetování formuláře po potvrzení
    }
  }

  resetForm() {
    this.questionForm.reset(); // Reset formuláře
    (this.questionForm.get('answers') as FormArray).clear(); // Vymazat odpovědi
    (this.questionForm.get('answers') as FormArray).push(new FormControl('')); // Přidat prázdnou odpověď
  }

  saveState() {
    Preferences.set({key: 'questions', value: JSON.stringify(this.questions)}); // Uložení otázek
  }

  async loadState() {
    const {value} = await Preferences.get({key: 'questions'});
    if (value) {
      this.questions = JSON.parse(value); // Načtení otázek
    }
  }
}
