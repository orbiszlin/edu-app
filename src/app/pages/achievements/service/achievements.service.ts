import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',  // This service will be available globally
})
export class AchievementsService {
  private achievements: {
    title: string;
    svg: string;
    text: string;
    expanded: boolean;
    unlocked: boolean;  // Achievement Unlock Status
  }[] = [
    { svg: '/assets/AchievementsIcon/GameWinner.svg', title: 'Game Winner', text: 'Win the game', expanded: false, unlocked: false },
    { svg: 'assets/AchievementsIcon/FieldStealer.svg', title: 'Field Stealer', text: 'Steal your opponent\'s field', expanded: false, unlocked: false },
    { svg: 'assets/AchievementsIcon/FieldConqueror.svg', title: 'Field Conqueror', text: 'Acquire blank field', expanded: false, unlocked: false },
    { svg: 'assets/AchievementsIcon/Master.svg', title: 'Master', text: 'Win 5 games in a row', expanded: false, unlocked: false },
    { svg: 'assets/AchievementsIcon/Destroyer.svg', title: 'Destroyer', text: 'Steal from your opponents 50 times', expanded: false, unlocked: false },
    { svg: 'assets/AchievementsIcon/RowMaster.svg', title: 'Row Master', text: 'Acquire 10 fields in a row', expanded: false, unlocked: false },
    { svg: 'assets/AchievementsIcon/VeteranWinner.svg', title: 'Veteran Winner', text: 'Win 25 games', expanded: false, unlocked: false },
    { svg: 'assets/AchievementsIcon/TopAnswerer.svg', title: 'Top Answerer', text: 'Most questions answered', expanded: false, unlocked: false },
    { svg: 'assets/AchievementsIcon/CenterConqueror.svg', title: 'Center Conqueror', text: 'Acquire center of the map', expanded: false, unlocked: false },
    { svg: 'assets/AchievementsIcon/FieldCollector.svg', title: 'Field Collector', text: 'Acquire 500 fields', expanded: false, unlocked: false },
    { svg: 'assets/AchievementsIcon/Champion.svg', title: 'Champion', text: 'Became best player 10 times', expanded: false, unlocked: false },
    { svg: 'assets/AchievementsIcon/MysteryGift.svg', title: 'Mystery Gift', text: 'Acquire mystery gift', expanded: false, unlocked: false },
    { svg: 'assets/AchievementsIcon/UltimateWinner.svg', title: 'Ultimate Winner', text: 'Win 100 games', expanded: false, unlocked: false },
    { svg: 'assets/AchievementsIcon/SilentGenius.svg', title: 'Silent Genius', text: 'All questions answered', expanded: false, unlocked: false },
    { svg: 'assets/AchievementsIcon/MountainConqueror.svg', title: 'Mountain Conqueror', text: 'Acquire all mountains', expanded: false, unlocked: false },
    { svg: 'assets/AchievementsIcon/Secret.svg', title: '???', text: 'Nobody knows how to achieve it', expanded: false, unlocked: false },
    { svg: 'assets/AchievementsIcon/QuestionMaster.svg', title: 'Question Master', text: 'Create 100 questions', expanded: false, unlocked: false },
    { svg: 'assets/AchievementsIcon/FieldProtector.svg', title: 'Field Protector', text: 'Protect your field', expanded: false, unlocked: false },
    { svg: 'assets/AchievementsIcon/Defender.svg', title: 'Defender', text: 'Protect your field 500 times', expanded: false, unlocked: false },
    { svg: 'assets/AchievementsIcon/Complete.svg', title: 'Complete', text: 'Complete all achievements', expanded: false, unlocked: false },
  ];

  constructor() { }

  // Method to get a list of all achievements
  getAchievements() {
    return [...this.achievements];
  }

  // Method to toggle the 'expanded' state for a specific achievement
  toggleAchievementExpansion(index: number) {
    this.achievements.forEach((achievement, i) => {
      if (i === index) {
        achievement.expanded = !achievement.expanded;
      } else {
        achievement.expanded = false;
      }
    });
  }

  // Method for unlocking success
  unlockAchievement(title: string) {
    const achievement = this.achievements.find(a => a.title === title);
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true;
    }
  }

  // Method for checking success and unlocking
  checkAndUnlockAchievements(gameResult: { won: boolean, stolenField: boolean, winStreak: number, answeredQuestions: number, createdQuestions: number }) {
    if (gameResult.won && !this.achievements[0].unlocked) {
      this.unlockAchievement('Game Winner');  // Unlocked "Game Winner"
    }
    if (gameResult.stolenField && !this.achievements[1].unlocked) {
      this.unlockAchievement('Field Stealer');  // Unlocked "Field Stealer"
    }
    if (gameResult.winStreak >= 5 && !this.achievements[3].unlocked) {
      this.unlockAchievement('Master');  // Unlocked "Master"
    }
    if (gameResult.winStreak >= 50 && !this.achievements[4].unlocked) {
      this.unlockAchievement('Destroyer');  // Unlocked "Destroyer"
    }
    if (gameResult.winStreak >= 10 && !this.achievements[5].unlocked) {
      this.unlockAchievement('Row Master');  // Unlocked "Row Master"
    }
    if (gameResult.won && !this.achievements[6].unlocked) {
      this.unlockAchievement('Veteran Winner');  // Unlocked "Veteran Winner"
    }
    if (gameResult.answeredQuestions >= 100 && !this.achievements[7].unlocked) {
      this.unlockAchievement('Top Answerer');  // Unlocked "Top Answerer"
    }
    if (gameResult.stolenField && !this.achievements[8].unlocked) {
      this.unlockAchievement('Center Conqueror');  // Unlocked "Center Conqueror"
    }
    if (gameResult.winStreak >= 500 && !this.achievements[9].unlocked) {
      this.unlockAchievement('Field Collector');  // Unlocked "Field Collector"
    }
    if (gameResult.winStreak >= 10 && !this.achievements[10].unlocked) {
      this.unlockAchievement('Champion');  // Unlocked "Champion"
    }
    if (gameResult.stolenField && !this.achievements[11].unlocked) {
      this.unlockAchievement('Mystery Gift');  // Unlocked "Mystery Gift"
    }
    if (gameResult.won && gameResult.winStreak >= 100 && !this.achievements[12].unlocked) {
      this.unlockAchievement('Ultimate Winner');  // Unlocked "Ultimate Winner"
    }
    if (gameResult.answeredQuestions >= 1000 && !this.achievements[13].unlocked) {
      this.unlockAchievement('Silent Genius');  // Unlocked "Silent Genius"
    }
    if (gameResult.winStreak >= 500 && !this.achievements[14].unlocked) {
      this.unlockAchievement('Mountain Conqueror');  // Unlocked "Mountain Conqueror"
    }
    if (gameResult.stolenField && !this.achievements[15].unlocked) {
      this.unlockAchievement('Secret');  // Unlocked "???"
    }
    if (gameResult.createdQuestions >= 100 && !this.achievements[16].unlocked) {
      this.unlockAchievement('Question Master');  // Unlocked "Question Master"
    }
    if (gameResult.winStreak >= 500 && !this.achievements[17].unlocked) {
      this.unlockAchievement('Field Protector');  // Unlocked "Field Protector"
    }
    if (gameResult.winStreak >= 500 && !this.achievements[18].unlocked) {
      this.unlockAchievement('Defender');   // Unlocked "Defender"
    }
    if (this.achievements.every(a => a.unlocked) && !this.achievements[19].unlocked) {
      this.unlockAchievement('Complete');  // Unlocked "Complete"
    }
  }
}
