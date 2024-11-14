import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-track-info-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-info-card.component.html',
  styleUrl: './track-info-card.component.scss'
})

export class TrackInfoCardComponent {
  @Input() count: number = 13;
  @Input() lessonsCompleted: number = 0;
  @Input() subtitle: string = "Total Learning Material";
  @Input() imageUrl: string = "../../../../assets/Images/svg/books-icon.svg";
  @Input() imageAlt: string = "card-icon";
  @Input() colors: { [index: string]: string} = {
    startColor: '#2FB4AC',
    endColor: '#0F7670CC'
  };

  get cardStyle() {
    return {
      'background': `linear-gradient(90deg, ${this.colors['startColor']} 3.92%, ${this.colors['endColor']} 100%)`
    };
  }
}
