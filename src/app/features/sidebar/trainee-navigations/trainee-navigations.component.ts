import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-trainee-navigations',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './trainee-navigations.component.html',
  styleUrl: './trainee-navigations.component.scss'
})
export class TraineeNavigationsComponent {

}
