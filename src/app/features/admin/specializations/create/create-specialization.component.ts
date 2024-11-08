import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from "../form/form.component";


@Component({
  selector: 'app-create-specialization',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormComponent],
  templateUrl: './create-specialization.component.html',
  styleUrl: './create-specialization.component.scss'
})

export class CreateSpecializationComponent {

}
