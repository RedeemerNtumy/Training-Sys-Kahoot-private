import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() icon: string = '../../../../../assets/images/Approval 5.png';
  @Input() title: string = 'something';
  @Input() description: string = 'something working here?';
}
