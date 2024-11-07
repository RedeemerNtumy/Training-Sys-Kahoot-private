import { Component } from '@angular/core';
import { CreateNewCohortComponent } from '../../../features/cohorts/create-new-cohort/create-new-cohort.component';

@Component({
  selector: 'app-cohorts-management',
  standalone: true,
  imports: [CreateNewCohortComponent],
  templateUrl: './cohorts-management.component.html',
  styleUrl: './cohorts-management.component.scss'
})
export class CohortsManagementComponent {

}
