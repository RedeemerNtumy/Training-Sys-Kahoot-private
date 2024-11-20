import { Component } from '@angular/core';

@Component({
  selector: 'app-essential-features',
  standalone: true,
  imports: [],
  templateUrl: './essential-features.component.html',
  styleUrl: './essential-features.component.scss',
})
export class EssentialFeaturesComponent {
  essentialFeatures = [
    'Personalized Learning Experiences: Create tailored training paths to meet individual trainee needs and goals',
    'Role-Based Access Control: Ensure secure and appropriate access for admins, trainers, and trainees with customizable permissions.',
    'Automated & Manual Grading: Mix auto-graded multiple-choice quizzes with trainer-reviewed short answers for a balanced assessment approach',
    'Manage and update course content efficiently, keeping materials aligned with the latest standards',
    ' Track performance with real-time data, detailed analytics, and assessment history',
  ];
}
