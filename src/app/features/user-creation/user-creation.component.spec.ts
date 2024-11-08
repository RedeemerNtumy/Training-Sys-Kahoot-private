import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { UserCreationComponent } from './user-creation.component';
import { UserCreationService } from '../../core/services/user-creation/user-creation.service';
import { of, throwError } from 'rxjs';
import { PasswordValidator } from '../../core/services/passwordValidator/password-validator.service';
import { createMock } from '@golevelup/ts-jest';

describe('UserCreationComponent', () => {
  let component: UserCreationComponent;
  let fixture: ComponentFixture<UserCreationComponent>;
  let userCreationService: jest.Mocked<UserCreationService>;

  beforeEach(async () => {
    const userCreationServiceMock = createMock<UserCreationService>();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, UserCreationComponent],
      providers: [
        FormBuilder,
        { provide: UserCreationService, useValue: userCreationServiceMock },
        PasswordValidator,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCreationComponent);
    component = fixture.componentInstance;
    userCreationService = TestBed.inject(
      UserCreationService
    ) as jest.Mocked<UserCreationService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show password error when password is invalid and touched', () => {
    const passwordControl = component.userCreationForm.get('password');
    passwordControl?.setValue('invalid');
    passwordControl?.markAsTouched();
    fixture.detectChanges();
    expect(component.showPasswordError).toBe(true);
  });

  it('should show password error when password is invalid and touched', async () => {
    const passwordControl = component.userCreationForm.get('password');
    passwordControl?.setValue('invalid');
    passwordControl?.markAsTouched();

    fixture.detectChanges();

    await fixture.whenStable();

    expect(component.showPasswordError).toBe(true);
  });

  it('should call createUser on submit when form is valid', () => {
    component.userCreationForm.patchValue({
      password: 'Valid1@Password',
      confirmPassword: 'Valid1@Password',
    });

    userCreationService.createUser.mockReturnValue(of({}));

    component.onSubmit();

    expect(userCreationService.createUser).toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
    expect(component.successMessage).toBeTruthy();
  });

  it('should not call createUser on submit when form is invalid', () => {
    component.userCreationForm.patchValue({
      password: '',
      confirmPassword: '',
    });

    component.onSubmit();

    expect(userCreationService.createUser).not.toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
  });

  it('should handle error on createUser failure', () => {
    component.userCreationForm.patchValue({
      password: 'Valid1@Password',
      confirmPassword: 'Valid1@Password',
    });

    userCreationService.createUser.mockReturnValue(
      throwError(() => new Error('Error'))
    );

    component.onSubmit();

    expect(userCreationService.createUser).toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBeTruthy();
  });
});
