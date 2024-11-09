import { Injectable } from '@angular/core';
import { Cohort, CohortList } from '../../models/cohort.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CohortDataService {

  apiUrl: string = '';
  private mockjson = 'assets/mockjson.json' ;
  private mockjsonempty = 'assets/mockjsonempty.json' ;

  constructor(private http: HttpClient) { }

  getAllCohorts(): Observable<CohortList[]>{
    // return this.http.get<Cohort[]>(this.apiUrl);
    // return this.http.get<CohortList[]>(this.mockjsonempty); 
    return this.http.get<CohortList[]>(this.mockjson);
  }

  addCohort(formData: Cohort) {
    return this.http.post<Cohort>(this.apiUrl, formData);
  }
}
