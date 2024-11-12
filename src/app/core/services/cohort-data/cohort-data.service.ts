import { Injectable } from '@angular/core';
import { Cohort, CohortDetails, CohortList } from '../../models/cohort.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CohortDataService {

  private apiUrl: string = '';
  private mockupdateCohortData = 'assets/mockupdatecohort.json'

  private cohortsListUrl: string = 'http://localhost:9000/cohortsList';
  private cohortFormsDataUrl: string = 'http://localhost:9000/cohortsFormData/25';
  private cohortsDetailsUrl: string = 'http://localhost:8000/cohortDetails';

  selectedCohortId: string = "1";
  selectedCohortForUpdate: string = "";

  private cohortFormDataSubject = new BehaviorSubject<Cohort | null>(null);
  createCohortFormData$ : Observable<Cohort | null> = this.cohortFormDataSubject.asObservable();

  private cohortDetailsSubject = new BehaviorSubject<CohortDetails[] | null>(null);
  cohortDetails$ : Observable<CohortDetails[] | null> = this.cohortDetailsSubject.asObservable();

  constructor(private http: HttpClient) { }

  //(HTTP Request) Retriev a list of cohorts from backend 
  getAllCohorts(): Observable<CohortList[]>{ 
    return this.http.get<CohortList[]>(this.cohortsListUrl);
  }

  //(HTTP Request) Make a post request to backend to add cohort
  addCohort(formData: Cohort) {
    const form = { ...formData }
    form['traineesEnrolled'] = 0;
    return this.http.post<CohortList>(this.cohortsListUrl, form);
  }

  //(HTTP Request) Make a post request to backend for Cohort Details including trainee list
  getSelectedCohortDetails() {
    return this.http.get<CohortDetails>(this.cohortsDetailsUrl)
  }

  //(HTTP Request) Get cohort for update
  getCohortFormData(): Observable<Cohort> {
    // return this.http.get<Cohort>(`${this.cohortFormsDataUrl}/${selectedCohortForUpdate}`);
    return this.http.get<Cohort>(`${this.cohortFormsDataUrl}`);
  }

  updateCohort(formData: Cohort) {
    console.log("form data: ", formData)
    return this.http.put<Cohort>(`${this.cohortFormsDataUrl}`, formData);
  }


  // private selectedCohortFormFromUpdateSubject = new BehaviorSubject<Cohort | null>(null);
  // selectedCohortFormFromUpdate$ : Observable<Cohort | null> = this.selectedCohortFormFromUpdateSubject.asObservable();


  // setCohortFormDataFromUpate() {
  //   this.selectedCohortFormFromUpdate$ = this.http.get<Cohort>(this.mockupdateCohortData)
  //   this.selectedCohortFormFromUpdate$.subscribe(data => {
  //     this.setCohortFormData(data || null);
  //   })
  // }


  // Set data for cohortFormData Behavoir subject
  setCohortFormData(data: Cohort | null) {
    this.cohortFormDataSubject.next(data);
  }


  





}
