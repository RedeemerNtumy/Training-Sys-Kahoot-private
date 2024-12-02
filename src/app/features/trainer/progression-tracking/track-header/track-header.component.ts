import { Component } from '@angular/core';

@Component({
  selector: 'app-track-header',
  standalone: true,
  imports: [],
  templateUrl: './track-header.component.html',
  styleUrl: './track-header.component.scss'
})
export class TrackHeaderComponent {
  sortDirection: 'asc' | 'desc' = 'asc';
  
  onSort() {
    throw new Error('Method not implemented.');
  }

}
