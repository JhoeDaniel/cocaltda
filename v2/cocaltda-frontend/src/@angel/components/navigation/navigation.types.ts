import { IsActiveMatchOptions } from '@angular/router';

export interface AngelNavigationItem {
  id?: string;
  title?: string;
  subtitle?: string;
  type: 'aside' | 'basic' | 'collapsable' | 'divider' | 'group' | 'spacer';
  hidden?: (item: AngelNavigationItem) => boolean;
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
  link?: string;
  externalLink?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top' | string;
  exactMatch?: boolean;
  isActiveMatchOptions?: IsActiveMatchOptions;
  function?: (item: AngelNavigationItem) => void;
  classes?: {
    title?: string;
    subtitle?: string;
    icon?: string;
    wrapper?: string;
  };
  icon?: string;
  badge?: {
    title?: string;
    classes?: string;
  };
  children?: AngelNavigationItem[];
  meta?: any;
}

export type AngelVerticalNavigationAppearance =
  | 'default'
  | 'compact'
  | 'dense'
  | 'thin';

export type AngelVerticalNavigationMode = 'over' | 'side';

export type AngelVerticalNavigationPosition = 'left' | 'right';
