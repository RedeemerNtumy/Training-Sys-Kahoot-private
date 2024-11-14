import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private userRole: string = 'trainee';

  getUserRole(): string {
    return this.userRole;
  }
}
