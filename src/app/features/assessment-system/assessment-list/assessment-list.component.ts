import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-assessment-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './assessment-list.component.html',
  styleUrl: './assessment-list.component.scss',
})
export class AssessmentListComponent {
  assessmentTypes = [
    {
      type: 'quiz',
      label: 'Quiz',
      icon: 'assets/Images/png/quiz.png',
      route: '/home/trainer/assessment/create/quiz',
    },
    {
      type: 'lab',
      label: 'Labs',
      icon: 'assets/Images/png/lab.png',
      route: '/home/trainer/assessment/create/lab',
    },
    {
      type: 'presentation',
      label: 'Presentation',
      icon: 'assets/Images/png/presentation.png',
      route: '/home/trainer/assessment/create/presentation',
    },
  ];

  constructor(private router: Router) {}

  navigateToAssessmentForm(type: string) {
    this.router.navigate(['/home/trainer/assessment/create', type]);
  }
}
