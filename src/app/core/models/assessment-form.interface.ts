export type AssessmentType = 'quiz' | 'lab' | 'presentation';

export interface AssessmentData {
  assessmentType: AssessmentType;
  title: string;
  focusArea: string;
  description: string;
  coverImage: File;
  attachments?: File[];
  questions?: any[];
  questionsCount?: number;
}

export interface CreateAssessment {
  type: AssessmentType;
  label: string;
  icon: string;
  route: string;
}

export interface Quiz {
  questions: any[];
  timeFrame: number;

}
