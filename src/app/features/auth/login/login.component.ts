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
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { switchMap, timer } from 'rxjs';

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
  showPasswordError = false;
  showEmailError = false;
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {}

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
    this.showEmailError = false;
    this.showPasswordError = false;

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService
        .login(email, password)
        .pipe(
          switchMap(() => timer(2000)),
          switchMap(() => {
            this.isLoading = false;
            this.successMessage = 'Login successful';
            return timer(1000);
          })
        )
        .subscribe({
          next: () => {
          },
          error: () => {
            this.showEmailError = true;
            this.showPasswordError = true;
            this.isLoading = false;
          },
        });
    }
  }
}
