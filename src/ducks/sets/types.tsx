export const ADD = 'sets/ADD';
export const REMOVE = 'sets/REMOVE';

export interface Set {
  reps: number,
  weight: number,
  difficulty: number,
  date: string,
  exerciseId: number
}
