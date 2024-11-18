import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { DecodedToken, LoginResponse, User } from '../../models/iuser';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(
    email: string,
    password: string
  ): Observable<{ success: boolean; token?: string; message?: string }> {
    return this.http
      .post<LoginResponse>(`${environment.BaseUrl}/login`, { email, password })
      .pipe(
        map((response: LoginResponse) => {
          console.log(response.firstTime);
          if (response) {
            localStorage.setItem('token', response.token);
            const decodedToken = this.decodeToken(response.token);

            if (response.firstTime) {
              this.router.navigate(['/auth']);
            } else {
              this.routeUser(decodedToken.role);
            }
            return { success: true, token: response.token };
          } else {
            return { success: false, message: 'Invalid credentials' };
          }
        })
      );
  }

  decodeToken(token: string): { role: string; email: string } {
    const decoded: DecodedToken = jwtDecode(token);
    return { role: decoded.role, email: decoded.email };
  }

  private routeUser(role: string): void {
    if (role === 'ADMIN') {
      this.router.navigate(['/home/admin']);
    } else if (role === 'TRAINER') {
      this.router.navigate(['/home/admin/cohorts']);
    } else {
      this.router.navigate(['/home/admin/user-management']);
    }
  }
}
