const state = {
  workouts: [{
    id: 1,
    name: 'legs',
  }],

  exercises: [{
    id: 1,
    name: 'squats',
    workoutId: 1,
  }],

  sets: [{
    id: 1,
    reps: 10,
    weight: 70,
    difficuly: 5,
    date: '20-09-2019',
    exericiseId: 1,
  }],

};


export default state;
