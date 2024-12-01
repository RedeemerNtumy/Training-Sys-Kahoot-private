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

  // getQuestionsByQuizId(quizId: number): Observable<any> {
  //   console.log(quizId)
  //   return this.http.get(`${this.quizesUrl}/${quizId}`).pipe(
  //     map((quiz: any) => quiz.questions) // Extract questions from the quiz
  //   );
  // }


}
