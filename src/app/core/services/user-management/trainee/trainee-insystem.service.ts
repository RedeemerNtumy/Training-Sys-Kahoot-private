import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../../cohort-data/error-handling/error-handler.service';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { Countries, Gender, User } from '../../../models/cohort.interface';

@Injectable({
  providedIn: 'root'
})
export class TraineeInsystemService {

  // testUrl: string = 'http://localhost:9000/cohortsList';
  private checkUserUrl: string = "http://localhost:9000/users";
  private gendersUrl: string = "http://localhost:9000/gender";
  private countriesUrl: string = "http://localhost:9000/countries";

  public retreivedUserDataSubject = new BehaviorSubject<User | null>(null);
  public retreivedUserData$: Observable<User | null> = this.retreivedUserDataSubject.asObservable();
  public userDataRetrieved!: boolean;

  public finalFormStateSubject = new BehaviorSubject<User | null>(null);
  public finalFormState$: Observable<User | null> = this.finalFormStateSubject.asObservable();
  // public finalFormData!: User | null;

  private firstFormStateSubject = new BehaviorSubject<User | null>(null);
  public firstFormState$: Observable<User | null> = this.firstFormStateSubject.asObservable();

  private secondFormStateSubject = new BehaviorSubject<User | null>(null);
  public secondFormState$: Observable<User | null> = this.secondFormStateSubject.asObservable();

  private allTraineesSubject = new BehaviorSubject<User[] | null>(null);
  public allTrainees$: Observable<User[] | null> = this.allTraineesSubject.asObservable();

  private selectedTraineesSubject = new BehaviorSubject<User | null>(null);
  public selectedTrainee$: Observable<User | null> = this.selectedTraineesSubject.asObservable();

  deleteModalSuccessful!: boolean;

  

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
  ) { }

  // Get the email entered into the input field
  checkEmail(email: string) {
    return this.http.get<User[]>(`${this.checkUserUrl}?email=${encodeURIComponent(email)}`).pipe(
      tap(response => {
        const [data] = response;
        this.retreivedUserDataSubject.next(data);
        this.userDataRetrieved = true;
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

  setFinalFormState(data: User) {
    this.finalFormStateSubject.next(data);
  }

  setFirstFormState(data: User) {
    this.firstFormStateSubject.next(data);
  }

  setSecondFormState(data: User) {
    this.secondFormStateSubject.next(data);
  }


  //Usermanagment add user requests
  //Put request to backend
  updateUserData(updateFormData: {}, email: string | undefined) {
    return this.http.put<User>(`${this.checkUserUrl}?email=${encodeURIComponent(email || '')}`, updateFormData).pipe(
      tap(() => {
        this.firstFormStateSubject.next(null)
        this.secondFormStateSubject.next(null)
      }),
      catchError(error => this.errorHandlerService.handleError(error))
    )
  }

  createNewUser(newFormData: {}, email: string | undefined) {
    return this.http.post<User>(`${this.checkUserUrl}?email=${encodeURIComponent(email || '')}`, newFormData).pipe(
      tap(() => {
        this.firstFormStateSubject.next(null)
        this.secondFormStateSubject.next(null)
      }),
      catchError(error => this.errorHandlerService.handleError(error))
    )
  }


  getAllTrainees() {
    return this.http.get<User[]>(this.checkUserUrl).pipe(
      tap((response) => {
        this.allTraineesSubject.next(response)
      }),
      catchError(error => this.errorHandlerService.handleError(error))
    )
  }

  getSelectedTrainee(trainee: User) {
    this.selectedTraineesSubject.next(trainee)
  }

  deleteSelectedTrainee(email: string) {
    return this.http.delete<User>(`${this.checkUserUrl}?email=${encodeURIComponent(email)}`).pipe(
      tap((response) => {
        console.log(response);
        this.deleteModalSuccessful = true;
      }),
      catchError(error => this.errorHandlerService.handleError(error))
    )
  }
  

}
