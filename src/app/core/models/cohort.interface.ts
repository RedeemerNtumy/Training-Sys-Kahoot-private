export interface Cohort {
    id: string,
    name: string,
    specialization: string[],
    startDate: Date,
    endDate: Date,
    traineesEnrolled: number,
    description: string,
}

export interface CohortList {
    id: string,
    name: string,
    startDate: Date,
    endDate: Date,
    traineesEnrolled: number,
}

export interface CohortDetails {
    id: string;
    cohortName: string;
    enrollmentCount: number;
    trainees: Trainees[];
}

export interface Trainees {
    id: string;
    cohort: string;
    enrolled: number;
    fullName: string;
    email: string;
    contact: string;
    status: string;
    specialization: string;
    date_added: string;
}