import { Column } from 'material-table';
import { fnCol } from './fn-col';
import { formatToCPF } from 'brazilian-values';

export const cpfCol = (field: string, title: string, options?: Column<any>) =>
  fnCol(field, title, formatToCPF, options);
