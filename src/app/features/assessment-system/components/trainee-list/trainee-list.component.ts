import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TraineeInsystemService } from '@core/services/user-management/trainee/trainee-insystem.service';
import { User } from '@core/models/cohort.interface';
import { catchError, filter, Observable, of, map } from 'rxjs';

@Component({
  selector: 'app-trainee-list',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './trainee-list.component.html',
  styleUrl: './trainee-list.component.scss',
})
export class TraineeListComponent implements OnInit {
  trainees$!: Observable<User[]>;

  constructor(private traineeService: TraineeInsystemService) {}

  ngOnInit(): void {
    this.trainees$ = this.traineeService.getAllTrainees();
  }
}
