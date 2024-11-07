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
  squares: {
    title: string;
    svg: string; text: string; expanded: boolean }[] = [];
  clickedSquare: number | null = null; // To track the clicked square

  constructor() {}

  ngOnInit() {
    // Initialize the array with objects for each square
    this.squares = [
      { svg: 'assets/svg/icon1.svg', title: 'Game Winner', text: 'Win the game', expanded: false },
      { svg: 'assets/svg/icon2.svg', title: 'Field Stealer', text: 'Steal your opponent\'s field', expanded: false },
      { svg: 'assets/svg/icon3.svg', title: 'Field Conqueror', text: 'Acquire blank field', expanded: false },
      { svg: 'assets/svg/icon4.svg', title: 'Master', text: 'Win 5 games in a row', expanded: false },
      { svg: 'assets/svg/icon5.svg', title: 'Destroyer', text: 'Steal from your opponents 50 times ', expanded: false },
      { svg: 'assets/svg/icon6.svg', title: 'Row Master', text: 'Acquire 10 fields in a row', expanded: false },
      { svg: 'assets/svg/icon7.svg', title: 'Veteran Winner', text: 'Win 25 games', expanded: false },
      { svg: 'assets/svg/icon8.svg', title: 'Top Answerer', text: 'Most questions answered', expanded: false },
      { svg: 'assets/svg/icon9.svg', title: 'Center Conqueror', text: 'Acquire center of the map', expanded: false },
      { svg: 'assets/svg/icon10.svg', title: 'Field Collector', text: 'Acquire 500 fields', expanded: false },
      { svg: 'assets/svg/icon11.svg', title: 'Champion', text: 'Became best player 10 times', expanded: false },
      { svg: 'assets/svg/icon12.svg', title: 'Mystery Gift', text: 'Acquire mystery gift', expanded: false },
      { svg: 'assets/svg/icon13.svg', title: 'Ultimate Winner', text: 'Win 100 games', expanded: false },
      { svg: 'assets/svg/icon14.svg', title: 'Silent Genius', text: 'All question answered', expanded: false },
      { svg: 'assets/svg/icon15.svg', title: 'Mountain Conqueror', text: 'Acquire all mountains', expanded: false },
      { svg: 'assets/svg/icon16.svg', title: '???', text: 'Nobody knows how to achieve it', expanded: false },
      { svg: 'assets/svg/icon17.svg', title: 'Question Master', text: 'Create 100 questions', expanded: false },
      { svg: 'assets/svg/icon18.svg', title: 'Field Protector', text: 'Protect your field', expanded: false },
      { svg: 'assets/svg/icon19.svg', title: 'Defender', text: 'Protect your field 500 times', expanded: false },
      { svg: 'assets/svg/icon20.svg', title: 'Complete', text: 'Complete all achievements', expanded: false },
    ];
  }

  toggleText(index: number) {
    // If the clicked square is the same as the one that was clicked before, close it
    if (this.clickedSquare === index) {
      this.squares[index].expanded = false;
      this.clickedSquare = null;
    } else {
      // Close all other squares
      this.squares.forEach((square, i) => {
        square.expanded = false; // Close all squares
      });

      // Open the currently clicked square
      this.squares[index].expanded = true;
      this.clickedSquare = index; // Store the index of the clicked square
    }
  }
}
