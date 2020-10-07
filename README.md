# Simple Gym App

This app helps me track progress in the gym and ensures that every session I'm lifting more than the last.

![alt-text](./assets/all-screenshots.png)

### Features

- Compare last session's results instantly
- Rest timer
- Offline compatibility

### Code structure

I structured the redux code in a *feature-first* over a more traditional *function-first* approach. Inspiration was found in the follow article: [re-ducks](https://www.freecodecamp.org/news/scaling-your-redux-app-with-ducks-6115955638be/). 

With the *function-first* approach you have one `./reducers` folder which contains every reducer from the app. This would be the same for `./selectors`, `./containers`, `./actions`, etc. 

The *feature-first* [re-ducks](https://www.freecodecamp.org/news/scaling-your-redux-app-with-ducks-6115955638be/) approach has one folder per feature, which contains all logic related to that feature. This helped keep all related code together.  

![alt-text](./assets/half_folder-structure.png)

