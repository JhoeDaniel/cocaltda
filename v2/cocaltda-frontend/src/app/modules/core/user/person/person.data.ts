import { academic } from './academic/academic.data';
import { job } from './job/job.data';
import { Person } from './person.types';

export const persons: Person[] = [];
export const person: Person = {
  id_person: ' ',
  academic: academic,
  job: job,
  dni_person: ' ',
  name_person: ' ',
  last_name_person: ' ',
  address_person: ' ',
  phone_person: ' ',
  deleted_person: false,
};
