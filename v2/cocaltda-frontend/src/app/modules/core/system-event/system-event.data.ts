import { user } from '../user/user.data';
import { SystemEvent } from './system-event.types';

export const systemEvents: SystemEvent[] = [];
export const systemEvent: SystemEvent = {
  id_system_event: ' ',
  user: user,
  table_system_event: ' ',
  row_system_event: 1,
  action_system_event: ' ',
  date_system_event: ' ',
  deleted_system_event: false,
};
