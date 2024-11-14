import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user-form-section-2',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, FormsModule, NgIf],
  templateUrl: './add-user-form-section-2.component.html',
  styleUrl: './add-user-form-section-2.component.scss'
})
export class AddUserFormSection2Component {

  newUserFormSecTwo!: FormGroup;

  allSpecializations = [
    { label: 'UI/UX', value: 'UI/UX' },
    { label: 'Frontend Engineering', value: 'Frontend' },
    { label: 'Backend Engineering', value: 'Backend' }
  ];

  allCohorts = [
    { value: 'Cohort 2.0' },
    { value: 'Cohort 3.0' },
    { value: 'Cohort 4.0' },
    { value: 'Cohort 5.0' },
    { value: 'Cohort 6.0' },
    { value: 'Cohort 7.0' },
    { value: 'Cohort 8.0' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.newUserFormSecTwo = this.fb.group({
      specialization: ['', Validators.required],
      cohort: this.fb.array([this.fb.control('', Validators.required)]),
      enrollmentDate: ['', Validators.required],
      trainingID: ['', Validators.required]
    })
  }


  // Get specializations and cohort for from form
  get specialization(): FormArray {
    return this.newUserFormSecTwo.get('specialization') as FormArray;
  }
  get cohort(): FormArray {
    return this.newUserFormSecTwo.get('cohort') as FormArray;
  }
  
  goBack() {
    this.router.navigate(['/home/admin/user-managment/add-user'])
  }
}
