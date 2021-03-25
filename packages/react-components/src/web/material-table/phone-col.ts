import { Column } from 'material-table';
import { fnCol } from './fn-col';
import { formatToPhone } from 'brazilian-values';

export const phoneCol = (field: string, title: string, options?: Column<any>) =>
  fnCol(field, title, formatToPhone, options);
