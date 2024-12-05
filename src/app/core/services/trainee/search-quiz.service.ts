import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchQuizService {

  public searchTerm$ = new BehaviorSubject<string>(''); 

  constructor() { }
  
}
