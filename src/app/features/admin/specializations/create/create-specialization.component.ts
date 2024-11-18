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
    const operation$ = this.specializationId
      ? this.facadeService.update(this.specializationId, formData)
      : this.facadeService.create(formData);
    operation$.subscribe({
      next: () => {
        this.navigateToList();
      },
      error: (error) => {
        this.handleError(error);
      }
    });
  }

  private handleError(error: any): void {
    const operation = this.specializationId ? 'updating' : 'creating';
    throw new Error(`Error ${operation} specialization: ${error}`);
  }

  navigateToList(){
    this.router.navigate(['home','admin','specialization','list'])
  }
}
