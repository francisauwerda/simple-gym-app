export const ADD = 'sets/ADD';
export const REMOVE = 'sets/REMOVE';

export interface Set {
  id: number,
  reps: number,
  weight: number,
  difficulty: number,
  date: string,
  exerciseId: number
}
