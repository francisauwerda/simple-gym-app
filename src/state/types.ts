import { rootReducer } from './store';

export type AppState = ReturnType<typeof rootReducer>;

export enum Sorting {
  lastModified = 'lastModified',
  name = 'name'
}

export enum Direction {
  ASC = 'ASC',
  DESC = 'DESC'
}
