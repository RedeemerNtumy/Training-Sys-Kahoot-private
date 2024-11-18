import { Component } from '@angular/core';

@Component({
  selector: 'app-why-chooose-us',
  standalone: true,
  imports: [],
  templateUrl: './why-chooose-us.component.html',
  styleUrl: './why-chooose-us.component.scss',
})
export class WhyChoooseUsComponent {
  whyChooseUs = [
    {
      icon: 'assets/Images/svg/tailored-learning.svg',
      title: 'Tailored Learning Paths',
      description:
        'Provide personalized training experiences by creating customized learning journeys for each trainee. We ensure every individual follows a path that suits their pace, goals, and specialization',
    },
    {
      icon: 'assets/Images/svg/real-time-progress.svg',
      title: 'Real-Time Progress Insights',
      description:
        'Track performance effortlessly with real-time progress tracking and insightful reports. Trainers can provide feedback and support, ensuring no one falls behind on their learning journey.',
    },
    {
      icon: 'assets/Images/svg/efficient-curriculum.svg',
      title: 'Efficient Curriculum Management',
      description:
        'Easily organize, update, and manage all your course materials in one place. Our platform ensures seamless collaboration, helping trainers keep the curriculum up-to-date and trainees well-prepared',
    },
  ];
}
