import * as Jimp from 'jimp';
import Metamorphosis from '../metamorphosis';

export default class Rotate extends Metamorphosis {
  constructor(private degree: number) {
    super();
  }

  static fromJSON(o: any) {
    return new this(o.degree);
  }

  metamorphose(input: Jimp) : Promise<Jimp> {
    return new Promise<Jimp>((resolve, reject) => {
      input.rotate(this.degree, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}
