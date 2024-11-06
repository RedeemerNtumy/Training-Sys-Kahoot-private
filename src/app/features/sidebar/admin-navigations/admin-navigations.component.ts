import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-navigations',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './admin-navigations.component.html',
  styleUrl: './admin-navigations.component.scss'
})

export class AdminNavigationsComponent {


}
