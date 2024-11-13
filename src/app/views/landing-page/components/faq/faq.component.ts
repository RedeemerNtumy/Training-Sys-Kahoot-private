import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [AccordionModule, CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FAQComponent {
  faqs = [
    {
      question: 'What is Training Suite?',
      answer:
        'Training Suite is a platform that allows you to train and improve your skills. It is designed to help you get started with your training journey.',
    },
    {
      question: 'How does Training Suite help me?',
      answer:
        'Training Suite is a platform that allows you to train and improve your skills. It is designed to help you get started with your training journey.',
    },
    {
      question: 'Can I track trainee progress in real-time?',
      answer:
        'Training Suite is a platform that allows you to train and improve your skills. It is designed to help you get started with your training journey.',
    },
    {
      question: 'How are quizzes and assignments graded?',
      answer:
        'Training Suite is a platform that allows you to train and improve your skills. It is designed to help you get started with your training journey.',
    },
    {
      question: 'Can trainees access their grades and feedback?',
      answer:
        'Training Suite is a platform that allows you to train and improve your skills. It is designed to help you get started with your training journey.',
    },
    {
      question: 'What security measures are in place?',
      answer:
        'Training Suite is a platform that allows you to train and improve your skills. It is designed to help you get started with your training journey.',
    },
    {
      question:
        "Is it possible to update curriculum materials after they've been created?",
      answer:
        'Training Suite is a platform that allows you to train and improve your skills. It is designed to help you get started with your training journey.',
    },
  ];
}
