import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InputFieldComponent } from "../input-field/input-field.component";

@Component({
  selector: 'app-reset-code',
  standalone: true,
  imports: [CommonModule, InputFieldComponent],
  templateUrl: './reset-code.component.html',
  styleUrl: './reset-code.component.scss',
})
export class ResetCodeComponent {
  state: 'sent' | 'enter' = 'sent';
  codeExpiryTime = '02:59';
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.state = data['state'];

      if (this.state === 'sent') {
        setTimeout(() => {
          this.router.navigate(['auth/reset-code-enter']);
        }, 3000);
      }
    });
  }

  onEnterCode() {
    this.state = 'enter';
    this.router.navigate(['auth/reset-code-enter']);
  }

  onVerifyCode() {}

  onResendCode() {}
}
