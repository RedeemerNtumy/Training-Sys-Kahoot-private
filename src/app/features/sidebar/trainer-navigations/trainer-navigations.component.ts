import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ActiveNavService } from '../../../core/services/active-nav/active-nav.service';

@Component({
  selector: 'app-trainer-navigations',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './trainer-navigations.component.html',
  styleUrl: './trainer-navigations.component.scss'
})

export class TrainerNavigationsComponent {
 constructor(private activeNav: ActiveNavService){}

 setActiveNav(nav:string){
  this.activeNav.setcurrentNav(nav);
 }
}
