import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormGroup, FormArray, FormControl, FormBuilder} from '@angular/forms';
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
import { Preferences } from '@capacitor/preferences'; // Import for Preferences

/**
 * Component for managing questions and answers.
 */
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
  @ViewChild(IonModal) modal!: IonModal; // Reference to the modal window

  /** Reactive form for questions and answers */
  questionForm!: FormGroup;

  /** List of questions in the application */
  questions: { question: string; answers: string[]; showAnswers: boolean }[] = [];

  /** Index of the currently selected question */
  selectedQuestion: number | null = null;

  /** Flag indicating whether an existing question is being edited */
  isEditing: boolean = false;

  /**
   * Constructor for the component.
   * @param fb - Instance of FormBuilder for managing forms
   */
  constructor(private fb: FormBuilder) {}

  /**
   * Initializes the component and loads the saved state.
   */
  ngOnInit() {
    this.initializeForm(); // Initialize the form
    this.loadState(); // Load the saved state
  }

  /**
   * Initializes the form with one empty answer.
   */
  initializeForm() {
    this.questionForm = new FormGroup({
      question: new FormControl(""), // Empty question field
      answers: new FormArray([new FormControl("")]), // Start with one answer
    });
  }

  /**
   * Accesses the dynamic controls for answers.
   * @returns Answer controls as FormControl[]
   */
  get answersControls() {
    return (this.questionForm.get('answers') as FormArray).controls as FormControl[];
  }

  /**
   * Adds a new answer to the form.
   */
  addAnswer() {
    const answersArray = this.questionForm.get('answers') as FormArray;
    answersArray.push(new FormControl("")); // Add a new control for an answer
  }

  /**
   * Removes an answer based on the index.
   * @param index - Index of the answer to be removed.
   */
  removeAnswer(index: number) {
    const answersArray = this.questionForm.get('answers') as FormArray;
    if (answersArray.length > 1) { // Allows removal only if there is more than one answer
      answersArray.removeAt(index);
    }
  }

  /**
   * Selects a question to edit and toggles the visibility of its answers.
   * @param index - Index of the selected question.
   */
  selectQuestion(index: number) {
    this.selectedQuestion = index; // Set the selected question
    this.questions[index].showAnswers = !this.questions[index].showAnswers; // Toggle visibility of answers
  }

  /**
   * Opens the modal window for adding or editing a question.
   */
  openModal() {
    this.resetForm(); // Reset the form before opening the modal
    this.modal.present(); // Open the modal window
  }

  /**
   * Removes the selected question from the list.
   */
  removeQuestion() {
    if (this.selectedQuestion !== null) {
      this.questions.splice(this.selectedQuestion, 1); // Remove the selected question
      this.selectedQuestion = null; // Reset the selected question
      this.saveState(); // Save the state after removing the question
    }
  }

  /**
   * Modifies an existing question by pre-filling the form with its details.
   */
  modifyQuestion() {
    if (this.selectedQuestion !== null) {
      const questionToEdit = this.questions[this.selectedQuestion];

      // Set the question in the form
      this.questionForm.patchValue({
        question: questionToEdit.question
      });

      // Clear existing answers in the FormArray and set new ones
      const answersArray = this.questionForm.get('answers') as FormArray;
      answersArray.clear(); // Clear the answers array

      // Dynamically add all answers from the selected question
      questionToEdit.answers.forEach((answer: string) => {
        answersArray.push(new FormControl(answer));
      });

      this.isEditing = true; // Set editing flag to true
      this.modal.present(); // Open the modal window
    }
  }

  /**
   * Cancels the modal operation and resets the form.
   */
  cancel() {
    this.modal.dismiss(null, 'cancel'); // Close the modal window
    this.resetForm(); // Reset the form
  }

  /**
   * Confirms the action and either adds a new question or updates an existing one.
   */
  confirm() {
    const { question, answers }: { question: string; answers: string[] } = this.questionForm.value;

    if (this.isEditing && this.selectedQuestion !== null) {
      // Update the existing question
      this.questions[this.selectedQuestion] = { question, answers, showAnswers: false };
      this.isEditing = false;
    } else {
      // Add a new question
      this.questions.push({ question, answers, showAnswers: false });
    }

    this.saveState(); // Save the state after adding/updating a question
    this.modal.dismiss(null, 'confirm'); // Close the modal window
    this.resetForm(); // Reset the form
  }

  /**
   * Handles the event when the modal is about to dismiss.
   * @param event - The dismiss event.
   */
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent;
    if (ev.detail.role === 'confirm') {
      this.resetForm(); // Reset the form after confirmation
    }
  }

  /**
   * Resets the form to its initial state, clearing all inputs.
   */
  resetForm() {
    this.questionForm.reset(); // Reset the form
    const answersArray = this.questionForm.get('answers') as FormArray;
    answersArray.clear(); // Clear answers
    answersArray.push(new FormControl('')); // Add an empty answer
  }

  /**
   * Saves the current state of the questions to preferences.
   */
  saveState() {
    Preferences.set({ key: 'questions', value: JSON.stringify(this.questions) }); // Save questions
  }

  /**
   * Loads the saved state of the questions from preferences.
   */
  async loadState() {
    const { value } = await Preferences.get({ key: 'questions' });
    if (value) {
      this.questions = JSON.parse(value); // Load questions
    }
  }
}
