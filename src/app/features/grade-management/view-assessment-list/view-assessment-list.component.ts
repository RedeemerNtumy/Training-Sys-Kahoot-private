import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ViewAssignmentsComponent } from './view-assignments/view-assignments.component';
import { Observable, of } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-view-assessment-list',
  standalone: true,
  imports: [TabViewModule, ViewAssignmentsComponent, NgIf],
  templateUrl: './view-assessment-list.component.html',
  styleUrl: './view-assessment-list.component.scss'
})
export class ViewAssessmentListComponent {

  getAssessments$!: Observable<any>;

  UngradedCount: number = 0;
  GradedCount: number = 0;
  hasUngraded: boolean = false;
  hasGraded: boolean = false;

  // sample data for simulating request for assessments
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
  

  constructor() {
    // private assessmentService: assessmentService,
  }

  ngOnInit() {
    // Call function to get assessments
    this.init();
  }

  init() {
    // Return all the assessments (graded and ungraded)
    // this.getAssessments$ = this.assessmentService.getAssessments();
    this.getAssessments$ = of(this.assessments); // to be removed

    // Assign graded and ungraded lengths to different variables
    this.getAssessments$.subscribe(data => {
      // Filter the data based on cardType
      const ungraded = data.find((a: { cardType: string; }) => a.cardType === "Ungraded Assignments"); // to be removed
      const graded = data.find((a: { cardType: string; }) => a.cardType === "Graded Assignments"); // to be removed

      // Calculate lengths
      this.UngradedCount = ungraded ? ungraded.assignments.length: 0; // to be 
      console.log("ungraded count: ", this.UngradedCount)
      this.GradedCount = graded ? graded.assignments.length: 0; // to be removed
      console.log("graded count: ", this.GradedCount)
      // this.UngradedCount = data.Ungraded.length;
      // this.GradedCount = data.Graded.length;

      // Set boolean values
      this.hasUngraded = this.UngradedCount > 0;
      this.hasGraded = this.GradedCount > 0;
    }) 
  }



}
