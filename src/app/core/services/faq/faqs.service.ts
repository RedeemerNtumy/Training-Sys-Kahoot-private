import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Faq {
  question: string;
  answer: string;
}

@Injectable({
  providedIn: 'root',
})
export class FaqsService {
  baseUrl = 'assets/data/faqs.json';

  constructor(private http: HttpClient) {}

  getFaqs() {
    return this.http.get<Faq[]>(this.baseUrl);
  }
}
