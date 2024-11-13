import { HttpClient,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError,tap, map } from 'rxjs';
import { Ispecialization } from '../../models/specialization.interface';
import { environment } from '../../../../../environments/specializations/environment';
import { ErrorHandleService } from '../error-handle/error-handle.service';

@Injectable({
  providedIn: 'root'
})

export class SpecializationFacadeService {
  private specializationSubject = new BehaviorSubject<Ispecialization[]>([]);
  specialization$ = this.specializationSubject.asObservable();

  private sortSubject = new BehaviorSubject<'asc'|'desc'>('desc')
  sortDirection$ = this.sortSubject.asObservable();

  private hostedServer = environment.apiUrl;

  private localServer: string = 'http://localhost:3000/specializations';
  private createEndpoint: string = 'http://localhost:8089/api/specializations';

  constructor(
    private http: HttpClient,
    private errorService: ErrorHandleService
  ) {
    this.loadSpecializations();
  }

  private loadSpecializations(){
    this.getAllSpecializations()
    .pipe(
      map(specializations => this.sort(specializations))
    )
    .subscribe({
      next: (specializations)=> this.specializationSubject.next(specializations),
      error: (error) => console.error('Error occurred while fetching specializations:', error)
    })
  }

  getAllSpecializations():Observable<Ispecialization[]>{
    return this.http.get<Ispecialization[]>(`${this.localServer}`)
    .pipe(
      tap((data) => console.log(data)),
      map(specializations => this.sort(specializations)),
      catchError(this.errorService.handleError)
    );
  }


  private sort(specializations: Ispecialization[]): Ispecialization[] {
    const direction = this.sortSubject.value;
    return [...specializations].sort((a, b) => {
      const dateA = new Date(a.dateCreated).getTime();
      const dateB = new Date(b.dateCreated).getTime();
      return direction === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  toggleSort() {
    const newDirection = this.sortSubject.value === 'asc' ? 'desc' : 'asc';
    this.sortSubject.next(newDirection);
    this.loadSpecializations()
  }

  getSpecializationById(id: number):Observable<Ispecialization>{
    return this.http.get<Ispecialization>(`${this.localServer}/${id}`).pipe(
      catchError(this.errorService.handleError),
      tap(() => this.loadSpecializations())
    );
  }

  create(specialization: Ispecialization) {
    console.log('from service: creation done');
    return this.http.post(`${this.localServer}`, specialization)
    .pipe(
      catchError(this.errorService.handleError),
      tap(() => this.loadSpecializations())
    );
  }

  update(id: number,specialization: Partial<Ispecialization>){
    return this.http.patch<Ispecialization>(`${this.localServer}/${id}`,specialization)
    .pipe(
      catchError(this.errorService.handleError),
      tap(() => this.loadSpecializations())
    )
  }

  delete(id:number):Observable<void>{
    console.log('from service: delete done');
    return this.http.delete<void>(`${this.localServer}/${id}`)
    .pipe(
      catchError(this.errorService.handleError),
      tap(() => this.loadSpecializations())
    )
  }
}
