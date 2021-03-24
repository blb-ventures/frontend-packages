import { ReactNode } from 'react';

export interface MenuRoute {
  url?: string;
  label?: string;
  icon?: ReactNode;
  startsWith?: boolean;
  external?: boolean;
  subroutes?: MenuRoute[];
  disabled?: boolean;

  scrollToEl?: string;
  onClick?: () => any;
  divider?: boolean;
  active?: boolean;
  hide?: (data: any) => boolean | boolean;
}
