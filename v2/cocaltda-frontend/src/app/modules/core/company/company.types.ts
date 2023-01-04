import { Setting } from './setting/setting.types';

export interface Company {
  id_company: string;
  setting: Setting;
  name_company: string;
  acronym_company: string;
  address_company: string;
  status_company: boolean;
  deleted_company: boolean;
}
