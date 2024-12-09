import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenerateQuestion, Question } from '@core/models/kahoot-questions';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class KahootService {
  constructor(private http: HttpClient) {}

  generateQuiz(data: GenerateQuestion): Observable<Question[]> {
    return this.http.post<Question[]>(`${environment.BaseUrl}/quiz/generate`, data).pipe(
      catchError((error) => {
        console.error('Error in generateQuiz:', error);
        return throwError(() => new Error('Failed to generate quiz'));
      })
    );
  }
}
