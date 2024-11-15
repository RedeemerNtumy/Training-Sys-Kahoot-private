import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputFieldComponent } from '../../../../core/shared/input-field/input-field.component';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TraineeInsystemService } from '../../../../core/services/user-management/trainee/trainee-insystem.service';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, first, map, of, switchMap, takeUntil } from 'rxjs';
import { Countries, Gender, User } from '../../../../core/models/cohort.interface';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-user-form',
  standalone: true,
  imports: [InputFieldComponent, ReactiveFormsModule, FormsModule, AsyncPipe, NgFor, NgIf],
  templateUrl: './add-user-form.component.html',
  styleUrl: './add-user-form.component.scss'
})
export class AddUserFormComponent implements OnInit, OnDestroy {

  newUserForm!: FormGroup;
  genders$!: Observable<Gender[]>;
  countries$!: Observable<Countries[]>;
  
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public traineeInsystemService: TraineeInsystemService,
  ) {}

  ngOnInit() {
    this.genders$ = this.traineeInsystemService.getGenders();
    this.countries$ = this.traineeInsystemService.getCountries();

    this.newUserForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email],
        [this.emailAsyncValidator.bind(this)]
      ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      universityCompleted: ['', Validators.required],
      userProfilePhoto: ['']
    })

    this.traineeInsystemService.retreivedUserData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        if (data) {
          this.newUserForm.patchValue({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            country: data.country,
            address: data.address,
            phoneNumber: data.phoneNumber,
            universityCompleted: data.universityCompleted,
            userProfilePhoto: data.userProfilePhoto,
          });
        }
      });
  }

  onSubmit() {
    const formData = this.newUserForm;

    if(!formData.invalid) {
      this.setFirstFormState();
      this.goToSecondSection();
    }
    else {
      formData.markAllAsTouched()
    }
  }

  setFirstFormState() {
    this.traineeInsystemService.setFirstFormState(this.newUserForm.value)
  }

  emailAsyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    if (!control.value) return of(null);
    return this.traineeInsystemService.checkEmail(control.value).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(response => (response?.length ? of({ emailExists: true }) : of(null))),
      catchError(() => of(null)), 
      first()
    );
  }

  goToSecondSection() {
    this.router.navigate(['/home/admin/user-management/section-two'])
  }


  goBack() {
    this.router.navigate(['/home/admin/user-management'])
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
