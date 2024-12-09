import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GenerateByAiComponent } from '../../kahoot-page/generate-by-ai/generate-by-ai.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-kahoot-header',
  standalone: true,
  imports: [CommonModule, GenerateByAiComponent, RouterModule, RouterLink],
  templateUrl: './kahoot-header.component.html',
  styleUrl: './kahoot-header.component.scss',
})
export class KahootHeaderComponent {
  openAiModal: boolean = false;

  onOpenAiModal() {
    this.openAiModal = true;
  }

  onCloseAiModal() {
    this.openAiModal = false;
  }
}
