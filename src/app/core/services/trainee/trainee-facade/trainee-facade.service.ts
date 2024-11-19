import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TraineeFacadeService {

  constructor(private traineeApi: ApiService){
    this.loadLearningMaterials();
  }

  loadLearningMaterials() {
    this.traineeApi.getLearningMaterials()
    .subscribe((res) => console.log(res)
    )
  }

}
