import { Component } from '@angular/core';
import { TraineeFacadeService } from '../../../core/services/trainee/trainee-facade/trainee-facade.service';


@Component({
  selector: 'app-learning-materials',
  standalone: true,
  imports: [],
  templateUrl: './learning-materials.component.html',
  styleUrl: './learning-materials.component.scss'
})
export class LearningMaterialsComponent {
  learningMaterials$ = this.traineeFacade.loadLearningMaterials()
  constructor(private traineeFacade: TraineeFacadeService ) { }

  ngOnInit(){
    

  }
}
