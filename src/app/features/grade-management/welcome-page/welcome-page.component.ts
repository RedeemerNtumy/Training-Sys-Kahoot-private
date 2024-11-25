import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [NgIf, NgFor, ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit {

  welcometimeUp: boolean = false;


  constructor() {}
  

  ngOnInit() {
    this.setModalDisplayTime();
  }

  private setModalDisplayTime() {
    setTimeout(() => {
      this.toggleTimeUp();
    }, 3000)
  }

  toggleTimeUp() {
    this.welcometimeUp = !this.welcometimeUp;
  }

}
