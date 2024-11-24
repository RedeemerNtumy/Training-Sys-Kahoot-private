import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SearchbarComponent } from '@core/shared/searchbar/searchbar.component';

@Component({
  selector: 'app-view-grade-history',
  standalone: true,
  imports: [SearchbarComponent],
  templateUrl: './view-grade-history.component.html',
  styleUrl: './view-grade-history.component.scss'
})
export class ViewGradeHistoryComponent {

  @ViewChild('ellipsisIcon') ellipsisIcon!: ElementRef;

  showEllipseOptions: boolean = false;

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
 
}
