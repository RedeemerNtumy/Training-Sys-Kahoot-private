import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-trainer-navigations',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './trainer-navigations.component.html',
  styleUrl: './trainer-navigations.component.scss'
})

export class TrainerNavigationsComponent {

}
