import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { SearchbarComponent } from '@core/shared/searchbar/searchbar.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-assessments-tabs',
  standalone: true,
  imports: [QuizListComponent, SearchbarComponent, NgIf],
  templateUrl: './assessments-tabs.component.html',
  styleUrl: './assessments-tabs.component.scss'
})
export class AssessmentsTabsComponent {
 
  empty: boolean = false;

  constructor(
    private router: Router,
  ) {}

  handleChildEmpty(isEmpty: boolean) {
    if (isEmpty) {
      this.empty = true;
    } else {
      // If at least one child has data, set `empty` to false
      this.empty = false;
    }
  }


}
