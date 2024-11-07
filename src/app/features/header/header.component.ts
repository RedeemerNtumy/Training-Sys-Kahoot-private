import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserRoleService } from '../../core/services/user-role/user-role.service';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit, OnInit {
  canUseBtn!: boolean;
  dropDownClicked: boolean = false;
  routeName!: string;
  userRole!: string;

  constructor(
    private el: ElementRef,
    private router: Router, 
    private userRoleService: UserRoleService,
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

  ngOnInit(): void {
    // Get user role
    this.userRole = this.userRoleService.getUserRole()

    // Set routeName immediately on component load, in case the NavigationEnd hasn't fired yet
    this.updateRouteName();

    // Subscribe to NavigationEnd events to capture route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateRouteName(); // Update route name when navigation ends
      });
  }

  // Helper method to update route name
  private updateRouteName(): void {
    const urlSegments = this.router.url.split('/');
    const currentPath = urlSegments[urlSegments.length - 1];

    this.routeName = currentPath
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
