import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Avatar} from "../../models/user.model";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonMenuButton,
  IonModal,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {debounceTime} from "rxjs";
import {addIcons} from "ionicons";
import {createOutline} from "ionicons/icons";
import {AvatarSettingsService} from "../../services/avatar-settings/avatar-settings.service";

@Component({
  selector: 'app-avatar-settings',
  templateUrl: './avatar-settings.page.html',
  styleUrls: ['./avatar-settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonGrid, IonCol, IonRow, IonButton, IonInput, ReactiveFormsModule, IonIcon, IonFab, IonFabButton, IonModal, IonRadioGroup, IonRadio]
})
export class AvatarSettingsPage implements OnInit {


  avatarCopy: Avatar;
  avatarBodyNames = [
    "avatar",
    "orange",
    "blue",
    "purple",
    "pink",
    "light",
  ]

  username = new FormControl<string>("", [Validators.required]);

  constructor(private service: AvatarSettingsService) {
    addIcons({
      createOutline
    })


    this.avatarCopy = service.getAvatarCopy();

    this.username.setValue(this.avatarCopy.alias, {
      emitEvent: false
    });

    this.username.valueChanges.pipe(debounceTime(400)).subscribe(data => {
      if (data != null) {
        this.avatarCopy.alias = data;
      }
    })
  }

  ngOnInit(): void {
    return;
  }

  saveAvatar(): void {
    if (this.username.valid) {
      console.log(this.avatarCopy);
    }
    return;
  }

  setAvatar(ev: CustomEvent): void {
    this.avatarCopy.bodyName = ev.detail.value;
  }


}
