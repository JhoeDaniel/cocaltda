import { company } from '../company/company.data';
import { Navigation } from './navigation.types';

export const navigations: Navigation[] = [];
export const navigation: Navigation = {
  id_navigation: ' ',
  company: company,
  name_navigation: ' ',
  description_navigation: ' ',
  type_navigation: 'defaultNavigation',
  status_navigation: false,
  content_navigation: ' ',
  deleted_navigation: false,
};
