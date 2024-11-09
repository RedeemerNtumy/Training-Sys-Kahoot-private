
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TraineeManagementComponent } from '../trainer/trainee-management/trainee-management.component';
// import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
// import { TraineeManagementComponent } from './views/admin/trainees/trainee-management.component';

export const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { role: 'admin' }
  },
  {
    path: 'trainees',
    loadComponent : ()=> import('./trainees/trainee-management.component')
    .then(m => m.TraineeManagementComponent),
    data: { role: 'admin' }
  },
  {
    path: 'specialization',
    loadComponent: () => import('./specializations/specialization-management.component')
      .then(m => m.SpecializationManagementComponent),
    data: { role: 'admin' }
  },
  {
    path: 'cohorts',
    loadComponent: () => import('./cohorts/cohorts-management.component')
      .then(m => m.CohortsManagementComponent),
    data: { role: 'admin' },
    children: [
      {
        path: '',
        loadComponent: () => import('../../features/cohorts/list-cohorts/list-cohorts.component')
          .then(m => m.ListCohortsComponent),
      },
      {
        path: 'create-cohort',
        loadComponent: () => import('../../features/cohorts/create-new-cohort/create-new-cohort.component')
          .then(m => m.CreateNewCohortComponent),
      },
      {
        path: 'edit-cohort',
        loadComponent: () => import('../../features/cohorts/edit-cohort/edit-cohort/edit-cohort.component')
          .then(m => m.EditCohortComponent),
      },
    ]
  },
  {
    path: 'progress-tracking',
    loadComponent: () => import('./progress-tracking/progress-tracking.component')
    .then(m => m.ProgressTrackingComponent)
  },
  {
    path: 'user-management',
    loadComponent: () => import('./users/user-management.component')
    .then(m => m.UserManagementComponent),
    data: { role: 'admin' }
  },
  {
    path: 'curriculum',
    loadComponent: () => import('./curriculum/curriculum.component')
    .then(m => m.CurriculumComponent),
    data: { role: 'admin' }
  },
  {
    path: 'report',
    loadComponent: () => import('./report/report.component')
    .then(m => m.ReportComponent),
    data: { role: 'admin' }
  },
  {
    path:'settings',
    loadComponent: () => import('../settings/settings.component')
    .then(m => m.SettingsComponent)
  },
  {
    path:'help',
    loadComponent: () => import('../help/help.component')
    .then(m => m.HelpComponent)
  }

];
