import { TypographyProps } from '@mui/material';
import { MouseEvent, ReactNode } from 'react';
import { UrlObject } from 'url';

export interface MenuRoute {
  url?: string | UrlObject;
  label?: string;
  labelProps?: TypographyProps;
  subtitle?: string;
  icon?: ReactNode;
  startsWith?: boolean;
  external?: boolean;
  subRoutes?: MenuRoute[];
  disabled?: boolean;
  endIcon?: {
    icon: ReactNode;
    onClick?: () => unknown;
  };
  scrollToEl?: string;
  onClick?: (e: MouseEvent) => any;
  divider?: boolean;
  active?: boolean;
  hide?: (data: any) => boolean | boolean;
}
