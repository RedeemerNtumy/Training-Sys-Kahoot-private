import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Ispecialization } from '../../models/specialization.interface';

@Injectable({
  providedIn: 'root'
})

export class SpecializationFacadeService {
  private createEndpoint: string = 'http://localhost:8089/api/specializations';

  constructor(private http: HttpClient) { }

  create(specialization: Ispecialization) {
    return this.http.post(this.createEndpoint, specialization).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
