import { Routes } from '@angular/router';
import { adminRoutes } from './views/admin/admin.routes';
import { trainerRoutes } from './core/routes/trainer.routes';
import { traineeRoutes } from './core/routes/trainee.routes';

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
        loadComponent:() => import('./views/trainee/home/home.component')
        .then(m => m.HomeComponent),
        children: traineeRoutes
      },
    ],
  }
];
