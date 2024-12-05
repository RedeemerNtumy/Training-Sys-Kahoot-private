import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  catchError,
  Observable,
  retry,
  tap,
  throwError,
  BehaviorSubject,
} from 'rxjs';
import {
  AssessmentData,
  AssessmentType,
  CreateAssessment,
  Quiz,
} from '@core/models/assessment-form.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  private getAsessmentTypeUrl = 'assets/data/assessmentType.json';
  private assessmentsSubject = new BehaviorSubject<AssessmentData[]>([]);
  assessments$ = this.assessmentsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAssessments();
  }

  private loadAssessments() {
    this.getAssessments().subscribe();
  }

  getAssessmentType() {
    return this.http.get<CreateAssessment[]>(this.getAsessmentTypeUrl);
  }

  // Get all assessments without filtering
  getAssessments(): Observable<AssessmentData[]> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '45678',
    });
    return this.http
      .get<AssessmentData[]>(`${environment.BaseUrl}/assessments/all`, {
        headers,
      })
      .pipe(
        tap((data) => {
          console.log('Assessments fetched successfully:', data);
          this.assessmentsSubject.next(data);
        }),
        retry(2),
        catchError((error) => {
          console.error('Error fetching assessments:', error);
          return throwError(() => error);
        })
      );
  }

  // Add a new assessment
  addAssessment(
    assessment: Quiz,
    timeFrame: number
  ): Observable<AssessmentData> {
    const quizId = JSON.parse(localStorage.getItem('quizId') || 'null');
    if (!quizId) {
      throw new Error('Quiz ID not found in local storage');
    }
    return this.http
      .post<AssessmentData>(
        `${environment.BaseUrl}/quizzes/${quizId}/questions/batch?quizDuration=${timeFrame}`,
        assessment
      )
      .pipe(
        catchError((error) => {
          console.error('Error adding assessment:', error);
          return throwError(() => error);
        })
      );
  }
}
