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

  avatarCopy: Avatar;

  username = new FormControl<string>("", [Validators.required]);

  constructor() {
    this.avatarCopy = {
      bodyId: 0,
      hatId: 0,
      name: "ahoj",
    }

    this.username.setValue(this.avatarCopy.name, {
      emitEvent: false
    });

    this.username.valueChanges.subscribe(data => {
      if (data != null) {
        this.avatarCopy.name = data;
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
