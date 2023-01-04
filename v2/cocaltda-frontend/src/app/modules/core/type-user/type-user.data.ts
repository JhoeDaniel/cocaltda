import { company } from '../company/company.data';
import { profile } from '../profile/profile.data';
import { TypeUser } from './type-user.types';

export const typeUsers: TypeUser[] = [];
export const typeUser: TypeUser = {
  id_type_user: ' ',
  company: company,
  profile: profile,
  name_type_user: ' ',
  description_type_user: ' ',
  status_type_user: false,
  deleted_type_user: false,
};
