import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionSetsPage } from './question-sets.page';

describe('QuestionSetsPage', () => {
  let component: QuestionSetsPage;
  let fixture: ComponentFixture<QuestionSetsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
