import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { Question } from '@core/models/kahoot-questions';
import { KahootService } from '@core/services/assessment/kahoot/kahoot.service';
import { CommonModule } from '@angular/common';
import { initializeDropdownOptions } from '../../../../utils/kahootDropDownData';
import { LoaderComponent } from "../../../../core/shared/loader/loader.component";

@Component({
  selector: 'app-generate-by-ai',
  standalone: true,
  imports: [
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    QuestionCardComponent,
    CommonModule,
    LoaderComponent
],
  templateUrl: './generate-by-ai.component.html',
  styleUrl: './generate-by-ai.component.scss',
})
export class GenerateByAiComponent implements OnInit {
  quizzes: Question[] = [];
  levels: { name: string }[] | undefined;
  questionType: { name: string }[] | undefined;
  includeCode: { name: string }[] | undefined;
  errorMessage = ''

  generateQuizForm!: FormGroup;
  isLoading = false;

  @Output() closeModal = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private kahootService: KahootService) {}

  ngOnInit(): void {
    const dropdownOptions = initializeDropdownOptions();
    this.levels = dropdownOptions.levels;
    this.questionType = dropdownOptions.questionType;
    this.includeCode = dropdownOptions.includeCode;
    this.onGenerateQuizForm();
  }

  onGenerateQuizForm(): void {
    this.generateQuizForm = this.fb.group({
      level: ['', [Validators.required]],
      questionType: [''],
      includeCode: [''],
      topic: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.quizzes = [];
    this.errorMessage = ''

    if (this.generateQuizForm.valid) {
      const formValue = this.generateQuizForm.value;
      const formattedValue = {
        level: formValue.level.name,
        questionType: formValue.questionType.value,
        includeCode: formValue.includeCode.name,
        topic: formValue.topic,
      };
      console.log(formattedValue);
      this.kahootService.generateQuiz(formattedValue).subscribe({
        next: (response: Question[]) => {
          this.quizzes = response;
          console.log(response);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error generating quiz:', error);
          this.errorMessage = error.message
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  onClose() {
    this.closeModal.emit();
  }
}
