export interface progress{
  profileImage: string;
  traineeName: string;
  currentPhase: 'foundation' | 'advance' | 'capstone';
  progress: number;
  completionDate: Date;
}
