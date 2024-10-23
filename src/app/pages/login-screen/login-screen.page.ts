import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.page.html',
  styleUrls: ['./login-screen.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonGrid, IonCol, IonRow, IonAlert]
})
export class LoginScreenPage implements OnInit {
  public alertButtons = ['Action'];
  public alertInputs = [
    {
      type: 'number',
      placeholder: 'Code',
      min: 1,
      max: 6,
    },
  ];



  constructor() { }

  ngOnInit() {
  }

}

