import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  constructor(
    private router: Router
  ) {}

  goToAddUserForm() {
    this.router.navigate(['/home/admin/user-management/add-user-form'])
  }

}
