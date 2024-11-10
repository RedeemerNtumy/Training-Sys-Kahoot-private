import { Component } from '@angular/core';
import { InputFieldComponent } from '../../../core/shared/input-field/input-field.component';
import { MessageComponent } from '../../../core/shared/message/message.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    InputFieldComponent,
    MessageComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  isLoading = false;
  resetPasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder, private route: Router) {}

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.isLoading = true;
      const { email } = this.resetPasswordForm.value;
      console.log(email);

      this.route.navigate(['auth/reset-code-sent']);
    }
  }
}
