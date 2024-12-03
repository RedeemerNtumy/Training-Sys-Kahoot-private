import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cohort, Specialization } from '../../../../core/models/cohort.interface';
import { Observable, first, of, switchMap } from 'rxjs';
import { UserManagementTraineeService } from '../../../../core/services/user-management/trainee/user-management-trainee.service';
import { TraineeInsystemService } from '../../../../core/services/user-management/trainee/trainee-insystem.service';

@Component({
  selector: 'app-add-user-form-section-2',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, FormsModule, NgIf, AsyncPipe, JsonPipe],
  templateUrl: './add-user-form-section-2.component.html',
  styleUrl: './add-user-form-section-2.component.scss'
})
export class AddUserFormSection2Component {

  newUserFormSecTwo!: FormGroup;
  allSpecializations$!: Observable<Specialization[]>;
  allCohorts$!: Observable<Cohort[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public userManagementTraineeService: UserManagementTraineeService,
    public traineeInSystemService: TraineeInsystemService,
  ) {}

  ngOnInit() {
    this.newUserFormSecTwo = this.fb.group({
      specialization: ['', Validators.required],
      cohort: ['', Validators.required],
      enrollementDate: ['', Validators.required],
      status: ['', Validators.required],
      // trainingId: ['', Validators.required]
    })

    this.traineeInSystemService.secondFormState$
    .pipe(
      first(), // Ensure we only subscribe once
      switchMap(secondFormState => {
        if (secondFormState) {
          return of(secondFormState); // Use firstFormState if available
        }
        return this.traineeInSystemService.retreivedUserData$; // Otherwise fallback to retrievedUserData$
      })
    )
    .subscribe(data => {
      if (data) {
        this.newUserFormSecTwo.patchValue(data);
      }
    });

    this.allSpecializations$ = this.userManagementTraineeService.getAllspecializations();
    this.allCohorts$ = this.userManagementTraineeService.getAllCohorts();

  }

  onSubmit() {
    const formData = this.newUserFormSecTwo;

    if(!formData.invalid) {
      this.setSecondFormState()
      this.goToConfirmPage();
    }
    else {
      formData.markAllAsTouched();
    }
  }

  setSecondFormState() {
    this.traineeInSystemService.setSecondFormState(this.newUserFormSecTwo.value)
  }

  goToConfirmPage() {
    this.router.navigate(['home/admin/user-management/confirm-contacts'])
  }
  
  goBack() {
    this.router.navigate(['/home/admin/user-management/add-user-form'])
  }


  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
