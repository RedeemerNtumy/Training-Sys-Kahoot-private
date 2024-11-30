import { Component, model } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TraineeListComponent } from '../trainee-list/trainee-list.component';
import { CohortListComponent } from '../cohort-list/cohort-list.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface FilterOptions {
  specialization: string[];
  cohort: string[];
}

@Component({
  selector: 'app-assign-assessment',
  standalone: true,
  imports: [
    MatTabsModule,
    TraineeListComponent,
    CohortListComponent,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './assign-assessment.component.html',
  styleUrl: './assign-assessment.component.scss',
})
export class AssignAssessmentComponent {
  filterOptions: FilterOptions = {
    specialization: ['UI/UX Design', 'Frontend', 'Backend', 'DevOps'],
    cohort: ['Cohort 1', 'Cohort 2', 'Cohort 3'],
  };

  readonly checked = model(false);

  selectedSpecialization = '';
  selectedCohort = '';
  hasSelectedItems = false;

  onCancel() {
    // Add your cancel logic here
    // For example, close the dialog/modal
  }

  onAssign() {
    // Add your assign logic here
    // This will handle the assignment of selected trainees/cohorts
  }

  applyFilters() {
    // The filter values are automatically passed to child components
    // through the input bindings
  }
}
