import { Component } from '@angular/core';
import { InputFieldComponent } from "../../../core/shared/input-field/input-field.component";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CohortDataService } from '../../../core/services/cohort-data/cohort-data.service';

@Component({
  selector: 'app-create-new-cohort',
  standalone: true,
  imports: [InputFieldComponent, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './create-new-cohort.component.html',
  styleUrl: './create-new-cohort.component.scss'
})
export class CreateNewCohortComponent {

  newCohortForm!: FormGroup;
  isModalOpen: boolean = false;
  
  allSpecializations = [
    { label: 'UI/UX', value: 'UI/UX' },
    { label: 'Frontend Engineering', value: 'Frontend' },
    { label: 'Backend Engineering', value: 'Backend' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    // public modalService: ModalService,
    public cohortDataService: CohortDataService,
  ) {}

  ngOnInit() {
    this.newCohortForm = this.fb.group({
      name: ['', Validators.required],
      specialization: this.fb.array([this.fb.control('', Validators.required)]),
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['']
    })
  }

  // Get specializations for from form
  get specialization(): FormArray {
    return this.newCohortForm.get('specialization') as FormArray;
  }

  // Add new specialization element to dom
  addSpecialization(): void {
    this.specialization.push(this.fb.control('', Validators.required));
  }

  // Remove specialization with specified index
  removeSpecialization(index: number) {
    if(this.specialization.length > 1) {
      this.specialization.removeAt(index);
    }
  }

  // Get filtered options for each select based on other selections
  getFilteredSpecializations(currentIndex: number): { label: string; value: string }[] {
    const selectedValues = this.specialization.controls.map(
      control => control.get('specialization')?.value
    );
    return this.allSpecializations.filter(
      option => !selectedValues.includes(option.value) || selectedValues[currentIndex] === option.value
    );
  }

  // Submit form
  onSubmit() {
    if(this.newCohortForm.valid) {
      console.log("create cohort data: ", this.newCohortForm.value)
      this.cohortDataService.setCohortFormData(this.newCohortForm.value)
      this.router.navigate(['/home/admin/cohorts/edit-cohort']);
    }
    else {
      this.newCohortForm.markAllAsTouched();
    }
  }

  // Navigate to list of cohorts
  goBack() {
    this.router.navigate(['/home/admin/cohorts'])
  }

}
