import * as Jimp from 'jimp';
import Metamorphosis from '../metamorphosis';

export default class Resize extends Metamorphosis {
  constructor(private width: number, private height: number) {
    super();
  }

  static fromJSON(o) {
    return new this(o.width, o.height);
  }

  metamorphose(input: Jimp) : Promise<Jimp> {
    return new Promise<Jimp>((resolve, reject) => {
      input.resize(this.width, this.height, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}
