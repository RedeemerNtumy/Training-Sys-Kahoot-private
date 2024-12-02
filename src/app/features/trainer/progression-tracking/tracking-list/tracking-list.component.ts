import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { progress } from '@core/models/progress.interface';
import { TrackingService } from '@core/services/tracking/tracking.service';

@Component({
  selector: 'app-tracking-list',
  standalone: true,
  imports: [CommonModule, TableModule, ProgressBarModule],
  templateUrl: './tracking-list.component.html',
  styleUrl: './tracking-list.component.scss'
})

export class TrackingListComponent {
  progressData: progress[] = [];

  constructor(private progressService: TrackingService) {}

  ngOnInit(): void {
    this.progressService.progressData$.subscribe((data: progress[]) => {
      this.progressData = data;
    });
  }

  getAvatarUrl(fullName: string): string {
    const nameParts = fullName.trim().split(' ');
    if (nameParts.length === 1) {
      return `https://avatar.iran.liara.run/username?username=${nameParts[0]}`;
    }
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    return `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;
  }
}
