import { Column } from 'material-table';
import { formatter } from '@blb-ventures/library';
import { fnCol } from './fn-col';

export const zipcodeCol = (field: string, title: string, options?: Column<any>) =>
  fnCol(field, title, formatter.zipcode, options);
