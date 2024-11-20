import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PodiumPage } from './podium.page';

describe('PodiumPage', () => {
  let component: PodiumPage;
  let fixture: ComponentFixture<PodiumPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PodiumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
