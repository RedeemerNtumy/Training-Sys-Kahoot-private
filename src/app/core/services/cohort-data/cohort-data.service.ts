import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CohortDataService {

  apiUrl: string = '';

  constructor() { }

  getAllCohorts() {
    return this.http.get<Cohort[]>(this.apiUrl);
  }

  addCohort(formData: Cohort) {
    return this.http.post<Cohort>(this.apiUrl, formData);
  }
}
