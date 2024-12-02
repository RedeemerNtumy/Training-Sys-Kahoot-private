import { Component, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Output() closeModal = new EventEmitter<void>();

  constructor(private router: Router) {}

  onClose() {
    this.closeModal.emit();
  }

  openManualQuiz() {
    this.router.navigate(['/home/trainer/assessment/create/quiz']);
  }
}
