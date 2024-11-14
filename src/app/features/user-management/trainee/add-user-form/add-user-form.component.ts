import { Component } from '@angular/core';
import { InputFieldComponent } from '../../../../core/shared/input-field/input-field.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user-form',
  standalone: true,
  imports: [InputFieldComponent, ReactiveFormsModule],
  templateUrl: './add-user-form.component.html',
  styleUrl: './add-user-form.component.scss'
})
export class AddUserFormComponent {

  newUserForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.newUserForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      universityCompleted: ['', Validators.required],
      userProfilePhoto: ['']
    })
  }

  onSubmit() {
    this.goToSecondSection();
  }


  goToSecondSection() {
    this.router.navigate(['/home/admin/user-management/section-two'])
  }


  goBack() {
    this.router.navigate(['/home/admin/user-management'])
  }
  

}
