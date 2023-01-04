import { Company } from '../company/company.types';

export interface Validation {
  id_validation: string;
  company: Company;
  type_validation: TYPE_VALIDATION;
  status_validation: boolean;
  pattern_validation: string;
  message_validation: string;
  deleted_validation: boolean;
}

/**
 * Type Enum
 */
export type TYPE_VALIDATION =
  | 'validationPassword'
  | 'validationDNI'
  | 'validationPhoneNumber';

export interface TYPE_VALIDATION_ENUM {
  name_type: string;
  value_type: TYPE_VALIDATION;
}

export const _typeValidation: TYPE_VALIDATION_ENUM[] = [
  {
    name_type: 'Validación de contraseña',
    value_type: 'validationPassword',
  },
  {
    name_type: 'Validación de DNI',
    value_type: 'validationDNI',
  },
  {
    name_type: 'Validación de número de teléfono',
    value_type: 'validationPhoneNumber',
  },
];
/**
 * Type Enum
 */
