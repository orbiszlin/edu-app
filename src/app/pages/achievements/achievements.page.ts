import { Component, OnInit } from '@angular/core';

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
      { svg: '/assets/AchievementsIcon/GameWinner.svg', title: 'Game Winner', text: 'Win the game', expanded: false },
      { svg: 'assets/AchievementsIcon/FieldStealer.svg', title: 'Field Stealer', text: 'Steal your opponent\'s field', expanded: false },
      { svg: 'assets/AchievementsIcon/FieldConqueror.svg', title: 'Field Conqueror', text: 'Acquire blank field', expanded: false },
      { svg: 'assets/AchievementsIcon/Master.svg', title: 'Master', text: 'Win 5 games in a row', expanded: false },
      { svg: 'assets/AchievementsIcon/Destroyer.svg', title: 'Destroyer', text: 'Steal from your opponents 50 times ', expanded: false },
      { svg: 'assets/AchievementsIcon/RowMaster.svg', title: 'Row Master', text: 'Acquire 10 fields in a row', expanded: false },
      { svg: 'assets/AchievementsIcon/VeteranWinner.svg', title: 'Veteran Winner', text: 'Win 25 games', expanded: false },
      { svg: 'assets/AchievementsIcon/TopAnswerer.svg', title: 'Top Answerer', text: 'Most questions answered', expanded: false },
      { svg: 'assets/AchievementsIcon/CenterConqueror.svg', title: 'Center Conqueror', text: 'Acquire center of the map', expanded: false },
      { svg: 'assets/AchievementsIcon/FieldCollector.svg', title: 'Field Collector', text: 'Acquire 500 fields', expanded: false },
      { svg: 'assets/AchievementsIcon/Champion.svg', title: 'Champion', text: 'Became best player 10 times', expanded: false },
      { svg: 'assets/AchievementsIcon/MysteryGift.svg', title: 'Mystery Gift', text: 'Acquire mystery gift', expanded: false },
      { svg: 'assets/AchievementsIcon/UltimateWinner.svg', title: 'Ultimate Winner', text: 'Win 100 games', expanded: false },
      { svg: 'assets/AchievementsIcon/SilentGenius.svg', title: 'Silent Genius', text: 'All question answered', expanded: false },
      { svg: 'assets/AchievementsIcon/MountainConqueror.svg', title: 'Mountain Conqueror', text: 'Acquire all mountains', expanded: false },
      { svg: 'assets/AchievementsIcon/Secret.svg', title: '???', text: 'Nobody knows how to achieve it', expanded: false },
      { svg: 'assets/AchievementsIcon/QuestionMaster.svg', title: 'Question Master', text: 'Create 100 questions', expanded: false },
      { svg: 'assets/AchievementsIcon/FieldProtector.svg', title: 'Field Protector', text: 'Protect your field', expanded: false },
      { svg: 'assets/AchievementsIcon/Defender.svg', title: 'Defender', text: 'Protect your field 500 times', expanded: false },
      { svg: 'assets/AchievementsIcon/Complete.svg', title: 'Complete', text: 'Complete all achievements', expanded: false },
    ];
  }

  toggleText(index: number) {
    // If the clicked square is the same as the one that was clicked before, close it.
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
