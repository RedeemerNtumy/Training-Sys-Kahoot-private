import { Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ MatRippleModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  constructor( private router: Router){}

  navigateToCreate() {
    this.router.navigate(['home', 'admin', 'specialization', 'create']);
  }
}
