import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserRoleService } from '../../core/services/user-role/user-role.service';
import { TitleCasePipe } from '@angular/common';
import { ButtonStateService } from '../../core/services/buttonState/buttonstate.service';

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
    private buttonStateService: ButtonStateService,
    private cdRef: ChangeDetectorRef
  ) {}

  public toggleDropDownBtn() {
    this.dropDownClicked = !this.dropDownClicked;
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
        this.updateRouteName();
        this.runAfterViewInitLogic();
      });

  }

  // trigger emitter 
  public triggerPlusBtn() {
    this.activatePlusBtn.emit();
  }

  private runAfterViewInitLogic(): void {
    this.buttonStateService.canUseBtn$.subscribe(state => {
      this.canUseBtn = state;
    })
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
