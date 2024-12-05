import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kahoot-questions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kahoot-questions.component.html',
  styleUrl: './kahoot-questions.component.scss'
})
export class KahootQuestionsComponent {
  @Input() question: any = {
    text: '',
    answers: []
  };
  @Output() questionUpdate = new EventEmitter<any>();

  addAnswer() {
    this.question.answers.push({
      text: '',
      correct: false
    });
    this.questionUpdate.emit(this.question);
  }

  markAsCorrect(selectedAnswer: any) {
    this.question.answers.forEach((answer: any) => {
      answer.correct = answer === selectedAnswer;
    });
    this.questionUpdate.emit(this.question);
  }
}
