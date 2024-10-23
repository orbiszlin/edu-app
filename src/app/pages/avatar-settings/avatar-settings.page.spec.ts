import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarSettingsPage } from './avatar-settings.page';

describe('AvatarSettingsPage', () => {
  let component: AvatarSettingsPage;
  let fixture: ComponentFixture<AvatarSettingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
