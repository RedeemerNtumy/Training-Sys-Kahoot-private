import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { curriculum } from '@core/models/curriculum.interface';
import { ErrorHandleService } from '../error-handle/error-handle.service';
import { catchError, Observable,tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CurriculumCrudService {
  private localServer = 'http://localhost:3000/curriculums';

  constructor(private http: HttpClient,
    private errorService: ErrorHandleService
  ) {
    
   }

  getAllCurriculums():Observable<curriculum[]> {
    return this.http.get<curriculum[]>(this.localServer)
    .pipe(
      tap((response: any) => console.log('Specializations from Backend:' + response)),
      catchError(this.errorService.handleError)
    );
  }

  getCurriculumById(id: number): Observable<curriculum> {
    const url = `${this.localServer}${id}`;
    return this.http.get<curriculum>(url)
  }

  createCurriculum(curriculum: curriculum){
    return this.http.post(this.localServer,curriculum)
  }

  updateCurriculum(id: number, curriculum: curriculum): Observable<any> {
    const url = `${this.localServer}${id}`;
    return this.http.put(url, curriculum)
  }

  deleteCurriculum(id: number): Observable<any> {
    const url = `${this.localServer}${id}`;
    return this.http.delete(url)
  }
}
