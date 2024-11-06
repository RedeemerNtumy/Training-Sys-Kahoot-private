import { Routes } from '@angular/router';
import { adminRoutes } from './views/admin/admin.route';
import { trainerRoutes } from './views/trainer/trainer.route';

export const routes: Routes = [
  ...adminRoutes,
  ...trainerRoutes,
  //general
  {
    path:'settings',
    loadComponent: () => import('./views/settings/settings.component')
    .then(m => m.SettingsComponent)
  },
  {
    path:'help',
    loadComponent: () => import('./views/help/help.component')
    .then(m => m.HelpComponent)
  }
];
