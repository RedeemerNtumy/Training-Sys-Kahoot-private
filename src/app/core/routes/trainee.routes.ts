
import { Routes } from '@angular/router';
import { AssessmentsTabsComponent } from '@features/trainee/assessments-tabs/assessments-tabs.component';
import { LabSubmittionFormComponent } from '@features/trainee/lab-submittion-form/lab-submittion-form.component';
import { DashboardComponent } from '@views/trainee/dashboard/dashboard.component';

export const traineeRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { role: 'trainee' }
  },
  {
    path: 'assessments',
    loadComponent : ()=> import('@views/trainee/assessment/assessment.component')
    .then(m => m.AssessmentComponent),
    data: { role: 'trainee' },
    children: [
      {
        path: '',
        loadComponent: () => import('../../features/trainee/assessments-tabs/assessments-tabs.component')
        .then(m => m.AssessmentsTabsComponent)
      },
      {
        path: 'quiz/:id',
        loadComponent: () => import('../../features/trainee/take-quiz/take-quiz.component')
        .then(m => m.TakeQuizComponent)
      },
      {
        path: 'feedback',
        loadComponent: () => import('../../features/trainee/quiz-feedback-page/quiz-feedback-page.component')
        .then(m => m.QuizFeedbackPageComponent)
      },
      {
        path: 'lab-form',
        component: LabSubmittionFormComponent
      }
    ]
  },
  {
    path: 'modules',
    loadComponent : ()=> import('@views/trainee/modules/modules.component')
    .then(m => m.ModulesComponent),
    data: { role: 'trainee' }
  },
  {
    path: 'cohort info',
    loadComponent : ()=> import('@views/trainee/cohort-info/cohort-info.component')
    .then(m => m.CohortInfoComponent),
    data: { role: 'trainee' }
  },
  {
    path:'settings',
    loadComponent: () => import('@views/settings/settings.component')
    .then(m => m.SettingsComponent),
    data: { role: 'trainee' }
  },
  {
    path:'help',
    loadComponent: () => import('@views/help/help.component')
    .then(m => m.HelpComponent),
    data: { role: 'trainee' }
  }

];
