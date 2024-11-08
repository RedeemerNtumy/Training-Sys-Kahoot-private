import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-specialization',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create-specialization.component.html',
  styleUrl: './create-specialization.component.scss'
})

export class CreateSpecializationComponent {
  specializationForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.specializationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      prerequisites: this.fb.array([])
    });
  }

  get skills(): FormArray {
    return this.specializationForm.get('prerequisites') as FormArray;
  }


  createPrerequisiteControl(): FormGroup {
    return this.fb.group({
      skill: ['', Validators.required]
    });
  }

  addSkills(): void {
    this.skills.push(this.createPrerequisiteControl());
  }

  createSpecialization(): void {
    if (this.specializationForm.valid) {
      console.log(this.specializationForm.value);
      // Implement your logic to create the specialization here
    }
  }
}
