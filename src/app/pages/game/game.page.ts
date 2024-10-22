import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {MapData, MapDataService} from 'src/app/services/map-data/map-data.service'

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GamePage implements OnInit, AfterViewInit {
  baseHex: string = "assets/map-tiles/map-tile-hex.svg";
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  mapData!: MapData;

  constructor(private mapDataService: MapDataService) { }

  ngOnInit() {
    this.mapDataService.getMapData().subscribe(data => {
      this.mapData = data;
      console.log(this.mapData);
    })
  }

  ngAfterViewInit() {
    this.drawSvgOnCanvas();
  }

  drawSvgOnCanvas() {
    console.log(this.canvasRef)
  }
}
