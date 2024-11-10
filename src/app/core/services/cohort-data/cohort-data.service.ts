import { Injectable } from '@angular/core';
import { Cohort, CohortList, TraineeList } from '../../models/cohort.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CohortDataService {

  apiUrl: string = '';
  private mockjson = 'assets/mockjson.json' ;
  private mockjsonempty = 'assets/mockjsonempty.json' ;
  private mocktraineelist = 'assets/mocktraineelist.json';

  private cohortFormDataSubject = new BehaviorSubject<Cohort | null>(null);
  createCohortFormData$ : Observable<Cohort | null> = this.cohortFormDataSubject.asObservable();

  selectedCohortFromList$!: Observable<CohortList>;

  constructor(private http: HttpClient) { }

  //(HTTP Request) Retriev a list of cohorts from backend 
  getAllCohorts(): Observable<CohortList[]>{
    // return this.http.get<Cohort[]>(this.apiUrl);
    // return this.http.get<CohortList[]>(this.mockjsonempty); 
    return this.http.get<CohortList[]>(this.mockjson);
  }

  //(HTTP Request) Make a post request to backend to add cohort
  addCohort(formData: Cohort) {
    return this.http.post<Cohort>(this.apiUrl, formData);
  }

  //(HTTP Request) getSelectedCohortDetails from backend - on refactoring, remember to add (id: number) to parameters
  getSelectedChortTraineeList(id: number) {
    return this.http.get<TraineeList[]>(this.mocktraineelist)
    // return this.http.get<CohortList>(`${this.apiUrl}/${id}`)
  }




  // Set data for cohortFormData Behavoir subject
  setCohortFormData(data: Cohort) {
    this.cohortFormDataSubject.next(data);
  }

  // getSeletedCohortFromList() {
  //   return this.selectedCohortFromList$;
  // }

  





}
