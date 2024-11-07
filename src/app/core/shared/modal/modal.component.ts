import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';

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

  constructor(
    public modalService: ModalService,
  ) {}


}
