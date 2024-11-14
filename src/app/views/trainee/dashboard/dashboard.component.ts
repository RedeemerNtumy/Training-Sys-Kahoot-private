import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { TrackInfoCardComponent } from "../../../features/trainee/track-info-card/track-info-card.component";
import { NotificationCardComponent } from "../../../features/trainee/notification-card/notification-card.component";
import { LearningMaterialsComponent } from "../../../features/trainee/learning-materials/learning-materials.component";
import { TraineeFacadeService } from '../../../core/services/trainee/trainee-facade/trainee-facade.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ DashboardComponent,
    TrackInfoCardComponent, MatDividerModule, NotificationCardComponent, LearningMaterialsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {

  constructor(private traineeFacade: TraineeFacadeService ) { }

  ngOnInit(){
    // this.traineeFacade.loadLearningMaterials()
  }

}
