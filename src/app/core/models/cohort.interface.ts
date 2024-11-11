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
    traineesEnrolled: string,
}

export interface TraineeList {
    id: number;
    cohort: string;
    enrolled: number;
    name: string;
    status: string;
    contact: contact;
    specialization: string;
    dateAdded: Date;
}

export interface contact {
    email: string,
    telephone: string
}