import { Injectable } from '@angular/core';
import { curriculum } from '@core/models/curriculum.interface';
import { BehaviorSubject } from 'rxjs';
import { ErrorHandleService } from '../error-handle/error-handle.service';
import { CurriculumCrudService } from '../curriculum-crud/curriculum-crud.service';

@Injectable({
  providedIn: 'root'
})
export class CurriculumFacadeService {
  private curriculumSubject = new BehaviorSubject<curriculum[]>([]);
  curriculum$ = this.curriculumSubject.asObservable();

  constructor(private errorService: ErrorHandleService,
    private curriculumCrud: CurriculumCrudService
  ) {
    this.loadCurriculum()
  }

  private loadCurriculum(){
    this.curriculumCrud.getAllCurriculums()
    .subscribe({
      next: (curriculums) => this.curriculumSubject.next(curriculums),
      error: (error) => console.error('Error occurred while fetching curriculums:', error)
    })
  }
}
