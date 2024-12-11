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


  constructor(private router: Router) {}

  onClose() {
    this.closeModal.emit();
  }

}
