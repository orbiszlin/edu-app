import {Injectable} from '@angular/core';
import {Statistic} from "../models/statistics.model";

@Injectable({
  providedIn: 'root'
})
export class PodiumService {

  private statistics: Statistic[] = [];

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.statistics.push(
        {
          points: 25 + i,
          user: {
            id: i,
            username: "tomas",
            email: "neco@orbiszlin.cz",
            password: "string",
            avatar: {
              bodyName: "avatar",
              hatId: 0,
              alias: "ahoj"
            }
          },
        });
    }
  }

  index() {
    return this.statistics;
  }
}
