export interface Cohort {
    name: string,
    specialization: string[],
    startDate: Date,
    endDate: Date,
    description: string,
}

export interface CohortList {
    cohort: string,
    startDate: Date,
    endDate: Date,
    traineesEnrolled: string,
}