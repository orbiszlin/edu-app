import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface MapData {
  mapID: number;                     // Unique identifier for the map
  tileCount: number;                 // Total number of tiles
  tiles: Tile[];                     // Array of tile objects
}

export interface Tile {
  tileId: number;                    // Unique identifier for the tile
  ownerId: number;                   // Identifier for the owner of the tile
  typeId: number;                    // Type identifier to reference the tile's type
  position: Position;                // Position object containing x and y coordinates
}

export interface Position {
  x: number;                         // X coordinate of the tile
  y: number;                         // Y coordinate of the tile
}

@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  constructor() {}

  // Method to generate dynamic map data with N tiles
  getMapData(): Observable<MapData> {
    return this.generateMapData(); // Directly return the observable from the generate function
  }

  // Private method to generate map data
  private generateMapData(): Observable<MapData> {
    const tileCount = 1000; // Adjust for the number of tiles generated
    const mapID = Math.floor(Math.random() * 1000); // Generate a random map ID
    const tiles: Tile[] = [];

    // Set width and height ratios based on somewhat 3:4 aspect ratio
    const gridWidth = Math.ceil(Math.sqrt((tileCount * 3) / 4)); // Calculated based on the ratio
    const gridHeight = Math.ceil(tileCount / gridWidth); // Calculate the height based on tileCount


    // Generate the tiles dynamically
    for (let i = 0; i < tileCount; i++) {
      const tile: Tile = {
        tileId: i + 1, // Tile ID starting from 1
        ownerId: Math.floor(Math.random() * 10), // Random owner ID between 0 and 9
        typeId: Math.floor(Math.random() * 5),   // Random type ID between 0 and 4
        position: {
          x: i % gridWidth, // X coordinate based on index and grid width
          y: Math.floor(i / gridWidth) // Y coordinate based on index and grid height
        }
      };
      tiles.push(tile);
    }

    const mapData: MapData = {
      mapID,
      tileCount,
      tiles
    };

    // Return the generated map data as an Observable
    return of(mapData);
  }
}
