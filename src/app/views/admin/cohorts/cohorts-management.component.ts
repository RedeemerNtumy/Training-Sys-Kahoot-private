import { Component } from '@angular/core';
import { CreateNewCohortComponent } from '../../../features/cohorts/create-new-cohort/create-new-cohort.component';
import { ListCohortsComponent } from "../../../features/cohorts/list-cohorts/list-cohorts.component";
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cohorts-management',
  standalone: true,
  imports: [CreateNewCohortComponent, ListCohortsComponent, RouterModule, RouterOutlet],
  templateUrl: './cohorts-management.component.html',
  styleUrl: './cohorts-management.component.scss'
})
export class CohortsManagementComponent {

  @ViewChild('plusBtnChecker', { static: false }) plusBtnCheckerEl!: ElementRef<HTMLElement>;

  constructor(
    private buttonStateService: ButtonStateService
  ) {}

  ngAfterViewInit() {
    const buttonExists = !!(this.plusBtnCheckerEl?.nativeElement?.classList.contains('plusBtnChecker'));
    
    // Update the service with the button's state
    this.buttonStateService.setCanUseBtnState(buttonExists);
  }



}
