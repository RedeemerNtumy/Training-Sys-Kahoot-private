
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


export const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { role: 'trainer' }
  },
  {
    path: 'assessment',
    loadComponent : ()=> import('./assessment/assessment.component')
    .then(m => m.AssessmentComponent),
    data: { role: 'trainerer' }
  },
  {
    path: 'grades',
    loadComponent : ()=> import('./grade-management/grade-management.component')
    .then(m => m.GradeManagementComponent),
    data: { role: 'trainerer' }
  },
  {
    path: 'trainees',
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
    .then(m => m.ProgressTrackingComponent)
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
  {
    path:'settings',
    loadComponent: () => import('../settings/settings.component')
    .then(m => m.SettingsComponent),
    data: { role: 'trainer' }
  },
  {
    path:'help',
    loadComponent: () => import('../help/help.component')
    .then(m => m.HelpComponent),
    data: { role: 'trainer' }
  }

];
