import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.page.html',
  styleUrls: ['./achievements.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule
  ]
})
export class AchievementsPage implements OnInit {
  squares: any[] = Array(20).fill(0); // Vytvoříme pole s 20 čtverci

  constructor() { }

  ngOnInit() {
    // Můžeš přidat další logiku, pokud bude potřeba při inicializaci komponenty
  }
}
