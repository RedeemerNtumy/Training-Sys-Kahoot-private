
export interface module {
  title: string;
  description: string;
  topics: string[];
  files: ModuleFile[];
}

interface ModuleFile {
  name: string;
  size: string;
  type: string;
}


export interface curriculum {
  id:number;
  createdAt: string;
  title: string;
  description: string;
  assignedSpecialization: string;
  assignedCohort: string;
  learningObjectives: string[];
  thumbnail: string;
  modules: module[];
}
