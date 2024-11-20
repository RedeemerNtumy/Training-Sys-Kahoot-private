import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FaqsService } from '../../../../core/services/faq/faqs.service';
import { Faq } from '../../../../core/services/faq/faqs.service';

import { FAQComponent } from './faq.component';

describe('FAQComponent', () => {
  let component: FAQComponent;
  let fixture: ComponentFixture<FAQComponent>;
  let faqService: jest.Mocked<FaqsService>;

  beforeEach(async () => {
    const faqServiceMock = {
      getFaqs: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [FAQComponent],
      providers: [{ provide: FaqsService, useValue: faqServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(FAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    faqService = TestBed.inject(FaqsService) as jest.Mocked<FaqsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load FAQs on init', () => {
    const mockFaqs: Faq[] = [{ question: 'Q1', answer: 'A1' }];
    faqService.getFaqs.mockReturnValue(of(mockFaqs));

    fixture.detectChanges();

    expect(component.faqs).toEqual(mockFaqs);
    expect(faqService.getFaqs).toHaveBeenCalled();
  });
});
