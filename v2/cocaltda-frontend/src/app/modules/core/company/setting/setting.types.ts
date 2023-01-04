export interface Setting {
  id_setting: string;
  expiration_token: number;
  expiration_verification_code: number;
  inactivity_time: number;
  session_limit: number;
  save_log: boolean;
  save_file_alfresco: boolean;
  modification_status: boolean;
  deleted_setting: boolean;
}
