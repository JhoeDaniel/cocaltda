import { company } from '../company/company.data';
import { typeUser } from '../type-user/type-user.data';
import { person } from './person/person.data';
import { User } from './user.types';

export const users: User[] = [];
export const user: User = {
  id_user: ' ',
  company: company,
  person: person,
  type_user: typeUser,
  name_user: ' ',
  password_user: ' ',
  avatar_user: ' ',
  status_user: false,
  deleted_user: false,
};
