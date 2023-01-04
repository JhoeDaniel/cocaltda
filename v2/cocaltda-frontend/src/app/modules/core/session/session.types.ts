import { User } from '../user/user.types';

export interface Session {
  id_session: string;
  user: User;
  host_session: string;
  agent_session: string;
  date_sign_in_session: string;
  date_sign_out_session: string;
  status_session: boolean;
}
