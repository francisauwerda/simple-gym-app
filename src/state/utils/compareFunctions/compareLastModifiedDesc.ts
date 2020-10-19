import { SortableItem } from '../../types';

const compareLastModifiedAsc = (a: SortableItem, b: SortableItem) => {
  if (a.lastModified > b.lastModified) {
    return -1;
  }

  if (a.lastModified < b.lastModified) {
    return 1;
  }

  return 0;
};

export default compareLastModifiedAsc;
