
import { Routes } from '@angular/router';
import { DashboardComponent } from '../../views/admin/dashboard/dashboard.component';


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
    path: 'specialization',
    loadComponent: () => import('../../views/admin/specializations/specialization-management.component')
      .then(m => m.SpecializationManagementComponent),
    data: { role: 'admin' }
  },
  {
    path: 'cohorts',
    loadComponent: () => import('../../views/admin/cohorts/cohorts-management.component')
    .then(m => m.CohortsManagementComponent),
    data: { role: 'admin' }
  },
  {
    path: 'progress-tracking',
    loadComponent: () => import('../../views/admin/progress-tracking/progress-tracking.component')
    .then(m => m.ProgressTrackingComponent)
  },
  {
    path: 'user-management',
    loadComponent: () => import('../../views/admin/users/user-management.component')
    .then(m => m.UserManagementComponent),
    data: { role: 'admin' }
  },
  {
    path: 'curriculum',
    loadComponent: () => import('../../views/admin/curriculum/curriculum.component')
    .then(m => m.CurriculumComponent),
    data: { role: 'admin' }
  },
  {
    path: 'report',
    loadComponent: () => import('../../views/admin/report/report.component')
    .then(m => m.ReportComponent),
    data: { role: 'admin' }
  },
  {
    path:'settings',
    loadComponent: () => import('../../views/settings/settings.component')
    .then(m => m.SettingsComponent)
  },
  {
    path:'help',
    loadComponent: () => import('../../views/help/help.component')
    .then(m => m.HelpComponent)
  }

];
