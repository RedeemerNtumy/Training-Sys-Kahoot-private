import { Component } from '@angular/core';
import { SearchbarComponent } from '@core/shared/searchbar/searchbar.component';

@Component({
  selector: 'app-view-grade-history',
  standalone: true,
  imports: [SearchbarComponent],
  templateUrl: './view-grade-history.component.html',
  styleUrl: './view-grade-history.component.scss'
})
export class ViewGradeHistoryComponent {

}
