import { Company } from '../company/company.types';
import { Profile } from '../profile/profile.types';

export interface TypeUser {
  id_type_user: string;
  company: Company;
  profile: Profile;
  name_type_user: string;
  description_type_user: string;
  status_type_user: boolean;
  deleted_type_user: boolean;
}
