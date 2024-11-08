import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
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
export class HeaderComponent implements OnInit {
  canUseBtn!: boolean;
  dropDownClicked: boolean = false;
  routeName!: string;
  userRole!: string;

  @Output() activatePlusBtn = new EventEmitter<void>();

  constructor(
    private router: Router, 
    private userRoleService: UserRoleService,
    private cdRef: ChangeDetectorRef
  ) {}

  toggleDropDownBtn() {
    this.dropDownClicked = !this.dropDownClicked;
  }

  // After View is initialized, check for the existence of class '.plus-btn-checker'

  ngOnInit(): void {
    // Get user role
    this.userRole = this.userRoleService.getUserRole()

    // Set routeName immediately on component load, in case the NavigationEnd hasn't fired yet
    this.updateRouteName();

    // Subscribe to NavigationEnd events to capture route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateRouteName();
        this.runAfterViewInitLogic();
      });

  }

  // trigger emitter 
  triggerPlusBtn() {
    this.activatePlusBtn.emit();
  }

  private runAfterViewInitLogic(): void {
    const targetElement = document.querySelector('.plus-btn-checker');

    if (targetElement && targetElement.classList.contains('plus-btn-checker')) {
      this.canUseBtn = true;
    } else {
      this.canUseBtn = false;
    }

    // Manually trigger change detection after making the change
    this.cdRef.detectChanges();
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
