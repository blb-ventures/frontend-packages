/* eslint-disable import/no-unused-modules */
// eslint-disable-next-line import/no-unassigned-import
import '@emotion/react';
import { Theme as MUITheme } from '@mui/material/styles';

declare module '@emotion/react' {
  export interface Theme extends MUITheme {
    _?: string;
  }
}
