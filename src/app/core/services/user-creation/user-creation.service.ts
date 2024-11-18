import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserCreationService {
  private apiUrl = `${environment.BaseUrl}/reset-password`;

  constructor(private http: HttpClient) {}

  createUser(password: string): Observable<any> {
    return this.http.put(this.apiUrl, password);
  }
}
