import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, tap, throwError, BehaviorSubject } from 'rxjs';
import {
  AssessmentData,
  AssessmentType,
  CreateAssessment,
} from '@core/models/assessment-form.interface';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  private apiUrl = 'http://localhost:3000/assessments';
  private getAsessmentTypeUrl = 'assets/data/assessmentType.json';
  private assessmentsSubject = new BehaviorSubject<AssessmentData[]>([]);
  assessments$ = this.assessmentsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAssessmentType() {
    return this.http.get<CreateAssessment[]>(this.getAsessmentTypeUrl);
  }

  // Get all assessments without filtering
  getAssessments(): Observable<AssessmentData[]> {
    return this.http.get<AssessmentData[]>(this.apiUrl).pipe(
      tap((data) => this.assessmentsSubject.next(data)),
      retry(2),
      catchError((error) => {
        console.error('Error fetching assessments:', error);
        return throwError(() => error);
      })
    );
  }

  // Add a new assessment
  addAssessment(assessment: AssessmentData): Observable<AssessmentData> {
    return this.http.post<AssessmentData>(this.apiUrl, assessment).pipe(
      retry(2),
      catchError((error) => {
        console.error('Error adding assessment:', error);
        return throwError(() => error);
      })
    );
  }
}
