# Robots

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Building

`npm install` to install all the packages needed for the project.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## How to use it

The page will have three inputs,
- Number of Robots: which define how many robots will be used;
- Number of Moves: which define how many moves the robots should do.
- Moves: the string that define the moves that the robots.

If the Moves string is defined, the number of moves won't be used.

After define all the information, press the button "Run" and the algorithm should run and show the moves of each robot and in the end how many presents were delivered for each robot.

The button "Clear Moves and Run" will set the Moves to an empty string and generates a new random string with the number of Moves defined.

The algorithm solution is on the file `src/app/robots/robots.component.ts`