import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ViewAssignmentsComponent } from './view-assignments/view-assignments.component';

@Component({
  selector: 'app-view-assessment-list',
  standalone: true,
  imports: [TabViewModule, ViewAssignmentsComponent],
  templateUrl: './view-assessment-list.component.html',
  styleUrl: './view-assessment-list.component.scss'
})
export class ViewAssessmentListComponent {


}
