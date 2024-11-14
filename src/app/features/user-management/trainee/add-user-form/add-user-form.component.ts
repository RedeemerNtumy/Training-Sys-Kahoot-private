import { Component } from '@angular/core';
import { InputFieldComponent } from '../../../../core/shared/input-field/input-field.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user-form',
  standalone: true,
  imports: [InputFieldComponent],
  templateUrl: './add-user-form.component.html',
  styleUrl: './add-user-form.component.scss'
})
export class AddUserFormComponent {

  newUserForm!: FormGroup;

  constructor(
    private ft: FormBuilder,
    private router: Router,
  ) {}

}
