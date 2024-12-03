import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HexMapModel} from "../../models/hex-map.model";


@Injectable({
  providedIn: 'root'
})
export class MapDataService {
  private currentMap: HexMapModel | null = null;

  constructor() {
  }

  // Provisional generator of map that fills 'currentMap' with tiles based on tile count seed
  // No Type generation yet
  generateMapData(): Observable<HexMapModel> {
    const tileCount = 5000; // Set to generate N number of tiles

    const hexMap: HexMapModel = {
      id: '01' + Math.floor(Math.random() * tileCount),
      tileCount: tileCount,
      columnsCount: 0,
      rowsCount: 0,
      columns: []
    };

    // Set to get ratios of somewhat 4:3 ratio
    hexMap.columnsCount = Math.ceil(Math.sqrt((tileCount * 4) / 3));
    hexMap.rowsCount = Math.ceil(tileCount / hexMap.columnsCount);

    // Generate dynamically
    for (let col: number = 0; col < hexMap.columnsCount; col++) {
      const column = {
        rows: [] as {
          tile: {
            id: string,
            ownerId: string,
            typeId: string
          };
        }[]
      };

      for (let row: number = 0; row < hexMap.rowsCount; row++) {
        const colPadded: string = col.toString().padStart(3, '0'); // Pad col to 3 digits
        const rowPadded: string = row.toString().padStart(3, '0'); // Pad row to 3 digits
        column.rows.push({
          tile: {
            id: `02${colPadded}${rowPadded}`, // Unique tile ID
            ownerId: '10' + '0001',       // ID of the tile owner
            typeId: '03' + '0001'         // ID for the type of tile
          }
        });
      }

      hexMap.columns.push(column);
    }

    this.currentMap = hexMap;
    return of(hexMap);
  }

}
