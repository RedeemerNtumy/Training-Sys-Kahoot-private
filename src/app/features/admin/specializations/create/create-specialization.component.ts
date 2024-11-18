import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from "../form/form.component";
import { IsActiveMatchOptions, Router, RouterLink } from '@angular/router';
import { SpecializationFacadeService } from '@core/services/specialization-facade/specialization-facade.service';
import { specialization } from '@core/models/specialization.interface';


@Component({
  selector: 'app-create-specialization',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormComponent,RouterLink],
  templateUrl: './create-specialization.component.html',
  styleUrl: './create-specialization.component.scss'
})

export class CreateSpecializationComponent {
  specializationData!: specialization;
  specializationId?: number;

  constructor(private router: Router,
    private facadeService: SpecializationFacadeService,
  ){}

  handleFormSubmit(formData: specialization) {
    if (this.specializationId) {
      this.facadeService.update(this.specializationId, formData).subscribe({
        next: () => {
          console.log('Specialization updated successfully');
          this.navigateToList();
        },
        error: (error) => {
          console.error('Error updating specialization:', error);
        }
      });
    } else {
      this.facadeService.create(formData).subscribe({
        next: () => {
          console.log('Specialization created successfully');
          this.navigateToList();
        },
        error: (error) => {
          console.error('Error creating specialization:', error);
        }
      });
    }
  }

  navigateToList(){
    this.router.navigate(['home','admin','specialization','list'])
  }
}
