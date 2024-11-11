import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password }).pipe(
      map((response: any) => {
        if (response.email === email && response.password === password) {
          localStorage.setItem('token', response.token);
          return { success: true, token: response.token };
        } else {
          return { success: false, message: 'Invalid credentials' };
        }
      })
    );
  }
}
