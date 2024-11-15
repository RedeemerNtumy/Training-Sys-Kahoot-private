import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cohort, Specialization, User } from '../../../../core/models/cohort.interface';
import { Observable, of } from 'rxjs';
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
      enrollmentDate: ['', Validators.required],
      trainingId: ['', Validators.required]
    })

    this.allSpecializations$ = this.userManagementTraineeService.getAllspecializations();
    this.allCohorts$ = this.userManagementTraineeService.getAllCohorts();
     
    this.traineeInSystemService.retreivedUserData$.subscribe(data => {
      if(data) {
        console.log("data: ", data)
        this.newUserFormSecTwo.patchValue({
          specialization: data.specialization,
          cohort: data.cohort,
          enrollementDate: data.enrollmentDate,
          trainingId: data.trainingId,
        })
      }
    })
    

  }


  // Get specializations and cohort for from form
  get specialization(): FormArray {
    return this.newUserFormSecTwo.get('specialization') as FormArray;
  }
  get cohort(): FormArray {
    return this.newUserFormSecTwo.get('cohort') as FormArray;
  }
  
  goBack() {
    this.router.navigate(['/home/admin/user-management/add-user-form'])
  }
}
