import { Component } from '@angular/core';
import { NoSpecializationAddedComponent } from "../../../features/specializations/no-specialization-added/no-specialization-added.component";

@Component({
  selector: 'app-specialization-management',
  standalone: true,
  imports: [NoSpecializationAddedComponent],
  templateUrl: './specialization-management.component.html',
  styleUrl: './specialization-management.component.scss'
})
export class SpecializationManagementComponent {

}
