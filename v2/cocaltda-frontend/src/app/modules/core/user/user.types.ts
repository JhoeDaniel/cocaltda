import { Company } from '../company/company.types';
import { TypeUser } from '../type-user/type-user.types';
import { Person } from './person/person.types';

export interface User {
  id_user: string;
  company: Company;
  person: Person;
  type_user: TypeUser;
  name_user: string;
  password_user: string;
  avatar_user: string;
  status_user: boolean;
  deleted_user: boolean;
}
