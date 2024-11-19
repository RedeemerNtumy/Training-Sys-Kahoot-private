import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/specializations/environment';
import { HttpClient } from '@angular/common/http';
import {  catchError, Observable,tap } from 'rxjs';
import { IContentResponse, Ispecialization } from '../../models/specialization.interface';
import { ErrorHandleService } from '../error-handle/error-handle.service';

@Injectable({
  providedIn: 'root'
})

export class SpecializationCrudService {
  private hostedServer = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private errorService: ErrorHandleService
  ) { }

  getAllSpecializations():Observable<IContentResponse<Ispecialization[]>>{
    return this.http.get<IContentResponse<Ispecialization[]>>(`${this.hostedServer}specializations`)
    .pipe(
      tap((response) => console.log('Specializations from Backend:', response.content)),
      catchError(this.errorService.handleError)
    );
  }

  getSpecializationById(id: number):Observable<Ispecialization>{
    const url = `${this.hostedServer}specializations/${id}`;
    return this.http.get<Ispecialization>(url)
  }

  createSpecialization(specialization: Ispecialization){
    const url = `${this.hostedServer}specializations`
    return this.http.post(url, specialization)
  }

  updateSpecialization(id: number, specialization: Partial<Ispecialization>):Observable<Ispecialization>{
    const url = `${this.hostedServer}specializations/${id}`;
    return this.http.put<Ispecialization>(url, specialization)
  }

  deleteSpecialization(id: number):Observable<void>{
    const url = `${this.hostedServer}specializations/${id}`;
    return this.http.delete<void>(url)
  }
}
