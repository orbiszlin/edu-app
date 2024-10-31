import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginScreenPage } from './login-screen.page';

describe('LoginScreenPage', () => {
  let component: LoginScreenPage;
  let fixture: ComponentFixture<LoginScreenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
