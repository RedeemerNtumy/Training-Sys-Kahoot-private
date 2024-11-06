import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component')
    .then(m => m.DashboardComponent),
    data: { role: 'admin' }
  },
  {
    path: 'trainees',
    loadComponent: () => import('./trainees/trainee-management.component')
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
    data: { role: 'admin' }
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
]
