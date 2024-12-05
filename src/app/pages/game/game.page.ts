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

  // Define viewport dimensions
  private viewportHeight: number = 0;
  private viewportWidth: number = 0;

  private currentOffsetX: number = 0;
  private currentOffsetY: number = 0;
  private maxOffsetX: number = 0;
  private maxOffsetY: number = 0;

  // Initializes visible hexes
  private visibleColumns: number = 0;
  private visibleRows: number = 0;


  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.clientService.hideMenu() // Hides app component
    return;
  }

  ngAfterViewInit(): void {
    this.clientService.getMapData().subscribe(map => {
      this.mapData = map;
      console.log('mapData \n', map);
      this.img.src = this.baseHex;
      this.img.onload = (): void => {
        this.imageLoaded = true;
        this.calculateVisibleTiles();
        this.calculateMapBounds();
        this.drawHexMap();
      };
      this.img.onerror = (err: string | Event): void => {
        console.error("Error loading SVG: ", err);
      };
    });
  }

  // Functions to calculate which hexes to draw
  private calculateVisibleTiles(): void {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    //Set canvas width and height to window's inner width and height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.viewportWidth = canvas.width;
    this.viewportHeight = canvas.height;

    // Calculate the number of visible columns and rows
    // Gaps between the tiles are needed to be accounted as well
    this.visibleColumns = Math.ceil(this.viewportWidth / (this.hexWidth + this.hexGapX));
    this.visibleRows = Math.ceil(this.viewportHeight / (this.hexHeight + this.hexGapY));
  }

  // Function to calculate max offset to restrict camera movement within the map bounds
  private calculateMapBounds() {
    if (!this.mapData) return;

    // Total map width and height based on hex size, gaps and grid size
    const totalMapWidth: number = this.mapData.columnsCount * (this.hexWidth + this.hexGapX);
    const totalMapHeight: number = this.mapData.columnsCount * (this.hexHeight + this.hexGapY) * 0.75;

    // Set max offsets by subtracting viewport dimension
    this.maxOffsetX = totalMapWidth - this.viewportWidth;
    this.maxOffsetY = totalMapHeight - this.viewportHeight;
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
