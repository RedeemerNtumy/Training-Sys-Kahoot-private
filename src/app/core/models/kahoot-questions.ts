export interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
  image?: string;
}

export interface GenerateQuestion {
  level: string;
  questionType: string;
  includeCode?: string;
  topic: string;
}
