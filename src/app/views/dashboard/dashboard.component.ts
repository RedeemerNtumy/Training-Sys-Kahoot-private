import { Component } from '@angular/core';
import { SidebarComponent } from "../../features/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../features/header/header.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, HeaderComponent], 
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {

}
