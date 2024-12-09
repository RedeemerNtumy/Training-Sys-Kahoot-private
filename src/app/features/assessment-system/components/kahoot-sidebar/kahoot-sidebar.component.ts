import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kahoot-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kahoot-sidebar.component.html',
  styleUrl: './kahoot-sidebar.component.scss',
})
export class KahootSidebarComponent {
  @Input() questions: any[] = [];
}
