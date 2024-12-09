import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { initializeDropdownOptions } from '../../../../utils/kahootDropDownData';

@Component({
  selector: 'app-kahoot-aside',
  standalone: true,
  imports: [FormsModule, DropdownModule, CommonModule],
  templateUrl: './kahoot-aside.component.html',
  styleUrl: './kahoot-aside.component.scss',
})
export class KahootAsideComponent implements OnInit {
  timeLimit: { name: string }[] | undefined;

  ngOnInit(): void {
    const dropdownOptions = initializeDropdownOptions();
    this.timeLimit = dropdownOptions.timeLimit;
  }
}
