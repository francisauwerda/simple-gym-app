import { Settings, SortableItem } from '../types';
import getCompareFunction from './getCompareFunction';

const sortItems = (
  items: SortableItem[],
  settings?: Settings,
) => {
  const compareFunction = getCompareFunction(settings);
  const cloned = [...items];
  const sorted = cloned.sort(compareFunction);

  return sorted;
};

export default sortItems;
