import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButton, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {GameService} from "../../services/game/game.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class LobbyPage implements OnInit {

  constructor(private router: Router, private gameService: GameService) { }

  ngOnInit() {
  }

  onStopGame() {
    this.gameService.stopGame(); // Set gameIsOn to false
    this.router.navigate(['/home']).then(success => {
      if (success) {
        console.log('Navigation to /home was successful!');
      } else {
        console.log('Navigation to /home failed!');
      }
    });
  }
}
