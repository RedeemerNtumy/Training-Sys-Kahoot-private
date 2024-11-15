import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../../cohort-data/error-handling/error-handler.service';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { Countries, Gender, User } from '../../../models/cohort.interface';

@Injectable({
  providedIn: 'root'
})
export class TraineeInsystemService {

  private checkUserUrl: string = "http://localhost:9000/users";
  private gendersUrl: string = "http://localhost:9000/gender";
  private countriesUrl: string = "http://localhost:9000/countries";
  
  private retreivedUserDataSubject = new BehaviorSubject<User | null>(null);
  public retreivedUserData$: Observable<User | null> = this.retreivedUserDataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
  ) { }

  // Get the email entered into the input field
  checkEmail(email: string) {
    return this.http.get<User[]>(`${this.checkUserUrl}?email=${encodeURIComponent(email)}`).pipe(
      tap(response => {
        const [data] = response;
        console.log("service: ", data)
        this.retreivedUserDataSubject.next(data);
      }),
      catchError(error => {
        this.errorHandlerService.handleError(error);
        return [];
      })
    )
  }

  getGenders() {
    return this.http.get<Gender[]>(this.gendersUrl).pipe(
      catchError(error => this.errorHandlerService.handleError(error))
    )
  }

  getCountries() {
    return this.http.get<Countries[]>(this.countriesUrl).pipe(
      catchError(error => this.errorHandlerService.handleError(error))
    )
  }

  

}
