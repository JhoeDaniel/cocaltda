import { Company } from '../company/company.types';

export interface Navigation {
  id_navigation: string;
  company: Company;
  name_navigation: string;
  description_navigation: string;
  type_navigation: TYPE_NAVIGATION;
  status_navigation: boolean;
  content_navigation: string;
  deleted_navigation: boolean;

  isSelected?: boolean;
}

/**
 * Type Enum TYPE_NAVIGATION
 */
export type TYPE_NAVIGATION =
  | 'defaultNavigation'
  | 'compactNavigation'
  | 'futuristicNavigation'
  | 'horizontalNavigation';

export interface TYPE_NAVIGATION_ENUM {
  name_type: string;
  value_type: TYPE_NAVIGATION;
}

export const _typeNavigation: TYPE_NAVIGATION_ENUM[] = [
  {
    name_type: 'Navegación por defecto',
    value_type: 'defaultNavigation',
  },
  {
    name_type: 'Navegación compacta',
    value_type: 'compactNavigation',
  },
  {
    name_type: 'Navegación futurista',
    value_type: 'futuristicNavigation',
  },
  {
    name_type: 'Navegación horizontal',
    value_type: 'horizontalNavigation',
  },
];
/**
 * Type Enum TYPE_NAVIGATION
 */
