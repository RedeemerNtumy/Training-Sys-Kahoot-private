import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-shared-layout',
  templateUrl: './shared-layout.component.html',
})
export class SharedLayoutComponent {
  @Input() formGroup: FormGroup | undefined;
  @Output() formSubmit = new EventEmitter<void>();

  onSubmit() {
    if (this.formGroup?.valid) {
      this.formSubmit.emit();
    }
  }
}
