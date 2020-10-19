import { SortableItem } from '../../types';

const compareNameDesc = (a: SortableItem, b: SortableItem) => {
  if (a.name > b.name) {
    return -1;
  }

  if (a.name < b.name) {
    return 1;
  }

  return 0;
};

export default compareNameDesc;
