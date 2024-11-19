import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  @Input() type: 'error' | 'warning' | 'success' = 'error';
  @Input() message: string | string[] = '';
  @Input() title = '';
  @Input() iconSrc = '';

  get iconPath(): string {
    return this.iconSrc || `assets/Images/png/${this.type}.png`;
  }

  get isArrayMessage(): boolean {
    return Array.isArray(this.message);
  }

  get arrayMessage(): string[] {
    return Array.isArray(this.message) ? this.message : [this.message];
  }
}
