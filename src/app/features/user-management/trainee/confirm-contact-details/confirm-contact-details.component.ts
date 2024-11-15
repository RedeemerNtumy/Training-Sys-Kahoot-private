import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, switchMap, catchError, first } from 'rxjs';
import { Gender, Countries, User } from '../../../../core/models/cohort.interface';
import { TraineeInsystemService } from '../../../../core/services/user-management/trainee/trainee-insystem.service';

@Component({
  selector: 'app-confirm-contact-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './confirm-contact-details.component.html',
  styleUrl: './confirm-contact-details.component.scss'
})
export class ConfirmContactDetailsComponent {
  newUserFormConfirm!: FormGroup;
  genders$!: Observable<Gender[]>;
  countries$!: Observable<Countries[]>;
  // changedFormState!: User;
  disabled: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public traineeInsystemService: TraineeInsystemService,
  ) {}

  ngOnInit() {

    this.newUserFormConfirm = this.fb.group({
      email: ['',Validators.required, Validators.email],
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
        this.newUserFormConfirm.patchValue({
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

  setChangedFormData() {
    this.traineeInsystemService.setChangedFormState(this.newUserFormConfirm.value)
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

  next() {
    this.router.navigate(['home/admin/user-management/confirm-contact'])
  }

  cancel() {

  }


  goBack() {
    this.router.navigate(['/home/admin/user-management'])
  }
}
