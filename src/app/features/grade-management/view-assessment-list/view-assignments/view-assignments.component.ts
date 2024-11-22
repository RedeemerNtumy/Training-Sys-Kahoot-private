import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view-assignments',
  standalone: true,
  imports: [NgIf],
  templateUrl: './view-assignments.component.html',
  styleUrl: './view-assignments.component.scss'
})
export class ViewAssignmentsComponent {

  @Input() cardType = '';

  
} 
