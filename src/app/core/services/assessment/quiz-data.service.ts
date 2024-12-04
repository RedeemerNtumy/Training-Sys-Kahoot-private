import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { AssessmentData } from '@core/models/assessment-form.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class QuizDataService {
  private quizDataSubject = new BehaviorSubject<AssessmentData | null>(
    this.loadFromSessionStorage()
  );

  constructor(private http: HttpClient) {}

  setQuizData(data: FormData, postToBackend: boolean = false): Observable<AssessmentData | null> {
    if (postToBackend) {
      return this.http.post<AssessmentData>(`${environment.BaseUrl}/assessments/quiz`, data).pipe(
        tap((response) => {
          this.quizDataSubject.next(response);
          sessionStorage.setItem('quizData', JSON.stringify(response));
        })
      );
    } else {
      this.quizDataSubject.next(data as unknown as AssessmentData);
      sessionStorage.setItem('quizData', JSON.stringify(data));
      return of(null);
    }
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
