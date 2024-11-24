import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { PaginatorComponent } from '@core/shared/paginator/paginator.component';
import { SearchbarComponent } from '@core/shared/searchbar/searchbar.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-view-grade-history',
  standalone: true,
  imports: [SearchbarComponent, PaginatorComponent],
  templateUrl: './view-grade-history.component.html',
  styleUrl: './view-grade-history.component.scss'
})
export class ViewGradeHistoryComponent {

  @ViewChild('ellipsisIcon') ellipsisIcon!: ElementRef;

  showEllipseOptions: boolean = false;

  //Pagination 
  private pageSubject = new BehaviorSubject<number>(1);
  currentPage$ = this.pageSubject.asObservable();
  pageSize = 4;
  totalPages = 1;

  constructor() {}


  toggleEllipseOptions() {
    this.showEllipseOptions = !this.showEllipseOptions;
    console.log("clicked", this.showEllipseOptions)
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if(this.ellipsisIcon && !this.ellipsisIcon.nativeElement.contains(event.target)) {
      this.showEllipseOptions = false;
    }
  }


  // Pagination 
  onPageChange(page: number) {
    this.pageSubject.next(page);
  }
 
}
