
import { Routes } from '@angular/router';
import { DashboardComponent } from '../../views/trainee/dashboard/dashboard.component';

export const traineeRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { role: 'trainee' }
  },
  {
    path: 'assessments',
    loadComponent : ()=> import('../../views/trainee/assessment/assessment.component')
    .then(m => m.AssessmentComponent),
    data: { role: 'trainee' }
  },
  {
    path: 'modules',
    loadComponent : ()=> import('../../views/trainee/modules/modules.component')
    .then(m => m.ModulesComponent),
    data: { role: 'trainee' }
  },
  {
    path: 'cohort info',
    loadComponent : ()=> import('../../views/trainee/cohort-info/cohort-info.component')
    .then(m => m.CohortInfoComponent),
    data: { role: 'trainee' }
  },
  {
    path:'settings',
    loadComponent: () => import('../../views/settings/settings.component')
    .then(m => m.SettingsComponent),
    data: { role: 'trainee' }
  },
  {
    path:'help',
    loadComponent: () => import('../../views/help/help.component')
    .then(m => m.HelpComponent),
    data: { role: 'trainee' }
  }

];
