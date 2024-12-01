import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.scss'
})
export class QuizListComponent {
  cardType = 'Assessment Available'; // set component title 
  assessments$!: Observable<any[]>; // holds the filtered data

  
  constructor(
    private router: Router,
  ) {}


  // Sample data to use for assessment (to be removed)
  quizes = [
    {
      quizCount: 5,
      assignments: [
        {
          id: 1,
          title: "Quiz 1: Introduction to JavaScript",
          dateCreated: "2024-01-15",
          type: "Quiz",
          action: "Take Now"
        },
        {
          id: 2,
          title: "Quiz 2: HTML Basics",
          dateCreated: "2024-01-18",
          type: "Lab",
          action: "Take Now"
        },
        {
          id: 3,
          title: "Quiz 3: CSS Styling",
          dateCreated: "2024-01-20",
          type: "Presentation",
          action: "Take Now"
        },
        {
          id: 4,
          title: "Quiz 4: Advanced JavaScript",
          dateCreated: "2024-01-25",
          type: "Quiz",
          action: "Take Now"
        },
        {
          id: 5,
          title: "Quiz 5: Angular Fundamentals",
          dateCreated: "2024-01-30",
          type: "Lab",
          action: "Take Now"
        }
      ]
    }
  ];
  

  ngOnInit() {
    this.init();
  }

  init() {
    this.assessments$ = of(this.quizes[0].assignments); 
    // this.assessments$ = this.assessmentService.getAssessments();
  }
  

  
  takeQuiz(id: number) {
    this.router.navigate([`home/trainee/assessments/quiz/${id}`]);
  }
}
