import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameIsOnSubject = new BehaviorSubject<boolean>(false);
  gameIsOn$ = this.gameIsOnSubject.asObservable();

  constructor() { }

  startGame() {
    this.gameIsOnSubject.next(true); // Notify subscribers that the game is on
  }

  stopGame() {
    this.gameIsOnSubject.next(false); // Notify subscribers that the game is off
  }
}
