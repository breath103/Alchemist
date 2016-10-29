import * as Jimp from 'jimp';
import Metamorphosis from '../metamorphosis';

export default class Blur extends Metamorphosis {
  constructor(private radius: number) {
    super();
  }

  static fromJSON(o: any) {
    return new this(o.radius);
  }

  metamorphose(input: Jimp) : Promise<Jimp> {
    return new Promise<Jimp>((resolve, reject) => {
      input.blur(this.radius, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}
