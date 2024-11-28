import { Component, Input } from '@angular/core';
import { curriculum } from '@core/models/curriculum.interface';
import { OptionsDropdownComponent } from "../../../../../core/shared/options-dropdown/options-dropdown.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [OptionsDropdownComponent],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})

export class ListItemComponent {
  @Input() curriculum!: curriculum;
  @Input() curriculumIndex!: number;
  isDropdownActive = false;

  constructor(private router:Router) {
    document.addEventListener('click', () => {
      this.isDropdownActive = false;
    });
  }

  ngOnDestroy() {
    document.removeEventListener('click', () => {
      this.isDropdownActive = false;
    });
  }

  getTotalTopics(): number {
    return this.curriculum.modules.reduce((total, mod) => total + mod.topics.length, 0);
  }

  navigateToDetail() {
    this.router.navigate(['home','admin','curriculum-management','curriculum', this.curriculum.id ]);
  }

  dropdownOptions = [
    {
      icon: '../../../../../../assets/Images/svg/update.svg',
      label: 'Update',
      action: 'update'
    },
    {
      icon: '../../../../../../assets/Images/svg/spec-delete.svg',
      label: 'Delete',
      action: 'delete'
    }
  ];

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownActive = !this.isDropdownActive;
  }

  handleOptionSelect(data: {event: Event, action: string}): void {
    const { event, action } = data;

    switch(action) {
      case 'update':

        break;
      case 'delete':

        break;
    }

    this.isDropdownActive = false;
  }
}
