export type Status = 'ACTIVE' | 'INACTIVE' | 'DEACTIVATED';

export interface TrainerCreation {
  email: string;
  firstName: string;
  lastName: string;
  assignSpecialization: string;
  gender: string;
  country: string;
  phoneNumber: string;
  profilePhoto: File;
  status: Status;
}
