import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-assessment-tabs-second',
  standalone: true,
  imports: [TabViewModule, RouterOutlet],
  templateUrl: './assessment-tabs-second.component.html',
  styleUrl: './assessment-tabs-second.component.scss'
})
export class AssessmentTabsSecondComponent {
  getAssessments$!: Observable<any>;

  UngradedCount: number = 0;
  GradedCount: number = 0;
  hasUngraded: boolean = false;
  hasGraded: boolean = false;

  activeIndex: number = 1;

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
  

  constructor(
    private router: Router,
  ) {
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
      this.UngradedCount = ungraded ? ungraded.assignments.length: 0; // to be removed
      this.GradedCount = graded ? graded.assignments.length: 0; // to be removed
      // this.UngradedCount = data.Ungraded.length;
      // this.GradedCount = data.Graded.length;

      // Set boolean values
      this.hasUngraded = this.UngradedCount > 0;
      this.hasGraded = this.GradedCount > 0;
    }) 
  }

  onTabChange(event: any) {
    if (event.index === 0) { // Index of the "Grade history" tab
        this.goToAssignments();
    }
  }

  goToAssignments() {
    this.router.navigate(['/home/trainer/grade-management/'])
  }
}
