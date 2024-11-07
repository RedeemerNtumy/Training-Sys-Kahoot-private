import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  canUseBtn: boolean = true;
  dropDownClicked: boolean = true;

  constructor() {}

  toggleDropDownBtn() {
    this.dropDownClicked = !this.dropDownClicked;
  }
}
