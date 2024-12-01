import { Component } from '@angular/core';
import { AssessmentsTabsComponent } from '@features/trainee/assessments-tabs/assessments-tabs.component';

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [AssessmentsTabsComponent ],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.scss'
})
export class AssessmentComponent {

}
