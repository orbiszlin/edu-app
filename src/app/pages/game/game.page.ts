import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AfterViewInit} from "@angular/core";
import {FormsModule} from '@angular/forms';
import {IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {ClientService} from "../../services/client/client.service";
import {HexMapModel} from "../../models/hex-map.model";

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GamePage implements OnInit, AfterViewInit {
  baseHex: string = 'assets/map-tiles/map-tile-hex.svg';
  private mapData: HexMapModel | undefined;

  private img: HTMLImageElement = new Image();


  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    return;
  }

  ngAfterViewInit(): void {
    this.clientService.getMapData().subscribe(map => {
      this.mapData = map;
      console.log('mapData \n', map);
      this.img.src = this.baseHex;
      this.img.onerror = (err: string | Event): void => {
        console.error("Error loading SVG: ", err);
      }
    })
  }

}
