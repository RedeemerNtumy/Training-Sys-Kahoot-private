import { User } from "./cohort.interface";

export interface TraineeList {
    content: User[];
}

export interface Assignment {
    id: number;
    title: string;
    dateCreated: string;
    type: string;
    action: string;
    questionCount: number;
}

export interface Quiz {
    quizCount: number;
    assignments: Assignment[];
}