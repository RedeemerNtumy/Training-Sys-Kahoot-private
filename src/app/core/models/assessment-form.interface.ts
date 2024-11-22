export type AssessmentType = 'quiz' | 'lab';

export interface AssessmentData {
  assessmentType: AssessmentType;
  title: string;
  focusArea: string;
  description: string;
  coverImage?: File;
  attachments?: File[];
}
