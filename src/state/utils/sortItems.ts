import { Settings, SortableItem } from '../types';
import getCompareFunction from './getCompareFunction';

const sortItems = (
  items: SortableItem[],
  settings?: Settings,
) => {
  const compareFunction = getCompareFunction(settings);
  const sorted = items.sort(compareFunction);

  return sorted;
};

export default sortItems;
