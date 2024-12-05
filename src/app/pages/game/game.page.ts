import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  private imageLoaded: boolean = false;
  @ViewChild('canvas', {static: false}) canvasRef!: ElementRef<HTMLCanvasElement>;

  // Define hex dimensions
  private hexWidth: number = 135;
  private hexHeight: number = Math.sqrt(3) / 2 * this.hexWidth;
  private hexGapX: number = 7;
  private hexGapY: number = 17;

  private currentOffsetX: number = 0;
  private currentOffsetY: number = 0;

  private viewportHeight: number = 0;
  private viewportWidth: number = 0;


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

  private drawHexMap(): void {
    if (!this.mapData || !this.imageLoaded) {
      console.error("No map data available for drawing.");
      return;
    }

    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

    if (context) {
      const gridWidth: number = this.mapData.columnsCount;
      const gridHeight: number = this.mapData.rowsCount;

      // Clear the canvas before drawing new positions
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Only draw tiles that are within the visible area
      for (let colIdx = 0; colIdx < gridWidth; colIdx++) {
        for (let rowIdx = 0; rowIdx < gridHeight; rowIdx++) {
          // Calculate the tile's position on the canvas
          const posX: number = colIdx * (this.hexWidth + this.hexGapX) + (rowIdx % 2 === 1 ? (this.hexWidth + this.hexGapX) / 2 : 0) + this.currentOffsetX;
          const posY: number = (rowIdx * 3 / 4) * (this.hexHeight + this.hexGapY) + this.currentOffsetY;

          // Check if the tile is within the viewport
          if (
            posX + this.hexWidth > 0 && posX < this.viewportWidth &&
            posY + this.hexHeight > 0 && posY < this.viewportHeight
          ) {
            // Draw the hex tile at the visible position
            context.drawImage(this.img, posX, posY, this.hexWidth, this.hexHeight);
          }
        }
      }
    }
  }
}
