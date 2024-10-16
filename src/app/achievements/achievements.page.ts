import { Component } from '@angular/core';
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
export class AchievementsPage  {
  squares: any[] = Array(20).fill(0); // Vytvoříme pole s 20 čtverci
  clickedSquare: number | null = null; // Sledování, který čtverec byl kliknut

  constructor() { }



  toggleText(index: number): void {
    // Přepínání mezi zobrazením a skrytím textu
    if (this.clickedSquare === index) {
      this.clickedSquare = null; // Skryj text, pokud je znovu kliknuto
    } else {
      this.clickedSquare = index; // Nastav kliknutý čtverec
    }
  }
}
