import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

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
  private mapDataJson = './assets/map-data.json';
  constructor(private http: HttpClient) { }

  getMapData(): Observable<MapData> {
    return this.http.get<MapData>(this.mapDataJson);
  }
}
