import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Faq, FaqsService } from './faqs.service';

describe('FaqsService', () => {
  let service: FaqsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FaqsService]
    });
    service = TestBed.inject(FaqsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch FAQs', () => {
    const dummyFaqs: Faq[] = [
      { question: 'What is Angular?', answer: 'Angular is a platform for building mobile and desktop web applications.' },
      { question: 'What is TypeScript?', answer: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.' }
    ];

    service.getFaqs().subscribe(faqs => {
      expect(faqs.length).toBe(2);
      expect(faqs).toEqual(dummyFaqs);
    });

    const req = httpMock.expectOne('assets/data/faqs.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyFaqs);
  });
});
