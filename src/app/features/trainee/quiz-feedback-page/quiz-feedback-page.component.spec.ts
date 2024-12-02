import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFeedbackPageComponent } from './quiz-feedback-page.component';

describe('QuizFeedbackPageComponent', () => {
  let component: QuizFeedbackPageComponent;
  let fixture: ComponentFixture<QuizFeedbackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizFeedbackPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizFeedbackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
