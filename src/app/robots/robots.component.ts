import { Component } from '@angular/core';

interface Robot {
  name: string;
  position: { x: number, y: number };
  numberOfPresentsDelivered: number;
}

interface Log {
  action: string;
  colorClass: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'robots',
  templateUrl: './robots.component.html',
  styleUrls: ['./robots.component.scss']
})
export class RobotsComponent {

  movesCode = {
    up: '^',
    down: 'V',
    left: '<',
    right: '>'
  };

  moves = [
    '^', 'V', '<', '>'
  ];

  robots: Robot[] = [];

  numberOfRobots = 1;
  numberOfMoves = 12;
  moveString = '';

  logs: Log[] = [];

  constructor() { }

  init() {
    this.logs = [];
    this.initializeMoveString();
    this.initializeRobots();
    let moveArr = this.moveString.split('');
    let roundNumber = 1;
    while (moveArr.length > 0) {
      this.logs.push(
        {
          action: `Round ${roundNumber++}`,
          colorClass: 'alert'
        });
      moveArr = this.moveRobots(moveArr);
      if (!this.hasDelivery()) {
        this.logs.push(
          {
            action: `No deliveries this round`,
            colorClass: 'alert alert-secondary'
          });
      }
    }
  }

  private hasDelivery(): boolean {
    let someDelivery = false;
    this.robots.forEach((currentRobot) => {
      let deliveredPresent = true;
      const currentRobotPosition = `${currentRobot.position.x}${currentRobot.position.y}`;
      this.robots.forEach((otherRobot) => {
        if (otherRobot.name !== currentRobot.name) {
          const otherRobotPosition = `${otherRobot.position.x}${otherRobot.position.y}`;
          if (currentRobotPosition === otherRobotPosition) {
            deliveredPresent = false;
          }
        }
      });
      if (deliveredPresent) {
        someDelivery = true;
        this.logs.push(
          {
            action: `Robot ${currentRobot.name} delivered a present`,
            colorClass: 'alert alert-success'
          });
        currentRobot.numberOfPresentsDelivered++;
      }
    });
    return someDelivery;
  }

  private initializeRobots() {
    this.robots = [];
    for (let i = 0; i < this.numberOfRobots; i++) {
      this.robots.push(
        { name: `robot-${i + 1}`, position: { x: 0, y: 0 }, numberOfPresentsDelivered: 0 }
      );
    }
  }

  private initializeMoveString() {
    if (!this.moveString) {
      for (let i = 0; i < this.numberOfMoves; i++) {
        this.moveString += this.getNewMove();
      }
    }
  }

  private moveRobots(moveArr: string[]) {
    this.robots.forEach((robot) => {
      const currentMove = moveArr[0];
      moveArr = moveArr.slice(1, moveArr.length);
      if (currentMove) {
        if (currentMove === this.movesCode.up) {
          robot.position.y++;
        } else if (currentMove === this.movesCode.down) {
          robot.position.y--;
        } else if (currentMove === this.movesCode.left) {
          robot.position.x--;
        } else if (currentMove === this.movesCode.right) {
          robot.position.x++;
        }
        this.logs.push(
          {
            action: `${robot.name}, moved to '${currentMove}' and current position is x:${robot.position.x} y:${robot.position.y}`,
            colorClass: 'alert alert-primary'
          });
      }
    });
    return moveArr;
  }

  getNewMove(): string {
    return this.moves[Math.floor(Math.random() * 4)];
  }
}
