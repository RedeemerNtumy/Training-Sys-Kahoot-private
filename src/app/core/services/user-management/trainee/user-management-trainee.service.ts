import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserManagementTraineeService {

  private apiUrl = "";

  constructor(
    private http: HttpClient,
  ) { }

  checkAccountExistence() {
    this.http.get<any>(this.apiUrl);
  }

}
