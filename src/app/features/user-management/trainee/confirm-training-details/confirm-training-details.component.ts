import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { Specialization, Cohort } from '../../../../core/models/cohort.interface';
import { TraineeInsystemService } from '../../../../core/services/user-management/trainee/trainee-insystem.service';
import { UserManagementTraineeService } from '../../../../core/services/user-management/trainee/user-management-trainee.service';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-confirm-training-details',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, AsyncPipe],
  templateUrl: './confirm-training-details.component.html',
  styleUrl: './confirm-training-details.component.scss'
})
export class ConfirmTrainingDetailsComponent {
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
      specialization: [{value: '', disabled: true}, Validators.required],
      cohort: [{value: '', disabled: true}, Validators.required],
      enrollementDate: [{value: '', disabled: true}, Validators.required],
      trainingId: [{value: '', disabled: true}, Validators.required]
    })

    this.allSpecializations$ = this.userManagementTraineeService.getAllspecializations();
    this.allCohorts$ = this.userManagementTraineeService.getAllCohorts();
     
    this.traineeInSystemService.secondFormState$.subscribe(data => {
      if(data) {
        this.newUserFormSecTwo.patchValue({
          specialization: data.specialization,
          cohort: data.cohort,
          enrollementDate: data.enrollmentDate,
          trainingId: data.trainingId,
        })
      }
    })

  }

  onSubmit() {
    if(this.newUserFormSecTwo.valid) {
      combineLatest([
        this.traineeInSystemService.firstFormState$,
        this.traineeInSystemService.secondFormState$
      ]).subscribe(([firstFormState, secondFormState]) => {
      
        // Combine or process the states as needed
        const combinedState = { ...firstFormState, ...secondFormState };
      });
    }
  }

  cancel() {
    this.router.navigate(['/home/admin/user-management/section-two'])
  }
  
  goBack() {
    this.router.navigate(['/home/admin/user-management/confirm-contacts'])
  }
}
