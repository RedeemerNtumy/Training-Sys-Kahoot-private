import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizesUrl = 'http://localhost:9000/quizes';
  questionId = 1;
  quizId = 'e6c8';

  constructor(
    private http: HttpClient
  ) { }


  // Fetch quizTitle
  getQuizTitle(): Observable<string | null> {
    return this.http.get<any[]>(this.quizesUrl).pipe(
      map((response) => {
        const quiz = response.find((quiz) => quiz.id === this.quizId);
        return quiz ? quiz.quizTitle : null;
      })
    );
  }


  getQuizDetails(): Observable<any | null> {
    return this.http.get<any[]>(this.quizesUrl).pipe(
      map((response) => {
        const quiz = response.find((quiz) => quiz.id === this.quizId);
        return quiz ? quiz.quizDetails : null;
      })
    );
  }


  // Fetch questions for a specific quiz by ID
  getQuestionById(): Observable<any> {
    return this.http.get<any[]>(this.quizesUrl).pipe(
      map((response) => {
        // Find the quiz by its ID
        const quiz = response.find((quiz) => quiz.id === this.quizId);
        // Find the question by its ID within the quiz
        return quiz?.questions.find((question: { id: number }) => question.id === this.questionId) || null;
      })
    );
  }


}
