import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonButton, IonButtons,
  IonCol,
  IonContent, IonFooter,
  IonGrid,
  IonHeader, IonInput, IonMenuButton, IonModal,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {PodiumService} from "../../services/podium.service";
import {Statistic} from "../../models/statistics.model";

@Component({
  selector: 'app-podium',
  templateUrl: './podium.page.html',
  styleUrls: ['./podium.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, IonGrid, IonRow, IonCol,
    IonButton, IonButtons, IonInput, IonMenuButton, IonModal, IonFooter
  ]
})
export class PodiumPage implements OnInit {
  isModalOpen = false;
  modalTitle = '';
  statistics: Statistic[] = [];

  constructor(
    private podiumService: PodiumService
  ) {
    this.statistics = podiumService.index();
  }

  ngOnInit() {

  }

  openModal(title: string) {
    this.modalTitle = title;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}


