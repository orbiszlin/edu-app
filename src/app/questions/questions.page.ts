import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MyService } from '../services/my-service.service'; // Importujeme službu
import { QuestionModel } from '../models/questions.model'; // Importujeme model otázek
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
  IonButtons, IonToggle
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
  standalone: true,
  imports: [
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
    IonToggle
  ],
})
export class QuestionsPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  // Definice seznamu otázek podle modelu QuestionModel
  questions: QuestionModel[] = [];

  // Formulář pro otázky
  questionForm!: FormGroup;

  // Index vybrané otázky
  selectedQuestion: number | null = null;

  // Flag pro režim úpravy
  isEditing: boolean = false;

  constructor(private fb: FormBuilder, private myService: MyService) { }

  ngOnInit() {
    // Inicializace formuláře a načtení stavu
    this.initializeForm();
    this.loadState();
  }

  /**
   * Inicializuje formulář pro zadávání nové otázky a odpovědí.
   * Vytvoří prázdný formulář s jednou odpovědí.
   */
  initializeForm() {
    this.questionForm = new FormGroup({
      question: new FormControl(""),
      answers: new FormArray([new FormControl("")]), // Jedna prázdná odpověď na začátku
    });
  }

  /**
   * Získá pole všech odpovědí jako FormControl[].
   * Umožňuje přístup k jednotlivým odpovědím formuláře.
   */
  get answersControls() {
    return (this.questionForm.get('answers') as FormArray).controls as FormControl[];
  }

  /**
   * Přidá novou prázdnou odpověď do formuláře.
   * Zavolá službu pro přidání odpovědi.
   */
  addAnswer() {
    this.myService.addAnswer(this.questionForm);
  }

  /**
   * Odstraní odpověď na zadaném indexu.
   * Zavolá službu pro odstranění odpovědi.
   * @param index - Index odpovědi, která bude odstraněna.
   */
  removeAnswer(index: number) {
    this.myService.removeAnswer(this.questionForm, index);
  }

  /**
   * Zobrazuje dialog pro potvrzení odstranění odpovědi.
   * Pokud uživatel potvrdí odstranění, zavolá metodu removeAnswer.
   * @param index - Index odpovědi, která bude odstraněna.
   */
  removeAnswerWithModal(index: number) {
    if (confirm("Are you sure you want to remove this answer?")) {
      this.removeAnswer(index); // Odstraní odpověď, pokud je potvrzeno
    }
  }

  /**
   * Vybere otázku a přepne zobrazení odpovědí (zobrazení/skrytí).
   * @param index - Index otázky, kterou uživatel vybere.
   */
  selectQuestion(index: number) {
    this.selectedQuestion = index;
    this.questions[index].showAnswers = !this.questions[index].showAnswers; // Přepínání zobrazení odpovědí
  }

  /**
   * Otevře modal pro přidání nové otázky.
   * Resetuje formulář pro přidání nové otázky.
   */
  openModal() {
    this.myService.resetForm(this.questionForm); // Reset formuláře
    this.modal.present(); // Zobrazení modalu
  }

  /**
   * Odstraní vybranou otázku.
   * Zavolá službu pro odstranění otázky a následně uloží stav.
   */
  removeQuestion() {
    this.myService.removeQuestion(this.selectedQuestion, this.questions); // Zavolání služby pro odstranění otázky
    this.selectedQuestion = null; // Zrušení výběru otázky
    this.saveState(); // Uložení stavu
  }

  /**
   * Příprava formuláře pro úpravu vybrané otázky.
   * Pokud je otázka vybrána, naplní formulář existujícími hodnotami.
   */
  modifyQuestion() {
    if (this.selectedQuestion !== null) {
      this.myService.modifyQuestion(this.questionForm, this.selectedQuestion, this.questions); // Zavolání služby pro úpravu otázky
      this.isEditing = true; // Nastavení režimu úpravy
      this.modal.present(); // Zobrazení modalu pro úpravu
    }
  }

  /**
   * Potvrzení přidání nebo úpravy otázky.
   * Validuje odpovědi a přidá/aktualizuje otázku v seznamu.
   */
  confirm() {
    this.myService.validateAnswers(this.questionForm); // Validace odpovědí
    this.myService.confirm(this.questionForm, this.questions, this.selectedQuestion, this.isEditing); // Zavolání služby pro potvrzení
    this.saveState(); // Uložení stavu
    this.modal.dismiss(); // Zavření modalu
    this.isEditing = false; // Reset režimu úpravy
  }

  /**
   * Zavře modal bez uložení změn.
   * Resetuje formulář pro novou otázku.
   */
  cancel() {
    this.modal.dismiss(); // Zavření modalu
    this.myService.resetForm(this.questionForm); // Reset formuláře
  }

  /**
   * Načte stav otázek ze služby (například z localStorage nebo jiného úložiště).
   * Nastaví seznam otázek podle uložených dat.
   */
  async loadState() {
    this.questions = await this.myService.loadState(); // Zavolání služby pro načtení stavu
  }

  /**
   * Uloží aktuální stav otázek do služby.
   * Uloží otázky (například do localStorage nebo jiného úložiště).
   */
  async saveState() {
    await this.myService.saveState(this.questions); // Zavolání služby pro uložení stavu
  }

  /**
   * Funkce pro zpracování události zavření modalu.
   * Může být použita pro další logiku před zavřením modalu.
   * @param event - Událost zavření modalu.
   */
  onWillDismiss(event: any) {
    console.log('Modal will be dismissed', event);
  }

  /**
   * Funkce pro návrat na předchozí stránku.
   * Zavolá metodu window.history.back() pro návrat na předchozí stránku v historii prohlížeče.
   */
  goBack() {
    window.history.back(); // Funkce pro návrat zpět
  }
}
