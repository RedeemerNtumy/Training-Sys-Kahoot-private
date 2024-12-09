import { Component } from '@angular/core';
import { KahootHeaderComponent } from '../components/kahoot-header/kahoot-header.component';
import { KahootSidebarComponent } from '../components/kahoot-sidebar/kahoot-sidebar.component';
import { KahootQuestionsComponent } from '../components/kahoot-questions/kahoot-questions.component';
import { KahootAsideComponent } from "../components/kahoot-aside/kahoot-aside.component";

@Component({
  selector: 'app-kahoot-page',
  standalone: true,
  imports: [
    KahootHeaderComponent,
    KahootSidebarComponent,
    KahootQuestionsComponent,
    KahootAsideComponent
],
  templateUrl: './kahoot-page.component.html',
  styleUrl: './kahoot-page.component.scss',
})
export class KahootPageComponent {
  questions: any[] = [];
  currentQuestion: any = {};

  updateQuestion(question: any) {
    // Implementation for updating question
  }
}
