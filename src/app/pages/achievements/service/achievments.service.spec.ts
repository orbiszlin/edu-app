
import { TestBed } from '@angular/core/testing';
import { AchievementsService } from './achievements.service';

describe('AchievementsService', () => {
  let service: AchievementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AchievementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of achievements', () => {
    const achievements = service.getAchievements();
    expect(achievements.length).toBeGreaterThan(0);
  });

  it('should toggle expanded state of an achievement', () => {
    const index = 0;
    service.toggleAchievementExpansion(index);
    const achievements = service.getAchievements();
    expect(achievements[index].expanded).toBeTrue();

    service.toggleAchievementExpansion(index);
    expect(achievements[index].expanded).toBeFalse();
  });

  it('should close all achievements when toggling a new one', () => {
    const index1 = 0;
    const index2 = 1;

    service.toggleAchievementExpansion(index1);
    service.toggleAchievementExpansion(index2);

    const achievements = service.getAchievements();
    expect(achievements[index1].expanded).toBeFalse();
    expect(achievements[index2].expanded).toBeTrue();
  });
});
