import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Avatar, User} from "../../models/user.model";
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
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-avatar-settings',
  templateUrl: './avatar-settings.page.html',
  styleUrls: ['./avatar-settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonGrid, IonCol, IonRow, IonButton, IonInput, ReactiveFormsModule]
})
export class AvatarSettingsPage implements OnInit {

  user: User;
  avatarCopy: Avatar;

  username = new FormControl<string>("", [Validators.required]);

  constructor() {
    this.user = {
      id: 0,
      username: "lojza",
      email: "neco@orbiszlin.cz",
      password: "string",
      avatar: {
        bodyId: 0,
        hatId: 0,
        alias: "ahoj",
      }
    }
    this.avatarCopy = this.user.avatar;

    this.username.setValue(this.avatarCopy.alias, {
      emitEvent: false
    });

    this.username.valueChanges.pipe(debounceTime(400)).subscribe(data => {
      if (data != null) {
        this.avatarCopy.alias = data;
      }
      console.log(data);
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
