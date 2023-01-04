import { user } from '../user/user.data';
import { Session } from './session.types';

export const sessions: Session[] = [];
export const session: Session = {
  id_session: ' ',
  user: user,
  host_session: ' ',
  agent_session: ' ',
  date_sign_in_session: ' ',
  date_sign_out_session: ' ',
  status_session: false,
};
