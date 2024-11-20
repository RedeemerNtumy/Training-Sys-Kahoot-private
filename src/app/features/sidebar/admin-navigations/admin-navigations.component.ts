import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ActiveNavService } from '../../../core/services/active-nav/active-nav.service';

@Component({
  selector: 'app-admin-navigations',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './admin-navigations.component.html',
  styleUrl: './admin-navigations.component.scss'
})

export class AdminNavigationsComponent {
  constructor(private activeNav: ActiveNavService){}

  setActiveNav(nav: string){
    this.activeNav.setcurrentNav(nav);
  }
}
