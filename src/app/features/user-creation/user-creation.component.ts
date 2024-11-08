import { Component, OnInit, OnDestroy } from '@angular/core';
import { InputFieldComponent } from '../../core/shared/input-field/input-field.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserCreationService } from '../../core/services/user-creation/user-creation.service';
import { debounceTime, distinctUntilChanged, takeUntil, Subject } from 'rxjs';
import { MessageComponent } from '../../core/shared/message/message.component';
import { PasswordValidator } from '../../core/services/passwordValidator/password-validator.service';

@Component({
  selector: 'app-user-creation',
  standalone: true,
  imports: [
    InputFieldComponent,
    ReactiveFormsModule,
    CommonModule,
    MessageComponent,
  ],
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss'],
})
export class UserCreationComponent implements OnInit, OnDestroy {
  userCreationForm!: FormGroup;
  showPasswordError = false;
  successMessage = '';
  errorMessage = '';
  isLoading = false;
  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private userCreationService: UserCreationService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setupFormValidation();
  }

  private initForm() {
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
      { validators: PasswordValidator.matchPassword }
    );
  }

  private setupFormValidation() {
    const passwordControl = this.userCreationForm.get('password');
    const confirmPasswordControl = this.userCreationForm.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      passwordControl.valueChanges
        .pipe(
          debounceTime(1000),
          distinctUntilChanged(),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(() => {
          confirmPasswordControl.updateValueAndValidity();
          this.updatePasswordErrorState(passwordControl);
        });

      passwordControl.statusChanges
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.updatePasswordErrorState(passwordControl);
        });
    }
  }

  private updatePasswordErrorState(passwordControl: AbstractControl | null) {
    if (passwordControl) {
      this.showPasswordError =
        passwordControl.invalid &&
        (passwordControl.touched || passwordControl.dirty);
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.userCreationForm.invalid) {
      this.userCreationForm.markAllAsTouched();
      this.isLoading = false;
      return;
    }

    const { password, confirmPassword } = this.userCreationForm.value;
    const user = { password, confirmPassword };

    this.userCreationService.createUser(user).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage =
          'The details you provided match our records. You can now proceed to log in or reset your password';
        this.userCreationForm.reset();
        this.showPasswordError = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          'An error occured while processing your request. Please try again!';
        console.error('Error creating user:', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
