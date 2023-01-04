import { company } from '../company/company.data';
import { Validation } from './validation.types';

export const validations: Validation[] = [];
export const validation: Validation = {
  id_validation: ' ',
  company: company,
  type_validation: 'validationPassword',
  status_validation: false,
  pattern_validation: ' ',
  message_validation: ' ',
  deleted_validation: false,
};
