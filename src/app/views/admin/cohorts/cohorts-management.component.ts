import { Component } from '@angular/core';
import { CreateNewCohortComponent } from '../../../features/cohorts/create-new-cohort/create-new-cohort.component';
import { ListCohortsComponent } from "../../../features/cohorts/list-cohorts/list-cohorts.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cohorts-management',
  standalone: true,
  imports: [CreateNewCohortComponent, ListCohortsComponent,],
  templateUrl: './cohorts-management.component.html',
  styleUrl: './cohorts-management.component.scss'
})
export class CohortsManagementComponent {

}
