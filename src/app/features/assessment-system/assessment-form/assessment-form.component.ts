import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AssessmentData,
  AssessmentType,
} from '@core/models/assessment-form.interface';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assessment-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './assessment-form.component.html',
  styleUrl: './assessment-form.component.scss',
})
export class AssessmentFormComponent {
  @Input() type: AssessmentType = 'lab';
  @Output() formSubmit = new EventEmitter<AssessmentData>();

  selectedFileName: string = '';

  form: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.form = this.fb.group({
      assessmentType: ['', Validators.required],
      title: ['', Validators.required],
      focusArea: ['', Validators.required],
      description: ['', Validators.required],
      coverImage: [null],
      attachments: [[]],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const type = params.get('type');
      if (type) {
        this.type = type as AssessmentType;
      }
      this.form.patchValue({
        assessmentType: this.type,
      });
    });
  }

  onCoverImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.form.patchValue({
        coverImage: file,
      });
    }
  }

  onFileSelected(event: any) {
    const files = Array.from(event.target.files);
    if (files.length) {
      this.form.patchValue({
        attachments: files,
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formData: AssessmentData = {
        ...this.form.value,
        assessmentType: this.type,
      };
      console.log('Form Data:', formData);
      console.log('Assessment Type:', this.type);
      this.formSubmit.emit(formData);
    }
  }
}
