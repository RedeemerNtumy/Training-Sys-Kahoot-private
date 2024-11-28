import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AssessmentData } from '@core/models/assessment-form.interface';

@Injectable({
  providedIn: 'root',
})
export class QuizDataService {
  private quizDataSubject = new BehaviorSubject<AssessmentData | null>(this.loadFromSessionStorage());

  setQuizData(data: AssessmentData) {
    this.quizDataSubject.next(data);
    sessionStorage.setItem('quizData', JSON.stringify(data));
  }

  getQuizData(): Observable<AssessmentData | null> {
    return this.quizDataSubject.asObservable();
  }

  clearQuizData() {
    this.quizDataSubject.next(null);
    sessionStorage.removeItem('quizData');
  }

  private loadFromSessionStorage(): AssessmentData | null {
    const savedData = sessionStorage.getItem('quizData');
    return savedData ? JSON.parse(savedData) : null;
  }
}
