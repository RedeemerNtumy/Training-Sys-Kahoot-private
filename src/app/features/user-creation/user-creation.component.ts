import { Component, OnInit } from '@angular/core';
import { InputFieldComponent } from '../../core/shared/input-field/input-field.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserCreationService } from '../../core/services/user-creation/user-creation.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-user-creation',
  standalone: true,
  imports: [InputFieldComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss'],
})
export class UserCreationComponent implements OnInit {
  userCreationForm!: FormGroup;
  showPasswordError = false;
  successMessage = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userCreationService: UserCreationService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setupPasswordValidation();
  }

  initForm() {
    this.userCreationForm = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.matchPassword }
    );

    this.userCreationForm
      .get('password')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe(() => {
        this.userCreationForm.get('confirmPassword')?.updateValueAndValidity();
      });
  }

  private matchPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  setupPasswordValidation() {
    const passwordControl = this.userCreationForm.get('password');
    if (passwordControl) {
      passwordControl.valueChanges
        .pipe(debounceTime(2000), distinctUntilChanged())
        .subscribe(() => {
          console.log('Password Control State:', {
            value: passwordControl.value,
            valid: passwordControl.valid,
            errors: passwordControl.errors,
          });
          this.showPasswordError =
            passwordControl.invalid &&
            (passwordControl.touched || passwordControl.dirty);
        });
    }
  }

  onSubmit() {
    this.isLoading = true;

    if (this.userCreationForm.valid) {
      const { password, confirmPassword } = this.userCreationForm.value;

      const user = { password, confirmPassword };

      this.userCreationService.createUser(user).subscribe({
        next: (res) => {
          console.log('User created successfully', res);
          this.successMessage = true;
          this.userCreationForm.reset();
        },

        error: (err) => console.error('Error creating user:', err),
      });
    } else {
      this.userCreationForm.markAllAsTouched();
    }
  }
}
