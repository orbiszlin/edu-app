import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButton, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {Router} from '@angular/router';
import {ClientService} from "../../services/client/client.service";
import {HexMapModel} from "../../models/hex-map.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class HomePage implements OnInit {

  constructor(private router: Router, private clientService: ClientService) { }

  ngOnInit() {
    return;
  }

  startGame(): void {
    this.clientService.hideMenu() // Hides app component

    // Generate new map, save it locally and checkout to game page
    this.clientService.startNewGame().subscribe((map: HexMapModel): void => {
      this.clientService.setMapData(map);
      this.router.navigate(['/game']);

    })
  }
}
