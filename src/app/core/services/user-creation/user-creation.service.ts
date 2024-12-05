import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserCreationService {
  private apiUrl = `${environment.BaseUrl}/auth/reset-password`;

  constructor(private http: HttpClient) {}

  createUser(
    password: string,
    confirmPassword: string,
    token: string
  ): Observable<any> {
    const body = { newPassword: password, confirmPassword };
    return this.http.put(this.apiUrl, body, { responseType: 'text' }).pipe(
      map((response) => {
        try {
          return JSON.parse(response);
        } catch (e) {
          return response;
        }
      })
    );
  }
}
