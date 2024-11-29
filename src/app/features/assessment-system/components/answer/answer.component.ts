import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss',
})
export class AnswerComponent {
  @Input() option!: string;
  @Input() answer!: string;
  @Input() index!: number;
  @Output() deleteAnswer = new EventEmitter<void>();
  @Output() answerChange = new EventEmitter<string>();

  onDeleteAnswer() {
    this.deleteAnswer.emit();
  }

  onAnswerInputChange(value: string) {
    this.answerChange.emit(value);
  }
}
