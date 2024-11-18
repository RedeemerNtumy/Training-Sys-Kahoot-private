import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SearchbarComponent } from '../../../../core/shared/searchbar/searchbar.component';
import { AsyncPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { TraineeInsystemService } from '../../../../core/services/user-management/trainee/trainee-insystem.service';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { User } from '../../../../core/models/cohort.interface';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [SearchbarComponent, RouterModule, AsyncPipe, NgIf, NgFor, TitleCasePipe],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {

  traineeUsers$!: Observable<User[]>;
  filteredTrainees$!: Observable<User[]>;
  trainerTabClicked: boolean = true;

  private searchTerm$ = new BehaviorSubject<string>(''); 
  private statusFilter$ = new BehaviorSubject<string | null>(null);
  private specializationFilter$ = new BehaviorSubject<string | null>(null);

  ellipsisClicked: boolean = false;
  selectedTraineeName: string | null = '';
  
  constructor(
    private router: Router,
    private traineesInsystemService: TraineeInsystemService
  ) {}



  ngOnInit() {
    // Get cohort details with trainees list from service
    this.traineeUsers$ = this.traineesInsystemService.getAllTrainees(); 

    this.filteredTrainees$ = combineLatest([
      this.traineeUsers$, 
      this.searchTerm$, 
      this.statusFilter$, 
      this.specializationFilter$
    ]).pipe(
      map(([trainees, searchTerm, statusFilter, specFilter]) => {
        const lowerSearchTerm = searchTerm.toLowerCase();
    
        return trainees.filter((trainee: User) => {
          // Check if trainee matches the search term
          const matchesSearch = 
            trainee.firstName.toLowerCase().includes(lowerSearchTerm) || 
            trainee.lastName.toLowerCase().includes(lowerSearchTerm) || 
            trainee.email.toLowerCase().includes(lowerSearchTerm) || 
            trainee.phoneNumber.includes(lowerSearchTerm);
    
          // Check if trainee matches the status filter
          const matchesStatus = statusFilter ? trainee.status === statusFilter : true;
    
          // Check if trainee matches the specialization filter
          const matchesSpecialization = specFilter ? trainee.specialization === specFilter : true;
    
          return matchesSearch && matchesStatus && matchesSpecialization;
        });
      })
    );
    
  }

  tabClicked() {
    this.trainerTabClicked = !this.trainerTabClicked;
  }


  // Update search term on changes from the search bar
  onSearchChange(searchTerm: string): void {
    this.searchTerm$.next(searchTerm);
  }

  onSortList() {
    this.filteredTrainees$ = this.filteredTrainees$.pipe(
      map((trainees: User[]) => trainees.sort((a, b) => a.firstName.localeCompare(b.firstName)))
    );
  }
  
  // Set the filter for each status and trigger re-evaluation
  filterByActive() {
    this.statusFilter$.next('Active');
  }
  
  filterByInactive() {
    this.statusFilter$.next('Inactive');
  }
  
  filterByDeactivated() {
    this.statusFilter$.next('Deactivated');
  }

  clearStatusFilter() {
    this.statusFilter$.next(null);
  }

  filterBySpecialization(spec: string) {
    this.specializationFilter$.next(spec)
  }

  clearSpecializationFilter() {
    this.specializationFilter$.next(null);
  }

  toggleEllipsis(selectedTrainee: string, event:Event) {
    event.stopPropagation();
    this.selectedTraineeName = this.selectedTraineeName === selectedTrainee ? null : selectedTrainee;
    if(this.selectedTraineeName === null) {
      this.ellipsisClicked = false;
    }
    else if(this.selectedTraineeName === selectedTrainee) {
      this.ellipsisClicked = true;
    }
  }














  goToAddUserForm() {
    this.router.navigate(['/home/admin/user-management/add-user-form']);
  }

  goToAddTrainerForm() {
    this.router.navigate(['/home/admin/user-management/add-trianer']);
  }
}
