import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InputFieldComponent } from '../input-field/input-field.component';
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-reset-code',
  standalone: true,
  imports: [CommonModule, InputFieldComponent],
  templateUrl: './reset-code.component.html',
  styleUrl: './reset-code.component.scss',
})
export class ResetCodeComponent {
  state: 'sent' | 'enter' = 'sent';
  codeExpiryTime = '03:00';
  private readonly EXPIRY_TIME_IN_SECONDS = 180; // 3 minutes in seconds
  private timeRemaining = this.EXPIRY_TIME_IN_SECONDS;
  isExpired = false;
  private destroy$ = new Subject<void>();
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.state = data['state'];
    });
    this.startCountdown();
  }

  private startCountdown() {
    this.timeRemaining = this.EXPIRY_TIME_IN_SECONDS;
    this.isExpired = false;

    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.timeRemaining--;

        if (this.timeRemaining <= 0) {
          this.timeRemaining = 0;
          this.isExpired = true;
          this.codeExpiryTime = '00:00';
          return;
        }

        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;

        this.codeExpiryTime = `${String(minutes).padStart(2, '0')}:${String(
          seconds
        ).padStart(2, '0')}`;
      });
  }

  onEnterCode() {
    this.state = 'enter';
    this.router.navigate(['auth/reset-code-enter']);
  }

  onVerifyCode() {}

  onResendCode() {
    
  }
}
