import { Routes } from '@angular/router';

export const trainerRoutes : Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component')
    .then(m => m.DashboardComponent),
    data: { role: 'trainer' }
  },
  {
    path: 'assessment',
    loadComponent: () => import('./assessment/assessment.component')
    .then(m => m.AssessmentComponent)
  },
  {
    path: 'grade-management',
    loadComponent: () => import('./grade-management/grade-management.component')
    .then(m => m.GradeManagementComponent),
    data: { role: 'trainer' }
  },
  {
    path: 'trainee-management',
    loadComponent: () => import('./trainee-management/trainee-management.component')
    .then(m => m.TraineeManagementComponent),
    data: { role: 'trainer' }
  },
  {
    path: 'curriculum',
    loadComponent: () => import('./curriculum/curriculum.component')
    .then(m => m.CurriculumComponent),
    data: { role: 'trainer' }
  },
  {
    path: 'progress-tracking',
    loadComponent: () => import('./progress-tracking/progress-tracking.component')
    .then(m => m.ProgressTrackingComponent),
    data: { role: 'trainer' }
  },
  {
    path: 'attendance',
    loadComponent: () => import('./attendance/attendance.component')
    .then(m => m.AttendanceComponent),
    data: { role: 'trainer' }
  },
  {
    path: 'report',
    loadComponent: () => import('./reports/reports.component')
    .then(m => m.ReportsComponent),
    data: { role: 'trainer' }
  },
]
