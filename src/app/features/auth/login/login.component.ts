import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageComponent } from '../../../core/shared/message/message.component';
import { InputFieldComponent } from '../../../core/shared/input-field/input-field.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MessageComponent,
    InputFieldComponent,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPasswordError = true;
  showEmailError = false;
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    this.isLoading = true;

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const user = { email, password };
      this.authService.login(email, password).subscribe((response) => {
        if (response.success) {
          this.successMessage = 'Login successful';
          this.errorMessage = '';
        } else {
          this.errorMessage = response.message;
          this.successMessage = '';
        }
      });
    }
  }
}
