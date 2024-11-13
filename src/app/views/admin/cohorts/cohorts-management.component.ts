import { Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonStateService } from '../../../core/services/buttonState/buttonstate.service';

@Component({
  selector: 'app-cohorts-management',
  standalone: true,
  imports: [],
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
