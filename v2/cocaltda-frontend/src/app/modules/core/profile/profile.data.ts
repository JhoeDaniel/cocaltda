import { company } from '../company/company.data';
import { Profile } from './profile.types';

export const profiles: Profile[] = [];
export const profile: Profile = {
  id_profile: ' ',
  company: company,
  type_profile: 'commonProfile',
  name_profile: ' ',
  description_profile: ' ',
  status_profile: false,
  deleted_profile: false,
};
