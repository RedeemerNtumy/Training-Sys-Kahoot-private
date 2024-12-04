import { Component, model, Output, EventEmitter } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TraineeListComponent } from '../trainee-list/trainee-list.component';
import { CohortListComponent } from '../cohort-list/cohort-list.component';
import { DropdownModule } from 'primeng/dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';

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
    DropdownModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    CommonModule,
    TabViewModule,
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

  expiryOptions: string[] = [
    '1 day',
    '2 days',
    '3 days',
    '4 days',
    '5 days',
    '6 days',
    '1 week',
    '2 weeks',
    '3 weeks',
    '1 month',
    '2 months',
    '3 months',
  ];
  selectedExpiry = '';

  @Output() cancel = new EventEmitter<void>();

  onCancel() {
    this.cancel.emit();
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
