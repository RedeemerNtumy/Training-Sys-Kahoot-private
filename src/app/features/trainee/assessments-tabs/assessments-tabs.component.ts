import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { QuizListComponent } from './quiz-list/quiz-list.component';

@Component({
  selector: 'app-assessments-tabs',
  standalone: true,
  imports: [TabViewModule, QuizListComponent],
  templateUrl: './assessments-tabs.component.html',
  styleUrl: './assessments-tabs.component.scss'
})
export class AssessmentsTabsComponent {

  activeIndex: number = 0;

  constructor(
    private router: Router,
  ) {}

  onTabChange(event: any) {
    if (event.index === 1) { // Index of the "Grade History" tab
      console.log("grade history clicked")
        this.goToGradeHistory();
    }
  }



  goToGradeHistory() {
    this.router.navigate(['/home/trainer/grade-management/grade-history'])
    console.log("working?")
  }
}
