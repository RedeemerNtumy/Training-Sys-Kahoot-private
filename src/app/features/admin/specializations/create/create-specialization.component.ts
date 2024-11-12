import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from "../form/form.component";
import { IsActiveMatchOptions, Router, RouterLink } from '@angular/router';
import { SpecializationFacadeService } from '../../../../core/services/specialization-facade/specialization-facade.service';
import { Ispecialization } from '../../../../core/models/specialization.interface';


@Component({
  selector: 'app-create-specialization',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormComponent,RouterLink],
  templateUrl: './create-specialization.component.html',
  styleUrl: './create-specialization.component.scss'
})

export class CreateSpecializationComponent {
  specializationData!: Ispecialization;

  constructor(private router: Router,
    private facadeService: SpecializationFacadeService,
  ){}

  handleFormSubmit(formData: Ispecialization) {
    if (this.specializationData) {
      // this.facadeService.update(formData);

    } else {
      console.log('specialization created');
      this.facadeService.create(formData);
    }
    this.navigateToList();
  }

  navigateToList(){
    this.router.navigate(['home','admin','specialization','list'])
  }
}
