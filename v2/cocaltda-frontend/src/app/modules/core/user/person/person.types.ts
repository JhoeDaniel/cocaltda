import { Academic } from './academic/academic.types';
import { Job } from './job/job.types';

export interface Person {
  id_person: string;
  academic: Academic;
  job: Job;
  dni_person: string;
  name_person: string;
  last_name_person: string;
  address_person: string;
  phone_person: string;
  deleted_person: boolean;
}
