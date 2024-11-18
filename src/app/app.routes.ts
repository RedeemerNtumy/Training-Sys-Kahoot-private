import { Routes } from '@angular/router';
import { authRoutes } from './core/routes/auth.routes';
import { adminRoutes } from './views/admin/admin.routes';
import { trainerRoutes } from './core/routes/trainer.routes';

export const routes: Routes = [
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
