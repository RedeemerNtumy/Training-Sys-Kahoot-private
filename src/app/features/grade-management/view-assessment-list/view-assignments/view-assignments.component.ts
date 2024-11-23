import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-assignments',
  standalone: true,
  imports: [NgIf],
  templateUrl: './view-assignments.component.html',
  styleUrl: './view-assignments.component.scss'
})
export class ViewAssignmentsComponent {

  @Input() cardType = ''; // set component to graded or ungraded

  getAssessments$!: Observable<any>;

  // Sample data to use for assessment
  assessments = [
    {
      "cardType": "Ungraded Assignments",
      "totalQuizzes": 5,
      "assignments": [
        {
          "id": 1,
          "title": "Basic of User-Centered Design",
          "dateCreated": "2024-05-14",
          "type": "Quiz",
          "action": "Grade Now"
        },
        {
          "id": 2,
          "title": "Basic of User-Centered Design",
          "dateCreated": "2024-05-14",
          "type": "Quiz",
          "action": "Grade Now"
        },
        {
          "id": 3,
          "title": "Basic of User-Centered Design",
          "dateCreated": "2024-05-14",
          "type": "Quiz",
          "action": "Grade Now"
        },
        {
          "id": 4,
          "title": "Basic of User-Centered Design",
          "dateCreated": "2024-05-14",
          "type": "Quiz",
          "action": "Grade Now"
        }
      ]
    },
    {
      "cardType": "Graded Assignments",
      "totalQuizzes": 5,
      "assignments": [
        {
          "id": 1,
          "title": "Basic of User-Centered Design",
          "dateCreated": "2024-05-14",
          "type": "Quiz",
          "gradedTrainees": 20
        },
        {
          "id": 2,
          "title": "Basic of User-Centered Design",
          "dateCreated": "2024-05-14",
          "type": "Quiz",
          "gradedTrainees": 20
        },
        {
          "id": 3,
          "title": "Basic of User-Centered Design",
          "dateCreated": "2024-05-14",
          "type": "Quiz",
          "gradedTrainees": 20
        },
        {
          "id": 4,
          "title": "Basic of User-Centered Design",
          "dateCreated": "2024-05-14",
          "type": "Quiz",
          "gradedTrainees": 20
        }
      ]
    }
  ]

  
} 
