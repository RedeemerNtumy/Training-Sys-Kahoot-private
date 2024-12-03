import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-cohort-list',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './cohort-list.component.html',
  styleUrl: './cohort-list.component.scss',
})
export class CohortListComponent {

  cohorts = [
    {
      topic: 'Research Biases',
      specialization: 'UI/UX Design',
      trainer: 'Lisa Koomson',
      time: '1:30pm',
    },
    {
      topic: 'CSS Flexbox & Grids',
      specialization: 'Front-end Dev',
      trainer: 'Adjei Fred',
      time: '12:30pm',
    },
    {
      topic: 'RESTful API Design',
      specialization: 'Back-end Dev',
      trainer: 'Ntumi Elias',
      time: '10:30am',
    },
    {
      topic: 'Unit Testing with Jest',
      specialization: 'Quality Assurance',
      trainer: 'Philip Halie',
      time: '09:30am',
    },
    {
      topic: 'Unit Testing with Jest',
      specialization: 'Quality Assurance',
      trainer: 'Philip Halie',
      time: '09:30am',
    },
    {
      topic: 'Unit Testing with Jest',
      specialization: 'Quality Assurance',
      trainer: 'Philip Halie',
      time: '09:30am',
    },
    {
      topic: 'Unit Testing with Jest',
      specialization: 'Quality Assurance',
      trainer: 'Philip Halie',
      time: '09:30am',
    },
    {
      topic: 'Unit Testing with Jest',
      specialization: 'Quality Assurance',
      trainer: 'Philip Halie',
      time: '09:30am',
    },
    {
      topic: 'Unit Testing with Jest',
      specialization: 'Quality Assurance',
      trainer: 'Philip Halie',
      time: '09:30am',
    },
    {
      topic: 'Unit Testing with Jest',
      specialization: 'Quality Assurance',
      trainer: 'Philip Halie',
      time: '09:30am',
    },
    {
      topic: 'Unit Testing with Jest',
      specialization: 'Quality Assurance',
      trainer: 'Philip Halie',
      time: '09:30am',
    },
    {
      topic: 'Unit Testing with Jest',
      specialization: 'Quality Assurance',
      trainer: 'Philip Halie',
      time: '09:30am',
    },
    {
      topic: 'Unit Testing with Jest',
      specialization: 'Quality Assurance',
      trainer: 'Philip Halie',
      time: '09:30am',
    },
    {
      topic: 'Unit Testing with Jest',
      specialization: 'Quality Assurance',
      trainer: 'Philip Halie',
      time: '09:30am',
    },
    {
      topic: 'Unit Testing with Jest',
      specialization: 'Quality Assurance',
      trainer: 'Philip Halie',
      time: '09:30am',
    },
  ];
}
