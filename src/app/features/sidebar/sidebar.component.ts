import { Component } from '@angular/core';
import { NavigationsComponent } from "./navigations/navigations.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NavigationsComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
