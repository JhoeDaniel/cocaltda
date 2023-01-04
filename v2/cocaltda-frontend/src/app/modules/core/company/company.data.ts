import { Company } from './company.types';
import { setting } from './setting/setting.data';

export const companys: Company[] = [];
export const company: Company = {
  id_company: ' ',
  setting: setting,
  name_company: ' ',
  acronym_company: '     ',
  address_company: ' ',
  status_company: false,
  deleted_company: false,
};
