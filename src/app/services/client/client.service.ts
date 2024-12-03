import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, switchMap} from "rxjs";
import {MapDataService} from "../map-data/map-data.service";
import {HexMapModel} from '../../models/hex-map.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private hexMap: HexMapModel | undefined;
  public showMenuSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  showMenu$: Observable<boolean> = this.showMenuSubject.asObservable();

  constructor(private mapDataService: MapDataService) {
  }

  hideMenu(): void {
    this.showMenuSubject.next(true);
  }

  showMenu(): void {
    this.showMenuSubject.next(false);
  }

  // Request a new map from the server simulator
  startNewGame(): Observable<HexMapModel> {
    return this.mapDataService.generateMapData().pipe(
      switchMap((map: HexMapModel): Observable<HexMapModel> => {
        this.setMapData(map); // Save the map locally
        return of(map);       // Return the new map as an observable
      })
    )
  }

  // Save map locally
  setMapData(map: HexMapModel) {
    this.hexMap = map;
  }


}
