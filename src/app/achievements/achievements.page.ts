import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.page.html',
  styleUrls: ['./achievements.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule
  ]
})
export class AchievementsPage implements OnInit {
  squares: { svg: string; text: string; expanded: boolean }[] = []; // Přidáme pole s informací, zda je čtverec rozbalený

  constructor() {}

  ngOnInit() {
    // Inicializujeme pole s objekty, které obsahují cestu k SVG, text a stav rozbalení pro každý čtverec
    this.squares = [
      { svg: 'assets/svgs/icon1.svg', text: 'Text for Square 1', expanded: false },
      { svg: 'assets/svgs/icon2.svg', text: 'Text for Square 2', expanded: false },
      { svg: 'assets/svgs/icon3.svg', text: 'Text for Square 3', expanded: false },
      { svg: 'assets/svgs/icon4.svg', text: 'Text for Square 4', expanded: false },
      { svg: 'assets/svgs/icon5.svg', text: 'Text for Square 5', expanded: false },
      { svg: 'assets/svgs/icon6.svg', text: 'Text for Square 6', expanded: false },
      { svg: 'assets/svgs/icon7.svg', text: 'Text for Square 7', expanded: false },
      { svg: 'assets/svgs/icon8.svg', text: 'Text for Square 8', expanded: false },
      { svg: 'assets/svgs/icon9.svg', text: 'Text for Square 9', expanded: false },
      { svg: 'assets/svgs/icon10.svg', text: 'Text for Square 10', expanded: false },
      { svg: 'assets/svgs/icon11.svg', text: 'Text for Square 11', expanded: false },
      { svg: 'assets/svgs/icon12.svg', text: 'Text for Square 12', expanded: false },
      { svg: 'assets/svgs/icon13.svg', text: 'Text for Square 13', expanded: false },
      { svg: 'assets/svgs/icon14.svg', text: 'Text for Square 14', expanded: false },
      { svg: 'assets/svgs/icon15.svg', text: 'Text for Square 15', expanded: false },
      { svg: 'assets/svgs/icon16.svg', text: 'Text for Square 16', expanded: false },
      { svg: 'assets/svgs/icon17.svg', text: 'Text for Square 17', expanded: false },
      { svg: 'assets/svgs/icon18.svg', text: 'Text for Square 18', expanded: false },
      { svg: 'assets/svgs/icon19.svg', text: 'Text for Square 19', expanded: false },
      { svg: 'assets/svgs/icon20.svg', text: 'Text for Square 20', expanded: false },
    ];
  }

  toggleText(index: number) {
    this.squares[index].expanded = !this.squares[index].expanded;
  }
}
