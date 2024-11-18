import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TraineeInsystemService } from '../../../../core/services/user-management/trainee/trainee-insystem.service';

@Component({
  selector: 'app-trainee-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './trainee-profile.component.html',
  styleUrl: './trainee-profile.component.scss'
})
export class TraineeProfileComponent implements OnInit {

  traineeProfileForm!: FormGroup;
  isdisabled: boolean = true;

  constructor(
    private fb: FormBuilder,
    private traineeInSystemService: TraineeInsystemService,
  ) {}

  ngOnInit() {


    this.traineeProfileForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      trainingId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      universityCompleted: ['', Validators.required],
      specialization: ['', Validators.required],
      enrollementDate: ['', Validators.required],
      status: ['', Validators.required],
      userProfilePhoto: ['']
    })
    
    this.traineeInSystemService.selectedTrainee$
    .subscribe((data)=> {
      console.log(data)
      if (data) {
        this.traineeProfileForm.patchValue({
          email: data.email,
          trainingId: data.trainingId,
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          country: data.country,
          address: data.address,
          phoneNumber: data.phoneNumber,
          universityCompleted: data.universityCompleted,
          specialization: data.specialization,
          enrollementDate: data.enrollementDate,
          status: data.status,
          userProfilePhoto: data.userProfilePhoto
        });
      }
    });

  }

  toggleEditForm() {
    this.isdisabled = !this.isdisabled;
    this.isdisabled ? this.traineeProfileForm.disable() : this.traineeProfileForm.enable();
  }
    
}


