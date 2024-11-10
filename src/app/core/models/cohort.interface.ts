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