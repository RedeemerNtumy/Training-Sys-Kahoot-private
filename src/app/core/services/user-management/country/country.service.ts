import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as ct from 'countries-and-timezones';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor() {}

  getCountries(): Observable<any[]> {
    const countries = ct.getAllCountries();
    return of(Object.values(countries));
  }
}
