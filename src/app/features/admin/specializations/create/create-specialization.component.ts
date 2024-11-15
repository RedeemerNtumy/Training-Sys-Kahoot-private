import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from "../form/form.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SpecializationFacadeService } from '../../../../core/services/specialization-facade/specialization-facade.service';
import { Ispecialization } from '../../../../core/models/specialization.interface';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-create-specialization',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormComponent,RouterLink],
  templateUrl: './create-specialization.component.html',
  styleUrl: './create-specialization.component.scss'
})

export class CreateSpecializationComponent {
  specializationData?: Ispecialization;
  specializationId?: number;
  isLoading: boolean = false;

  constructor(private router: Router,
    private facadeService: SpecializationFacadeService,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.route.queryParams.pipe(
      switchMap(params => {
        const id = params['id'];
        if (id) {
          this.isLoading = true;
          return this.facadeService.getSpecializationById(id);
        }
        return of(undefined);
      })
    ).subscribe({
      next: (specialization) => {
        this.specializationData = specialization;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching specialization:', error);
        this.isLoading = false;
      }
    });
  }

  handleFormSubmit(formData: Ispecialization) {
    if (this.specializationData?.id) {
      this.facadeService.update(this.specializationData.id, formData).subscribe({
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
