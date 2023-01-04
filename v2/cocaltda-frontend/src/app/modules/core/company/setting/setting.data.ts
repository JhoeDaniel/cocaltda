import { Setting } from './setting.types';

export const settings: Setting[] = [];
export const setting: Setting = {
  id_setting: '',
  expiration_token: 60,
  expiration_verification_code: 60,
  inactivity_time: 60,
  session_limit: 1,
  save_log: false,
  save_file_alfresco: false,
  modification_status: false,
  deleted_setting: false,
};
