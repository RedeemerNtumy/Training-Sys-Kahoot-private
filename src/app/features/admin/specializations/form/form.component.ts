import { SpecializationFacadeService } from './../../../../core/services/specialization-facade/specialization-facade.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})

export class FormComponent {
  specializationForm!: FormGroup;

  constructor(private fb: FormBuilder,private facadeService:SpecializationFacadeService) { }

  ngOnInit() {
    this.specializationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      prerequisites: this.fb.array([
        this.createPrerequisiteControl()
      ])
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

  removeSkill(index: number): void {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }

  createSpecialization(): void {
    if (this.specializationForm.valid) {
      console.log(this.specializationForm.value);
      this.facadeService.create(this.specializationForm.value)
      this.specializationForm.reset();
    }
  }
}
