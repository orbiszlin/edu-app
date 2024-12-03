import { Component, OnInit } from '@angular/core';
import { AchievementsService } from './service/achievements.service';  // Fixed import service
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Achievement} from "../../models/achievemets.model";


@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.page.html',
  styleUrls: ['./achievements.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar
  ]
})
export class AchievementsPage implements OnInit {
  squares:Achievement[] = [];


  clickedSquare: number | null = null;  // To track which square was clicked

  constructor(private achievementsService: AchievementsService) {}  // Dependence on the service

  ngOnInit() {
    // Retrieve a list of achievements from the service
    this.squares = this.achievementsService.getAchievements();
  }

  toggleText(index: number) {
    // Call the service to toggle the 'expanded' state for the selected achievement
    this.achievementsService.toggleAchievementExpansion(index);
    this.squares = this.achievementsService.getAchievements();  // Aktualizujeme stav po změně
  }
}

