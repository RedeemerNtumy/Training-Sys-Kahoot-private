import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-specialization-added',
  standalone: true,
  templateUrl: './no-specialization-added.component.html',
  styleUrls: ['./no-specialization-added.component.scss']
})
export class NoSpecializationAddedComponent {
  constructor(private router: Router) {}

  navigatetoCreate() {
    console.log('routed to create specializations');
    this.router.navigate(['home', 'admin', 'specialization', 'create']);
  }
}
