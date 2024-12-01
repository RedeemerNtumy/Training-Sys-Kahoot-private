import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AssessmentsTabsComponent } from '@features/trainee/assessments-tabs/assessments-tabs.component';

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [ RouterOutlet ],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.scss'
})
export class AssessmentComponent {

}
