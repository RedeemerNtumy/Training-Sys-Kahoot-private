import { BehaviorSubject } from 'rxjs';
import { TrackingCrudService } from './../tracking-crud/tracking-crud.service';
import { Injectable } from '@angular/core';
import { progress } from '@core/models/progress.interface';
import { ErrorHandleService } from '../error-handle/error-handle.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  private progressDataSubject = new BehaviorSubject<progress[]>([])
  progressData$ = this.progressDataSubject.asObservable();


  constructor(private trackProgress: TrackingCrudService,
    private errorhandle: ErrorHandleService
  ) {
    this.fetchProgress()
  }

  fetchProgress(){
    this.trackProgress.getAllProgress().subscribe({
      next: (progress: progress[]) => this.progressDataSubject.next(progress),
      error: () => this.errorhandle.handleError
    });
  }
}
