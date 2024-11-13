import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ActiveNavService {
  private currentNav = new BehaviorSubject<string>('');
  currentNavSubject$ = this.currentNav.asObservable();

  constructor() {}

  setcurrentNav(nav: string) {
    this.currentNav.next(nav);
  }
}
