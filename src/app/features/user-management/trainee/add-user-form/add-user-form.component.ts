import { Component } from '@angular/core';
import { InputFieldComponent } from '../../../../core/shared/input-field/input-field.component';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TraineeInsystemService } from '../../../../core/services/user-management/trainee/trainee-insystem.service';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, first, switchMap, takeUntil } from 'rxjs';
import { Countries, Gender, User } from '../../../../core/models/cohort.interface';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-add-user-form',
  standalone: true,
  imports: [InputFieldComponent, ReactiveFormsModule, FormsModule, AsyncPipe, NgFor],
  templateUrl: './add-user-form.component.html',
  styleUrl: './add-user-form.component.scss'
})
export class AddUserFormComponent {

  newUserForm!: FormGroup;
  genders$!: Observable<Gender[]>;
  countries$!: Observable<Countries[]>;
  // changedFormState!: User;

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

    this.traineeInsystemService.retreivedUserData$.subscribe(data => {
      const userdata = data;
      
      if(data) {
        console.log(userdata?.country)
        this.newUserForm.patchValue({
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
    })
  }

  onSubmit() {
    this.setChangedFormData();
    this.goToSecondSection();
  }

  setChangedFormData() {
    this.traineeInsystemService.setChangedFormState(this.newUserForm.value)
  }


  emailAsyncValidator(control: AbstractControl): Observable<User[] | null> {
    return control.valueChanges.pipe(
      debounceTime(500), 
      distinctUntilChanged(),
      switchMap(value => {
        return this.traineeInsystemService.checkEmail(value).pipe(
          catchError(() => {
            return []; 
          })
        );
      }),
      first()
    );
  }


  goToSecondSection() {
    this.router.navigate(['/home/admin/user-management/section-two'])
  }


  goBack() {
    this.router.navigate(['/home/admin/user-management'])
  }

}
