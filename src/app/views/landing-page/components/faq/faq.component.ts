import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { Faq, FaqsService } from '../../../../core/services/faq/faqs.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [AccordionModule, CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FAQComponent {
  faqs: Faq[] = [];

  constructor(private faqService: FaqsService) {
    this.faqService.getFaqs().subscribe((data: Faq[]) => {
      this.faqs = data;
    });
  }
}
