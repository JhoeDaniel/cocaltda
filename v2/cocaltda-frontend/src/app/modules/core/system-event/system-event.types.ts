import { User } from '../user/user.types';

export interface SystemEvent {
  id_system_event: string;
  user: User;
  table_system_event: string;
  row_system_event: number;
  action_system_event: string;
  date_system_event: string;
  deleted_system_event: boolean;
}
