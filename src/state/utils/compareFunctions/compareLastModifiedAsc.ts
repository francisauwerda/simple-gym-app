import moment from 'moment';
import { SortableItem } from '../../types';

const compareLastModifiedAsc = (a: SortableItem, b: SortableItem) => {
  if (moment(a.lastModified) < moment(b.lastModified)) {
    return -1;
  }

  if (moment(a.lastModified) > moment(b.lastModified)) {
    return 1;
  }

  return 0;
};

export default compareLastModifiedAsc;
