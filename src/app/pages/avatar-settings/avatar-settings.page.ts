import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons, IonCol,
  IonContent,
  IonGrid,
  IonHeader, IonInput,
  IonMenuButton, IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-avatar-settings',
  templateUrl: './avatar-settings.page.html',
  styleUrls: ['./avatar-settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonGrid, IonCol, IonRow, IonButton, IonInput]
})
export class AvatarSettingsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
