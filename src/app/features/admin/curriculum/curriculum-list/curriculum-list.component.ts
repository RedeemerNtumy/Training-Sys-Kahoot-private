import { curriculum } from './../../../../core/models/curriculum.interface';
import { Component, OnInit } from '@angular/core';
import { EmptyHintComponent } from '../empty-hint/empty-hint.component';
import { HeaderComponent } from './header/header.component';
import { ListItemComponent } from './list-item/list-item.component';
import { CommonModule } from '@angular/common';
import { CurriculumFacadeService } from '@core/services/curriculum-facade/curriculum-facade.service';

@Component({
  selector: 'app-curriculum-list',
  standalone: true,
  imports: [EmptyHintComponent,HeaderComponent,ListItemComponent,CommonModule],
  templateUrl: './curriculum-list.component.html',
  styleUrl: './curriculum-list.component.scss',
})

export class CurriculumListComponent implements OnInit {
  curriculums! :curriculum[] ;
  searchTerm :string = ''
  originalCurriculumsLength: number = 0;

  constructor(private curriculumService: CurriculumFacadeService) {}

  ngOnInit(): void {
    this.curriculumService.filteredAndSortedCurriculum$.subscribe(
      curriculums => this.curriculums = curriculums
    );

    this.curriculumService.curriculum$.subscribe(
      curriculums => this.originalCurriculumsLength = curriculums.length
    );

    this.curriculumService.searchTerm$.subscribe(
      term => this.searchTerm = term
    );
  }

  get showNoSearchResults(): boolean {
    return this.originalCurriculumsLength > 0 && this.curriculums.length === 0 && this.searchTerm !== '';
  }

  get showNoCurriculums(): boolean {
    return this.originalCurriculumsLength === 0;
  }

}
