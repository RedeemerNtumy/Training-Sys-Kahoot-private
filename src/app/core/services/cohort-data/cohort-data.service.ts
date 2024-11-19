import { Injectable } from '@angular/core';
import { Cohort, CohortDetails, CohortList, Specialization } from '../../models/cohort.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { ErrorHandlerService } from './error-handling/error-handler.service';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CohortDataService {

  private apiUrl: string = '';
  private mockupdateCohortData = 'assets/mockupdatecohort.json'

  // private cohortsListUrl: string = 'http://localhost:9000/cohortsList';
  private cohortsListUrl: string = `${environment.BaseUrl}/cohorts`;
  private cohortFormsDataUrl: string = 'http://localhost:9000/cohortsFormData/25';
  private cohortsDetailsUrl: string = 'http://localhost:9000/cohortDetails';
  private specializationsUrl: string = 'http://localhost:9000/allSpecilizations';

  selectedCohortId: string = "1";
  selectedCohortForUpdate: string = "";

  private cohortFormDataSubject = new BehaviorSubject<Cohort | null>(null);
  createCohortFormData$ : Observable<Cohort | null> = this.cohortFormDataSubject.asObservable();

  private cohortDetailsSubject = new BehaviorSubject<CohortDetails[] | null>(null);
  cohortDetails$ : Observable<CohortDetails[] | null> = this.cohortDetailsSubject.asObservable();

  constructor(
    private http: HttpClient,
    public errorhandlerService: ErrorHandlerService
    ) { }

  
  //(HTTP Request) Retriev a list of cohorts from backend 
  // getAllCohorts(): Observable<CohortList[]>{ 
  //   return this.http.get<CohortList[]>(this.cohortsListUrl).pipe(
  //     tap((response: any) => {
  //       console.log("allcohorts: ", response);
  //     }),
  //     catchError(error => this.errorhandlerService.handleError(error))
  //   )
  // }
  getAllCohorts(): Observable<CohortList[]> { 
    const headers = new HttpHeaders({
      "ngrok-skip-browser-warning": "69420"
    });
  
    return this.http.get<CohortList[]>(this.cohortsListUrl, { headers }).pipe(
      tap((response: CohortList[]) => {
        console.log("allcohorts: ", response);
      }),
      catchError(error => this.errorhandlerService.handleError(error))
    );
  }
  


  //(HTTP Request) Make a post request to backend to add cohort
  addCohort(formData: Cohort) {
    const form = { ...formData }
    form['traineesEnrolled'] = 0;
    return this.http.post<CohortList>(this.cohortsListUrl, form);
  }

  //(HTTP Request) Make a post request to backend for Cohort Details including trainee list
  getSelectedCohortDetails() {
    return this.http.get<CohortDetails>(this.cohortsDetailsUrl).pipe(
      catchError(error => this.errorhandlerService.handleError(error))
    )
  }

  //(HTTP Request) Get cohort for update
  getCohortFormData(): Observable<Cohort> {
    return this.http.get<Cohort>(`${this.cohortFormsDataUrl}`).pipe(
      catchError(error => this.errorhandlerService.handleError(error))
    )
  }

  updateCohort(formData: Cohort) {
    return this.http.put<Cohort>(`${this.cohortFormsDataUrl}`, formData).pipe(
      catchError(error => this.errorhandlerService.handleError(error))
    )
  }

  deleteCohort(id: string) {
    return this.http.delete<CohortList>(`${this.cohortsListUrl}/${id}`).pipe(
      catchError(error => this.errorhandlerService.handleError(error))
    )
  }

  getAllSpecializations() {  
    return this.http.get<Specialization[]>(this.specializationsUrl).pipe(
      catchError(error => this.errorhandlerService.handleError(error))
    )
  }

  // Set data for cohortFormData Behavoir subject
  setCohortFormData(data: Cohort | null) { 
    this.cohortFormDataSubject.next(data);
  }



}
