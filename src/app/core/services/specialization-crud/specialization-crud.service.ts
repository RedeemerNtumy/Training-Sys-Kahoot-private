import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import {
  ContentResponse,
  specialization,
} from '../../models/specialization.interface';
import { ErrorHandleService } from '../error-handle/error-handle.service';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SpecializationCrudService {
  private hostedServer = environment.BaseUrl;

  constructor(
    private http: HttpClient,
    private errorService: ErrorHandleService
  ) {}

  getAllSpecializations(): Observable<ContentResponse<specialization[]>> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http
      .get<ContentResponse<specialization[]>>(
        `${this.hostedServer}/specializations`,
        { headers }
      )
      .pipe(
        tap((response) =>
          console.log('Specializations from Backend:', response.content)
        ),
        catchError(this.errorService.handleError)
      );
  }

  getSpecializationById(id: number): Observable<specialization> {
    const url = `${this.hostedServer}/specializations/${id}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get<specialization>(url, { headers });
  }

  createSpecialization(specialization: specialization) {
    const url = `${this.hostedServer}/specializations`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.post(url, specialization, { headers });
  }

  updateSpecialization(
    id: number,
    specialization: Partial<specialization>
  ): Observable<specialization> {
    const url = `${this.hostedServer}/specializations/${id}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.put<specialization>(url, specialization, { headers });
  }

  deleteSpecialization(id: number): Observable<void> {
    const url = `${this.hostedServer}/specializations/${id}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.delete<void>(url, { headers });
  }
}
