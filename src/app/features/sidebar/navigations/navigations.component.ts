import { Component } from '@angular/core';
import { AdminNavigationsComponent } from "../admin-navigations/admin-navigations.component";
import { TrainerNavigationsComponent } from "../trainer-navigations/trainer-navigations.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserRoleService } from '../../../services/user-role.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navigations',
  standalone: true,
  imports: [
    AdminNavigationsComponent,
    TrainerNavigationsComponent,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './navigations.component.html',
  styleUrl: './navigations.component.scss'
})
export class NavigationsComponent {
  constructor(private roleService: UserRoleService) {}

  get role() {
    return this.roleService.getUserRole();
  }
}
