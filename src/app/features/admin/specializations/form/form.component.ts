import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Ispecialization } from '../../../../core/models/specialization.interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  @Input() initialData?: Ispecialization;
  @Output() formSubmit = new EventEmitter<Ispecialization>();

  specializationForm!: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    if (this.initialData) {
      this.patchFormWithData();
    }
  }

  private initializeForm() {
    this.specializationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      prerequisites: this.fb.array([
        ['', Validators.required]
      ])
    });
  }

  private patchFormWithData() {
    if (!this.initialData) return;
    this.isEditMode = true;
    while (this.prerequisites.length) {
      this.prerequisites.removeAt(0);
    }
    this.initialData.prerequisites.forEach(prereq => {
      this.prerequisites.push(this.fb.control(prereq, Validators.required));
    });
    this.specializationForm.patchValue({
      name: this.initialData.name,
      description: this.initialData.description
    });
  }

  get prerequisites(): FormArray {
    return this.specializationForm.get('prerequisites') as FormArray;
  }

  addSkill(): void {
    this.prerequisites.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number): void {
    if (this.prerequisites.length > 1) {
      this.prerequisites.removeAt(index);
    }
  }

  private generateTemporaryId(): number {
    return Date.now();
  }

  submitForm(): void {
    if (this.specializationForm.valid) {
      const formValue = this.specializationForm.value;
      const prerequisites = formValue.prerequisites.filter((prereq: string) => prereq.trim() !== '');
      const specialization: Ispecialization = {
        id: this.isEditMode ? this.initialData!.id : this.generateTemporaryId(),
        name: formValue.name,
        description: formValue.description,
        prerequisites: prerequisites,
        dateCreated: this.isEditMode ? this.initialData?.dateCreated : new Date().toISOString().split('T')[0],
        traineesCount: this.isEditMode ? this.initialData?.traineesCount : 0
      };
      console.log(specialization);

      this.formSubmit.emit(specialization);
      if (!this.isEditMode) {
        this.specializationForm.reset();
        this.initializeForm();
      }
    }
  }
}
