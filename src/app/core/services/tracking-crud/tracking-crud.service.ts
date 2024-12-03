import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { progress } from '@core/models/progress.interface';
import { catchError,tap } from 'rxjs';
import { ErrorHandleService } from '../error-handle/error-handle.service';

@Injectable({
  providedIn: 'root'
})

export class TrackingCrudService {
  private localServer = 'http://localhost:3000/progress';
  constructor(private http:HttpClient,private errorHandle: ErrorHandleService) { }

  getAllProgress(){
    return this.http.get<progress[]>(this.localServer).pipe(
      tap((response: progress[]) => console.log('Progress from Backend:' + response)),
      catchError(this.errorHandle.handleError)
    );
  }
}
