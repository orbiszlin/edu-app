import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AchievementsPage } from './achievements.page';

describe('AchievementsPage', () => {
  let component: AchievementsPage;
  let fixture: ComponentFixture<AchievementsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
