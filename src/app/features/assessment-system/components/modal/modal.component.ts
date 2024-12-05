import { Component, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KahootPageComponent } from '../../kahoot-page/kahoot-page.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [RouterModule, CommonModule, KahootPageComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  showKahoot = false;

  constructor(private router: Router) {}

  onClose() {
    this.closeModal.emit();
  }

  openManualQuiz() {
    this.router.navigate(['/home/trainer/assessment/create/quiz']);
  }

  openKahootQuiz() {
    this.showKahoot = !this.showKahoot;
  }
}
