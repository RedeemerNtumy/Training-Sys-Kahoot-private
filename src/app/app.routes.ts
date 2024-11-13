import { Routes } from '@angular/router';
import { authRoutes } from './core/routes/auth.routes';
// import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
// import { TraineeManagementComponent } from './views/admin/trainees/trainee-management.component';
import { adminRoutes } from './views/admin/admin.routes';
import { trainerRoutes } from './core/routes/trainer.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/landing-page/landing-page.component').then(
        (l) => l.LandingPageComponent
      ),
  },
  ...authRoutes,
  {
    path: 'home',
    loadComponent: () =>
      import('./views/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    children: [
      {
        path: 'admin',
        children: adminRoutes,
      },
      {
        path: 'trainer',
        loadComponent: () =>
          import('./views/trainer/trainer.component').then(
            (m) => m.TrainerComponent
          ),
        children: trainerRoutes,
      },
    ],
  },
];
