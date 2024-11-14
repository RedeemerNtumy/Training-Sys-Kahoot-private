import { Component } from '@angular/core';
import { InputFieldComponent } from '../../../../core/shared/input-field/input-field.component';

@Component({
  selector: 'app-add-user-form',
  standalone: true,
  imports: [InputFieldComponent],
  templateUrl: './add-user-form.component.html',
  styleUrl: './add-user-form.component.scss'
})
export class AddUserFormComponent {
  

}
