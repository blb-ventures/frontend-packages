import { Column } from 'material-table';
import { formatter } from '@blb-ventures/library';
import { fnCol } from './fn-col';
import * as React from 'react';

export const currencyCol = (
  field: string,
  title: string,
  options?: Column<any> & { helperText?: string | React.ReactNode }
) => fnCol(field, title, val => formatter.currency(val, 2, 2), options);
