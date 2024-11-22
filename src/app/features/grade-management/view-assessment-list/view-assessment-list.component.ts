import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ViewAssignmentsComponent } from './view-assignments/view-assignments.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-assessment-list',
  standalone: true,
  imports: [TabViewModule, ViewAssignmentsComponent],
  templateUrl: './view-assessment-list.component.html',
  styleUrl: './view-assessment-list.component.scss'
})
export class ViewAssessmentListComponent {

  getAssessments$!: Observable<any>;

  UngradedCount: number = 0;
  GradedCount: number = 0;
  hasUngraded: boolean = false;
  hasGraded: boolean = false;

  constructor() {
    private assessmentService: assessmentService,
  }

  ngOnInit() {
    // Call function to get assessments
    this.init();
  }

  init() {
    // Return all the assessments (graded and ungraded)
    this.getAssessments$ = this.assessmentService.getAssessments();

    // Assign graded and ungraded lengths to different variables
    this.getAssessments$.subscribe(assessments => {
      // Calculate lengths
      this.UngradedCount = data.Ungraded.length;
      this.GradedCount = data.Graded.length;

      // Set boolean values
      this.hasUngraded = this.UngradedCount > 0;
      this.hasGraded = this.GradedCount > 0;
    }) 

  }

}
