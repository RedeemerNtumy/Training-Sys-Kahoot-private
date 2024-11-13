import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { UserCreationComponent } from './user-creation.component';
import { UserCreationService } from '../../core/services/user-creation/user-creation.service';
import { of, throwError } from 'rxjs';
import { PasswordValidator } from '../../core/services/passwordValidator/password-validator.service';
import { createMock } from '@golevelup/ts-jest';
import { Router } from '@angular/router';

describe('UserCreationComponent', () => {
  let component: UserCreationComponent;
  let fixture: ComponentFixture<UserCreationComponent>;
  let userCreationService: jest.Mocked<UserCreationService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    const userCreationServiceMock = createMock<UserCreationService>();
    const routerMock = createMock<Router>();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, UserCreationComponent],
      providers: [
        FormBuilder,
        { provide: UserCreationService, useValue: userCreationServiceMock },
        { provide: Router, useValue: routerMock },
        PasswordValidator,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCreationComponent);
    component = fixture.componentInstance;
    userCreationService = TestBed.inject(
      UserCreationService
    ) as jest.Mocked<UserCreationService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
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

  it('should call createUser on submit when form is valid', fakeAsync(() => {
    component.userCreationForm.patchValue({
      password: 'Valid1@Password',
      confirmPassword: 'Valid1@Password',
    });

    userCreationService.createUser.mockReturnValue(of({}));

    component.onSubmit();
    tick(2000); 
    tick(1000);

    expect(userCreationService.createUser).toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
    expect(component.successMessage).toBeTruthy();
    expect(router.navigate).toHaveBeenCalledWith(['auth/login']);
  }));

  it('should not call createUser on submit when form is invalid', () => {
    component.userCreationForm.patchValue({
      password: '',
      confirmPassword: '',
    });

    component.onSubmit();

    expect(userCreationService.createUser).not.toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
  });

  it('should handle error on createUser failure', fakeAsync(() => {
    component.userCreationForm.patchValue({
      password: 'Valid1@Password',
      confirmPassword: 'Valid1@Password',
    });

    userCreationService.createUser.mockReturnValue(
      throwError(() => new Error('Error'))
    );

    component.onSubmit();
    tick(2000);

    expect(userCreationService.createUser).toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBeTruthy();
  }));
});
