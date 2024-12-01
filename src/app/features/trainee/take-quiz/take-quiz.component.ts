import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '@core/services/trainee/quiz-questions/quiz.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-take-quiz',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe],
  templateUrl: './take-quiz.component.html',
  styleUrl: './take-quiz.component.scss'
})
export class TakeQuizComponent implements OnInit {

  currentQuestion$!: Observable<any>;
  selectedAnswerId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
  ) {}

  ngOnInit() {
    this.currentQuestion$ = this.quizService.getQuestionById();
    this.currentQuestion$.subscribe(data => {
      console.log(data)
    })
  }

  checkSelectedAnswer(id: number) {
    this.selectedAnswerId = id;
  }

  isAnswerSelected(id: number): boolean {
    return this.selectedAnswerId === id;
  }



}
