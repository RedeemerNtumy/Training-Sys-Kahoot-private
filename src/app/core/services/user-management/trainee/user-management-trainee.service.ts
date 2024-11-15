import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cohort, Specialization } from '../../../models/cohort.interface';
import { ErrorHandlerService } from '../../cohort-data/error-handling/error-handler.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementTraineeService {

  private allspecializations = "http://localhost:9000/allSpecilizations";
  private allcohorts = "http://localhost:9000/allCohorts";

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
  ) { }

  getAllspecializations() {
    return this.http.get<Specialization[]>(this.allspecializations).pipe(
      catchError(error => this.errorHandlerService.handleError(error))
    )
  }

  getAllCohorts() {
    return this.http.get<Cohort[]>(this.allcohorts).pipe(
      catchError(error => this.errorHandlerService.handleError(error))
    )
  }

  // checkAccountExistence() {
  //   this.http.get<User>(this.apiUrl);
  // }

}
