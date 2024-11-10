export interface Cohort {
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
    filter(arg0: (trainee: any) => any): any
    id: number,
    cohort: string,
    enrolled: number,
    name: string,
    status: string,
    endDate: contact[],
    specialization: string,
    dateAdded: Date
}

export interface contact {
    email: string,
    telephone: string
}