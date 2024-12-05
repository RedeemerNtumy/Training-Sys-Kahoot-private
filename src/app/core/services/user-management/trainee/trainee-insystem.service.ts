import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../../cohort-data/error-handling/error-handler.service';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { User } from '../../../models/cohort.interface';
import { environment } from 'src/environments/environment.development';
import { TraineeList } from '@core/models/trainee.interface';

@Injectable({
  providedIn: 'root'
})
export class TraineeInsystemService {

  private baseUrl: string = environment.BaseUrl;
  // private testUrl: string = "https://kahoot.free.beeceptor.com";
  private testUrl: string = "https://caddecf8452c57366047.free.beeceptor.com";
  // private testUrl: string = "https://mock.apidog.com/m1/752755-729898-default";

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
    return this.http.get<User[]>(`${this.baseUrl}?email=${encodeURIComponent(email)}`).pipe(
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
    return this.http.put<User>(`${this.baseUrl}?email=${encodeURIComponent(email || '')}`, updateFormData).pipe(
      tap(() => {
        this.firstFormStateSubject.next(null)
        this.secondFormStateSubject.next(null)
      }),
      catchError(error => this.errorHandlerService.handleError(error))
    )
  }

  createNewUser(formData: FormData) {
    return this.http.post<User>(`${this.baseUrl}/users/trainee/create`, formData).pipe(
      tap(() => {
        // Reset form states
        this.firstFormStateSubject.next(null);
        this.secondFormStateSubject.next(null);
        console.log('Submitting trainee details to API');
      }),
      catchError((error) => {
        console.error('Error creating user:', error);
        return throwError(() => new Error("Failed to create user"));
      })
    );
  }
  

  // For testing
  getAllTrainees() { 
    return this.http.get<TraineeList>(`${this.testUrl}/profiles/trainees`).pipe(
      map(res => {
        const trainees = res.content;
        return trainees;
      }),
      tap((trainees) => {
        this.allTraineesSubject.next(trainees)
      }),
      catchError(error => this.errorHandlerService.handleError(error))
    )
  }

  getSelectedTrainee(trainee: User) {
    this.selectedTraineesSubject.next(trainee)
  }

  deleteSelectedTrainee(email: string) {
    return this.http.delete<User>(`${this.baseUrl}?email=${encodeURIComponent(email)}`).pipe(
      tap((response) => {
        console.log(response);
        this.deleteModalSuccessful = true;
      }),
      catchError(error => this.errorHandlerService.handleError(error))
    )
  }
  

}
