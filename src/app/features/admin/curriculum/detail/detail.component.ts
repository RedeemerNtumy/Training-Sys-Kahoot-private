import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit,signal,computed } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { curriculum } from '@core/models/curriculum.interface';
import { CurriculumFacadeService } from '@core/services/curriculum-facade/curriculum-facade.service';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ DatePipe,MatDivider,NgClass,NgIf,NgFor,AccordionModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})

export class DetailComponent implements OnInit{
  curriculum: curriculum | null = null;
  activeSection =  signal<'overview' | 'modules'>('overview');

  constructor(
    private route: ActivatedRoute,
    private curriculumFacade: CurriculumFacadeService
  ) {}


  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.curriculumFacade.getSelectedCurriculum(id).subscribe(
        (curriculum) => {
          console.log('details comes here:'+curriculum);

          this.curriculum = curriculum
        }
      );
    });
  }


  setActiveDetail(section: 'overview' | 'modules') {
    this.activeSection.set(section)
  }

  totalTopics (){
    return this.curriculum?.modules?.reduce(
      (sum, module) => sum + module.topics.length, 0
    ) || 0;
  }
}
