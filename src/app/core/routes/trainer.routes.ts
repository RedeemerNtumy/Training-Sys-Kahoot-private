
import { Routes } from '@angular/router';
import { DashboardComponent } from '../../views/trainer/dashboard/dashboard.component';

export const trainerRoutes: Routes = [
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
    loadComponent : ()=> import('../../views/trainer/assessment/assessment.component')
    .then(m => m.AssessmentComponent),
    data: { role: 'trainerer' }
  },
  {
    path: 'grade-management',
    loadComponent : ()=> import('../../views/trainer/grade-management/grade-management.component')
    .then(m => m.GradeManagementComponent),
    data: { role: 'trainerer' }
  },
  {
    path: 'trainee-management',
    loadComponent: () => import('../../views/trainer/trainee-management/trainee-management.component')
    .then(m => m.TraineeManagementComponent),
    data: { role: 'trainer' }
  },
  {
    path: 'curriculum',
    loadComponent: () => import('../../views/trainer/curriculum/curriculum.component')
    .then(m => m.CurriculumComponent),
    data: { role: 'trainer' }
  },
  {
    path: 'progress-tracking',
    loadComponent: () => import('../../views/trainer/progress-tracking/progress-tracking.component')
    .then(m => m.ProgressTrackingComponent)
  },
  {
    path: 'attendance',
    loadComponent: () => import('../../views/trainer/attendance/attendance.component')
    .then(m => m.AttendanceComponent),
    data: { role: 'trainer' }
  },
  {
    path: 'report',
    loadComponent: () => import('../../views/trainer/reports/reports.component')
    .then(m => m.ReportsComponent),
    data: { role: 'trainer' }
  },
  {
    path:'settings',
    loadComponent: () => import('../../views/settings/settings.component')
    .then(m => m.SettingsComponent),
    data: { role: 'trainer' }
  },
  {
    path:'help',
    loadComponent: () => import('../../views/help/help.component')
    .then(m => m.HelpComponent),
    data: { role: 'trainer' }
  }

];
