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

  isModalOpen: boolean = false;

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
      status: [{value: '', disabled: true}, Validators.required],
      // trainingId: [{value: '', disabled: true}, Validators.required]
    })

    this.allSpecializations$ = this.userManagementTraineeService.getAllspecializations();
    this.allCohorts$ = this.userManagementTraineeService.getAllCohorts();
     
    this.traineeInSystemService.secondFormState$.subscribe(data => {
      if(data) {
        const capitalizedStatus = this.capitalizeFirstLetter(data.status);
        this.newUserFormSecTwo.patchValue({
          specialization: data.specialization,
          cohort: data.cohort,
          enrollementDate: data.enrollementDate,
          status: capitalizedStatus,
          // trainingId: data.trainingId,
        }) 
      }

    })

  }

  onSubmit() {
    if(this.traineeInSystemService.userDataRetrieved) {

      // this.toggleModal();

      combineLatest([
        this.traineeInSystemService.firstFormState$,
        this.traineeInSystemService.secondFormState$
      ]).subscribe(([firstFormState, secondFormState]) => {
      
        // Combine or process the states as needed
        const combinedState = { ...firstFormState, ...secondFormState };
        this.traineeInSystemService.updateUserData(combinedState, combinedState.email)
      });
    }
    else if(this.newUserFormSecTwo.valid && !this.traineeInSystemService.userDataRetrieved) {
      // this.toggleModal();

      combineLatest([
        this.traineeInSystemService.firstFormState$,
        this.traineeInSystemService.secondFormState$
      ]).subscribe(([firstFormState, secondFormState]) => {
      
        // Combine or process the states as needed
        const combinedState = { ...firstFormState, ...secondFormState };
        if(this.traineeInSystemService.retreivedUserData$){

        }
        else { 
          this.traineeInSystemService.createNewUser(combinedState);
        }
      });

      
    }
    else {

    }
  }

  cancel() {
    this.router.navigate(['/home/admin/user-management/section-two'])
  }
  
  goBack() {
    this.router.navigate(['/home/admin/user-management/confirm-contacts'])
  }

  private capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  closeModal() {
    this.toggleModal()
    this.routeToUserList();
  }

  routeToUserList() {
    this.router.navigate(['/home/admin/user-management']);
  }
}
