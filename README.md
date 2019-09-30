# Folder structure for DUCKS

- ducks
  - featureName
    - actions.tsx (all the action creator functions, exposed by operations.tsx)
    - index.tsx (export by default the reducer. Exports operations and selectors. Exports types if it is needed by other ducks.)
    - operations.tsx (for chained operations. thunk or sagas. If it dispatchs a single action then it is written inside actions.tsx and exposed through operations.)
    - reducers.tsx (The state shape for this feature is exposed in this reducer.)
    - selectors.tsx (Part of the public interface of the duck. Selectors take a slice of the app state and return and return some data based on that.)
    - tests.tsx (Tests for reducers, operations and selectors.)
    - types.tsx (names of the actions being dispatched)
    - utils.tsx
