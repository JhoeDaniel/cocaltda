import { Navigation } from '../../navigation/navigation.types';
import { Profile } from '../profile.types';

export interface ProfileNavigation {
  id_profile_navigation: string;
  profile: Profile;
  navigation: Navigation;
}
