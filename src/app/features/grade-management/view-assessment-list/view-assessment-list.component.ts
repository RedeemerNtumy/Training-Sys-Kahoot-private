import { Component } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { ViewAssignmentsComponent } from './view-assignments/view-assignments.component';

@Component({
  selector: 'app-view-assessment-list',
  standalone: true,
  imports: [TabMenuModule, ViewAssignmentsComponent],
  templateUrl: './view-assessment-list.component.html',
  styleUrl: './view-assessment-list.component.scss'
})
export class ViewAssessmentListComponent {

  
  items = [
    {label: "Assessment"}, 
    {label: "Grade History"}
  ];

  activeItem = 0;

}
