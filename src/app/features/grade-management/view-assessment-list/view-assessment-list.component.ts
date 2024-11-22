import { Component } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-view-assessment-list',
  standalone: true,
  imports: [TabMenuModule],
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
