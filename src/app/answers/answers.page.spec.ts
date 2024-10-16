import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnswersPage } from './answers.page';

describe('AnswersPage', () => {
  let component: AnswersPage;
  let fixture: ComponentFixture<AnswersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
