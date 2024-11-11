export interface Cohort {
    id: number,
    name: string,
    specialization: string[],
    startDate: Date,
    endDate: Date,
    description: string,
}

export interface CohortList {
    id: number,
    cohort: string,
    startDate: Date,
    endDate: Date,
    traineesEnrolled: number,
}

export interface CohortDetails {
    id: number;
    cohortName: string;
    enrollmentCount: number;
    trainees: Trainees[];
}

export interface Trainees {
    id: number;
    cohort: string;
    enrolled: number;
    fullName: string;
    email: string;
    contact: string;
    status: string;
    specialization: string;
    date_added: string;
}