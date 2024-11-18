import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonStateService {

  private canUseBtnSubject = new BehaviorSubject<boolean>(false);
  canUseBtn$ = this.canUseBtnSubject.asObservable();

  constructor() { }

  setCanUseBtnState(state: boolean) {
    this.canUseBtnSubject.next(state);
  }

}
