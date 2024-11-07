import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit, OnInit {
  canUseBtn!: boolean;
  dropDownClicked: boolean = false;
  routeName!: string;

  constructor(
    private el: ElementRef,
    private router: Router, 
  ) {}

  toggleDropDownBtn() {
    this.dropDownClicked = !this.dropDownClicked;
  }

  // After View is initialized, check for the existence of class '.plus-btn-checker'
  ngAfterViewInit(): void {
    const targetElement = this.el.nativeElement.querySelector('.plus-btn-checker');

    if(targetElement && targetElement.classList.contains('plus-btn-checker')) {
      this.canUseBtn = true;
    }
    else {
      this.canUseBtn = false;
    }
  }

  // Get current route name from current route
  ngOnInit(): void {
    // Get the current route
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      const urlSegments = this.router.url.split('/');
      const currentPath = urlSegments[urlSegments.length - 1];

      this.routeName = currentPath
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      console.log('Formatted route name:', this.routeName);
    }); 
  }
}
