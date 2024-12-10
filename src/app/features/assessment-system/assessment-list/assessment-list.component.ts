import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ModalComponent } from '../components/modal/modal.component';
import {
  AssessmentData,
  CreateAssessment,
} from '@core/models/assessment-form.interface';
import { AssessmentService } from '@core/services/assessment/assessment.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { SearchbarComponent } from '../../../core/shared/searchbar/searchbar.component';
import { AssessmentCardComponent } from '../components/assessment-card/assessment-card.component';
import { LoaderComponent } from "../../../core/shared/loader/loader.component";

@Component({
  selector: 'app-assessment-list',
  standalone: true,
  imports: [
    RouterModule,
    ModalComponent,
    CommonModule,
    SearchbarComponent,
    AssessmentCardComponent,
    LoaderComponent
],
  templateUrl: './assessment-list.component.html',
  styleUrl: './assessment-list.component.scss',
})
export class AssessmentListComponent {
  showModal = false;
  assessmentTypes: CreateAssessment[] = [];
  assessments$!: Observable<AssessmentData[]>;
  isAssessmentsEmpty = true;
  isLoading = true;

  constructor(
    private router: Router,
    private assessmentService: AssessmentService
  ) {
    this.assessments$ = this.assessmentService.assessments$;
    this.assessmentService
      .getAssessmentType()
      .subscribe((data: CreateAssessment[]) => {
        this.assessmentTypes = data;
      });
  }

  ngOnInit(): void {
    this.fetchAssessments();
    this.assessments$.subscribe((data) => {
      this.isAssessmentsEmpty = data.length === 1;
      this.isLoading = false;
    });
  }

  fetchAssessments() {
    this.isLoading = true;
    this.assessments$ = this.assessmentService.getAssessments();
    this.assessments$.subscribe(
      (data) => {
        this.isAssessmentsEmpty = data.length === 0;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching assessments:', error);
        this.isLoading = false;
      }
    );
  }

  navigateToAssessmentForm(type: string) {
    if (type === 'quiz') {
      this.showModal = true;
    } else {
      this.router.navigate(['/home/trainer/assessment/create', type]);
    }
  }

  handleCloseModal() {
    this.showModal = false;
  }
}
