import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRipple } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { CurriculumFacadeService } from '@core/services/curriculum-facade/curriculum-facade.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatRipple, CommonModule, MatDividerModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  sortDirection: 'asc' | 'desc' = 'asc';
  searchTerm: string = '';
  private subscription: Subscription = new Subscription();

  constructor(
    private curriculumFacade: CurriculumFacadeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.curriculumFacade.sortDirection$.subscribe(
        direction => this.sortDirection = direction
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navigateToCreate() {
    this.router.navigate(['home', 'admin', 'curriculum-management', 'create-curriculum']);
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.curriculumFacade.setSearchTerm(searchTerm);
  }

  onSort() {
    this.curriculumFacade.toggleSortDirection();
  }
}
