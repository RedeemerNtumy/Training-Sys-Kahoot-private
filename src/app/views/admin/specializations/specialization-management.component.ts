import { Component } from '@angular/core';
// import { NoSpecializationAddedComponent } from "../../../features/specializations/no-specialization-added/no-specialization-added.component";
import { RouterOutlet } from '@angular/router';
import { CreateSpecializationComponent } from '../../../features/admin/specializations/create/create-specialization.component';
import { SpecializationListComponent } from "../../../features/admin/specializations/list/specialization-list.component";
// import { CreateSpecializationComponent } from "../../../features/specializations/create/create-specialization.component";

@Component({
  selector: 'app-specialization-management',
  standalone: true,
  imports: [CreateSpecializationComponent, SpecializationListComponent],
  templateUrl: './specialization-management.component.html',
  styleUrl: './specialization-management.component.scss'
})

export class SpecializationManagementComponent {

}
