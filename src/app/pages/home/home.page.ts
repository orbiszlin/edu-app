import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { GameService } from '../../services/game/game.service'; // Adjust the path as necessary

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class HomePage implements OnInit {
  constructor(private router: Router, private gameService: GameService) { }

  ngOnInit() {
  }

  onStartLobby() {
    this.gameService.startGame(); // Set gameIsOn to true
    this.router.navigate(['/lobby']).then(success => {
      if (success) {
        console.log('Navigation to /lobby was successful!');
      } else {
        console.log('Navigation to /lobby failed!');
      }
    }); // Redirect to /lobby
  }
}
