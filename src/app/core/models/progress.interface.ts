export interface progress{
  profileImage: string;
  traineeName: string;
  currentPhase: 'foundation' | 'advance' | 'capstone';
  progress: number;
  completionDate: Date;
}


export type phaseOption = progress['currentPhase'] | 'advance' | 'capstone';
