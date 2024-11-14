import { Component, ViewChild, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
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
import { Preferences } from '@capacitor/preferences';

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

  // The form group to manage the question form
  questionForm!: FormGroup;

  // Array holding the list of questions and answers
  questions: { question: string; answers: string[]; showAnswers: boolean }[] = [];

  // Index of the selected question
  selectedQuestion: number | null = null;

  // Flag to track if the page is in edit mode
  isEditing: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // Initialize the form and load the state (questions)
    this.initializeForm();
    this.loadState();
  }

  // Initializes the form group with a question and answers form array
  initializeForm() {
    this.questionForm = new FormGroup({
      question: new FormControl(""),
      answers: new FormArray([new FormControl("")]), // Initially one empty answer
    });
  }

  // Gets the controls of the answers form array
  get answersControls() {
    return (this.questionForm.get('answers') as FormArray).controls as FormControl[];
  }

  // Adds a new answer input field to the form
  addAnswer() {
    const answersArray = this.questionForm.get('answers') as FormArray;
    if (answersArray.length < 4) {
      answersArray.push(new FormControl("")); // Limit answers to 4
    } else {
      alert("You can only add up to 4 answers.");
    }
  }

  // Removes an answer at the specified index
  removeAnswer(index: number) {
    const answersArray = this.questionForm.get('answers') as FormArray;
    if (answersArray.length > 1) {
      answersArray.removeAt(index); // Remove answer at index
      this.validateAnswers(); // Validate after removal
    }
  }

  // Removes an answer with a confirmation prompt
  removeAnswerWithModal(index: number) {
    const answersArray = this.questionForm.get('answers') as FormArray;
    if (answersArray.length > 1 && confirm("Are you sure you want to remove this answer?")) {
      answersArray.removeAt(index); // Remove answer if confirmed
      this.validateAnswers(); // Validate after removal
    }
  }

  // Ensures there is at least one answer control and removes empty ones
  validateAnswers() {
    const answersArray = this.questionForm.get('answers') as FormArray;
    answersArray.controls.forEach((control, index) => {
      if (!control.value || control.value.trim() === "") {
        answersArray.removeAt(index); // Remove empty answer controls
      }
    });

    // Ensure at least one empty answer control remains for user convenience
    if (answersArray.length === 0) {
      answersArray.push(new FormControl("")); // Add a new answer control if empty
    }
  }

  // Selects a question to toggle the visibility of its answers
  selectQuestion(index: number) {
    this.selectedQuestion = index;
    this.questions[index].showAnswers = !this.questions[index].showAnswers; // Toggle answers visibility
  }

  // Opens the modal to add a new question
  openModal() {
    this.resetForm(); // Reset form to default state
    this.modal.present(); // Show modal
  }

  // Removes the selected question from the list
  removeQuestion() {
    if (this.selectedQuestion !== null) {
      this.questions.splice(this.selectedQuestion, 1); // Remove selected question
      this.selectedQuestion = null; // Deselect question
      this.saveState(); // Save updated state
    }
  }

  // Prepares the form for editing the selected question
  modifyQuestion() {
    if (this.selectedQuestion !== null) {
      const questionToEdit = this.questions[this.selectedQuestion];
      this.questionForm.patchValue({
        question: questionToEdit.question
      });

      const answersArray = this.questionForm.get('answers') as FormArray;
      answersArray.clear();
      questionToEdit.answers.forEach((answer: string) => {
        answersArray.push(new FormControl(answer)); // Populate the form with existing answers
      });

      this.isEditing = true; // Mark the form as being in edit mode
      this.modal.present(); // Show modal for editing
    }
  }

  // Confirms the question creation or modification
  confirm() {
    this.validateAnswers(); // Validate answers before confirming

    const questionData = this.questionForm.value;
    if (this.isEditing) {
      if (this.selectedQuestion !== null) {
        // Edit the selected question
        this.questions[this.selectedQuestion] = {
          question: questionData.question,
          answers: questionData.answers,
          showAnswers: false
        };
      }
    } else {
      // Add a new question
      this.questions.push({
        question: questionData.question,
        answers: questionData.answers,
        showAnswers: false
      });
    }
    this.saveState(); // Save updated questions state
    this.modal.dismiss(); // Close the modal
    this.isEditing = false; // Reset editing flag
  }

  // Resets the form for adding a new question
  resetForm() {
    this.questionForm.reset(); // Reset form values
    const answersArray = this.questionForm.get('answers') as FormArray;
    answersArray.clear(); // Clear answers array
    answersArray.push(new FormControl("")); // Add a new empty answer control
  }

  // Closes the modal without saving
  cancel() {
    this.modal.dismiss(); // Close modal
    this.resetForm(); // Reset form to initial state
  }

  // Loads the state from local storage (or Preferences)
  async loadState() {
    const { value } = await Preferences.get({ key: 'questions' });
    if (value) {
      this.questions = JSON.parse(value); // Parse and load stored questions
    }
  }

  // Saves the state to local storage (or Preferences)
  async saveState() {
    await Preferences.set({ key: 'questions', value: JSON.stringify(this.questions) });
  }

  // Optional function to handle modal dismissal if needed
  onWillDismiss(event: any) {
    // Handle modal dismissal events
  }

  // Placeholder for a method to navigate back to the previous page
  goBack() {
    // Implement navigation logic to go back to the previous page
    }
}
