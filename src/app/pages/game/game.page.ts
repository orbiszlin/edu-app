import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
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
  @ViewChild('canvas', {static: false}) canvasRef!: ElementRef<HTMLCanvasElement>;
  mapData!: MapData;

  constructor(private mapDataService: MapDataService) {
  }

  ngOnInit() {
    return 0;
  }

  ngAfterViewInit() {
    this.mapDataService.getMapData().subscribe(data => {
      this.mapData = data;
      console.log(this.mapData);

      this.drawSvgOnCanvas();
    })
  }

  drawSvgOnCanvas() {
    console.log(this.canvasRef);
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

    if (context) {
      const tileSize = 50; // The size of the hexagon tile (width from one flat side to the other)
      const hexHeight = Math.sqrt(3) / 2 * tileSize; // Height of the hexagon

      // Define gaps for horizontal (x) and vertical (y) spacing
      const gapX = 5; // Horizontal gap between tiles
      const gapY = 0;  // Vertical gap set to 0 (or any small value) to remove/reduce the bottom gap

      const gridWidth = Math.max(...this.mapData.tiles.map(t => t.position.x)) + 1;
      const gridHeight = Math.max(...this.mapData.tiles.map(t => t.position.y)) + 1;

      // Adjust canvas size to account for the hex grid with custom gaps
      canvas.width = (tileSize + gapX) * gridWidth + tileSize / 2; // Staggered horizontal position with gap
      canvas.height = (hexHeight + gapY) * gridHeight + hexHeight / 2; // Minimal vertical gap

      const img = new Image();
      img.src = this.baseHex;

      img.onload = (): void => {
        this.mapData.tiles.forEach(tile => {
          const { x, y } = tile.position;

          // Calculate x and y positions for hexagonal tiles, with separate horizontal and vertical gaps
          const posX = x * (tileSize + gapX) + (y % 2 === 1 ? (tileSize + gapX) / 2 : 0); // Staggered horizontal position
          const posY = y * (hexHeight + gapY); // Vertical position with minimal or no gap

          // Draw hex tile
          context.drawImage(img, posX, posY, tileSize, tileSize);
        });
      };

      img.onerror = (err: string | Event): void => {
        console.error("Error loading SVG: ", err);
      };
    }
  }
}
