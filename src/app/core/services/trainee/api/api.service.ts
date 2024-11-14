import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandleService } from '../../error-handle/error-handle.service';
import { catchError,tap } from 'rxjs';
import { ILearningMaterial } from '../../../models/courses.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private localServer: string = 'http://localhost:3000/courses'
  constructor(private http: HttpClient,
    private errorHandle: ErrorHandleService
  ) {}

  getLearningMaterials() {
    return this.http.get<ILearningMaterial[]>(this.localServer)
    .pipe(
      catchError(this.errorHandle.handleError)
    )
  }
}
