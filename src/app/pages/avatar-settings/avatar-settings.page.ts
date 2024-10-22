import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Avatar} from "../../models/user.model";
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
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonGrid, IonCol, IonRow, IonButton, IonInput, ReactiveFormsModule]
})
export class AvatarSettingsPage implements OnInit {

  avatar_copy: Avatar;

  username = new FormControl<string>("", [Validators.required]);

  constructor() {
    this.avatar_copy = {
      body_id: 0,
      hat_id: 0,
      name: "ahoj",
    }

    this.username.setValue(this.avatar_copy.name, {
      emitEvent: false
    });

    this.username.valueChanges.subscribe(data => {
      if (data != null) {
        this.avatar_copy.name = data;
      }
    })
  }

  ngOnInit(): void {
    return;
  }

  saveAvatar(): void {
    if (this.username.valid) {
      console.log(this.username.value)
    }
    return;
  }


}
