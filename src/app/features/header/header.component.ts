import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  canUseBtn!: boolean;
  dropDownClicked: boolean = true;

  constructor(private el: ElementRef) {}

  toggleDropDownBtn() {
    this.dropDownClicked = !this.dropDownClicked;
  }

  ngAfterViewInit(): void {
    const targetElement = this.el.nativeElement.querySelector('.plus-btn-checker');

    if(targetElement && targetElement.classList.contains('plus-btn-checker')) {
      this.canUseBtn = true;
    }
    else {
      this.canUseBtn = false;
    }
  }
}
