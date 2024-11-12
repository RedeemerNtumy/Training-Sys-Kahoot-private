import { Component, OnInit } from '@angular/core';
import { Ispecialization } from '../../../../core/models/specialization.interface';
import { NoSpecializationAddedComponent } from "../no-specialization-added/no-specialization-added.component";
import { CommonModule, NgFor } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { DateformatPipe } from "../../../../core/pipes/dateFormat/dateformat.pipe";
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { DeleteModalComponent } from "../delete-modal/delete-modal.component";
import { ListCardComponent } from "./list-card/list-card.component";
import { PaginatorComponent } from "./paginator/paginator.component";
import { Observable, map, tap,of } from 'rxjs';
import { SpecializationFacadeService } from '../../../../core/services/specialization-facade/specialization-facade.service';

@Component({
  selector: 'app-specialization-list',
  standalone: true,
  imports: [
    MatMenuModule,
    NoSpecializationAddedComponent,
    CommonModule,
    HeaderComponent,
    NgFor,
    DateformatPipe,
    DeleteModalComponent,
    ListCardComponent,
    PaginatorComponent
  ],
  templateUrl: './specialization-list.component.html',
  styleUrls: ['./specialization-list.component.scss']
})
export class SpecializationListComponent implements OnInit {
  activeDropdownIndex: number | null = null;
  deleteModalVisible = false;
  selectedSpecializationId?: number;
  deleteFeedbackMap = new Map<number, boolean>();
  specializations$!: Observable<Ispecialization[]>;

  currentPage = 1;
  pageSize = 2;
  totalPages = 1;

  constructor(private router: Router, private specializationFacade: SpecializationFacadeService) {}

  ngOnInit() {
    this.fetchSpecializations();
  }

  fetchSpecializations() {
    this.specializationFacade.getAllSpecializations().pipe(
      tap((specializations) => {
        this.totalPages = Math.ceil(specializations.length / this.pageSize);
      }),
      map((specializations) =>
        specializations.slice(
          (this.currentPage - 1) * this.pageSize,
          (this.currentPage - 1) * this.pageSize + this.pageSize
        )
      )
    ).subscribe((pagedSpecializations) => {
      this.specializations$ = of(pagedSpecializations);
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchSpecializations();
  }

  toggleDropdown(event: Event, index: number): void {
    event.stopPropagation();
    this.activeDropdownIndex = this.activeDropdownIndex === index ? null : index;
  }

  closeDropdown(): void {
    this.activeDropdownIndex = null;
  }

  handleAction(event: Event, action: string, spec: Ispecialization): void {
    event.stopPropagation();
    switch (action) {
      case 'update':
        this.navigateToCreate();
        break;
      case 'delete':
        this.selectedSpecializationId = spec.id;
        this.deleteModalVisible = true;
        this.deleteFeedbackMap.set(spec.id, false);
        break;
    }
    this.closeDropdown();
  }

  onSpecializationDeleted(id: number) {
    // Set feedback state for this specific specialization
    this.deleteFeedbackMap.set(id, true);

    // Optional: Clear the feedback after some time
    setTimeout(() => {
      this.deleteFeedbackMap.delete(id);
      this.fetchSpecializations();
    }, 2000); // Adjust timing as needed
  }

  delete(id:number){
    this.specializationFacade.delete(id).subscribe({
      next: () => console.log('Specialization deleted'),
      error: (error) => console.error('Error deleting specialization:', error)
    })
  }

  navigateToCreate() {
    this.router.navigate(['home', 'admin', 'specialization', 'create']);
  }
}
