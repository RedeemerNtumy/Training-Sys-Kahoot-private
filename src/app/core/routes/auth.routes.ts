import { Routes } from "@angular/router";
import { AuthComponent } from "../../views/auth/auth.component";
import { ResetCodeComponent } from "../shared/reset-code/reset-code.component";

export const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../../features/user-creation/user-creation.component').then(
            (m) => m.UserCreationComponent
          ),

      },
      {
        path: 'login',
        loadComponent: () =>
          import('../../features/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
       {
         path: 'forgot-password',
         loadComponent: () =>
           import(
             '../../features/auth/reset-password/reset-password.component'
           ).then((m) => m.ResetPasswordComponent),
       },
       {
         path: 'reset-code-sent',
         component: ResetCodeComponent,
         data: { state: 'sent' },
       },
       {
         path: 'reset-code-enter',
         component: ResetCodeComponent,
         data: { state: 'enter' },
       },
    ],
  },
]

