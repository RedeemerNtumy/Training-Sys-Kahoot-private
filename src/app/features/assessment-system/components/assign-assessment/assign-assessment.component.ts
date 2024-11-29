import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-assign-assessment',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './assign-assessment.component.html',
  styleUrl: './assign-assessment.component.scss',
})
export class AssignAssessmentComponent {}
