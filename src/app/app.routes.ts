import { Routes } from '@angular/router';
import { trainerRoutes } from './core/routes/trainer.routes';
import { traineeRoutes } from './core/routes/trainee.routes';
import { adminRoutes } from './core/routes/admin.routes';

export const routes: Routes = [
  {
    path:'home',
    loadComponent: () => import('./views/dashboard/dashboard.component')
    .then(m => m.DashboardComponent),
    children: [
      {
        path: 'admin',
        children: adminRoutes
      },
      {
        path:'trainer',
        loadComponent:() => import('./views/trainer/trainer.component')
        .then(m => m.TrainerComponent),
        children: trainerRoutes
      },
      {
        path:'trainee',
        loadComponent:() => import('./views/trainee/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
        children: traineeRoutes
      },
    ],
  }
];
