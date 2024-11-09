import { Injectable } from '@angular/core';
import { Cohort, CohortList } from '../../models/cohort.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CohortDataService {

  apiUrl: string = '';
  private mockjson = 'assets/mockjson.json' ;
  private mockjsonempty = 'assets/mockjsonempty.json' ;

  private cohortFormDataSubject = new BehaviorSubject<Cohort | null>(null);
  createCohortFormData$ : Observable<Cohort | null> = this.cohortFormDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Retriev a list of cohorts from backend 
  getAllCohorts(): Observable<CohortList[]>{
    // return this.http.get<Cohort[]>(this.apiUrl);
    // return this.http.get<CohortList[]>(this.mockjsonempty); 
    return this.http.get<CohortList[]>(this.mockjson);
  }

  // Make a post request to backend to add cohort
  addCohort(formData: Cohort) {
    return this.http.post<Cohort>(this.apiUrl, formData);
  }

  // Set data for cohortFormData Behavoir subject
  setCohortFormData(data: Cohort) {
    this.cohortFormDataSubject.next(data);
  }





}
