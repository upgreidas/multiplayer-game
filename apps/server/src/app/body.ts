import { Vector } from 'vector2d'

export class Body {

  private velocity = new Vector(0, 0);

  constructor(x: number, y: number, radius: number) {

  }

  setVelocity(x: number, y: number) {
    this.velocity.setAxes(x, y);
  }

  update(dt: number) {
    
  }

}