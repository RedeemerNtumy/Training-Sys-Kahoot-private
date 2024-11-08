import { Injectable } from '@angular/core';
import { Cohort } from '../../models/cohort.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CohortDataService {

  apiUrl: string = '';

  constructor(private http: HttpClient) { }

  getAllCohorts() {
    return this.http.get<Cohort[]>(this.apiUrl);
  }

  addCohort(formData: Cohort) {
    return this.http.post<Cohort>(this.apiUrl, formData);
  }
}
