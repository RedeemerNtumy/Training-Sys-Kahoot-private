
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-shared-layout',
  templateUrl: './shared-layout.component.html',
})
export class SharedLayoutComponent {
  @Input() formGroup: FormGroup | undefined;

  onSubmit() {
    // Placeholder for form submission logic
  }
}
