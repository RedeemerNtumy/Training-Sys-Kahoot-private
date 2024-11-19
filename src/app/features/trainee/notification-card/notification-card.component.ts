import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-card',
  standalone: true,
  imports: [],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.scss'
})

export class NotificationCardComponent {
  @Input() icon: string ='';
  @Input() alt: string='';
  @Input() title:string ='';
  @Input() subtitle:string ='';
}
