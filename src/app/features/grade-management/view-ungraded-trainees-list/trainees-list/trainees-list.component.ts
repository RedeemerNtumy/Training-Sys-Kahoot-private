import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainees-list',
  standalone: true,
  imports: [],
  templateUrl: './trainees-list.component.html',
  styleUrl: './trainees-list.component.scss'
})
export class TraineesListComponent {

  constructor(
    private router: Router,
  ) {}

  toGradeAssignment() {
    this.router.navigate(['/home/trainer/grade-management/grade-assignment'])
  }
}
