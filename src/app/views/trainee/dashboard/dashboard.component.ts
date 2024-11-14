import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { TrackInfoCardComponent } from "../../../features/trainee/track-info-card/track-info-card.component";
import { NotificationCardComponent } from "../../../features/trainee/notification-card/notification-card.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent,
    TrackInfoCardComponent, MatDividerModule, NotificationCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {

}
