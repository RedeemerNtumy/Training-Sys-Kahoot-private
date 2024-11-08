import { Component } from '@angular/core';
import { NoSpecializationAddedComponent } from "../../../features/specializations/no-specialization-added/no-specialization-added.component";
import { RouterOutlet } from '@angular/router';
import { CreateSpecializationComponent } from "../../../features/specializations/create-specialization/create-specialization.component";

@Component({
  selector: 'app-specialization-management',
  standalone: true,
  imports: [NoSpecializationAddedComponent, RouterOutlet, CreateSpecializationComponent],
  templateUrl: './specialization-management.component.html',
  styleUrl: './specialization-management.component.scss'
})

export class SpecializationManagementComponent {

}
