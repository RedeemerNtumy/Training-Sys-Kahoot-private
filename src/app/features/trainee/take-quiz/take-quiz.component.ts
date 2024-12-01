import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-take-quiz',
  standalone: true,
  imports: [],
  templateUrl: './take-quiz.component.html',
  styleUrl: './take-quiz.component.scss'
})
export class TakeQuizComponent {
  quizId!: number;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.quizId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("Quiz ID:", this.quizId);  // Debugging
  }

}
