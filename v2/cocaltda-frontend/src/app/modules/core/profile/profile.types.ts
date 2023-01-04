import { Company } from '../company/company.types';

export interface Profile {
  id_profile: string;
  company: Company;
  type_profile: TYPE_PROFILE;
  name_profile: string;
  description_profile: string;
  status_profile: boolean;
  deleted_profile: boolean;
}

/**
 * Type Enum TYPE_PROFILE
 */
export type TYPE_PROFILE = 'administator' | 'commonProfile';

export interface TYPE_PROFILE_ENUM {
  name_type: string;
  value_type: TYPE_PROFILE;
}

export const _typeProfile: TYPE_PROFILE_ENUM[] = [
  {
    name_type: 'Administrador',
    value_type: 'administator',
  },
  {
    name_type: 'Perfil común',
    value_type: 'commonProfile',
  },
];
/**
 * Type Enum TYPE_PROFILE
 */
