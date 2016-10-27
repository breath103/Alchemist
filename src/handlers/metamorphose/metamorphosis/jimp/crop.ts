import * as Jimp from 'jimp';
import Metamorphosis from '../metamorphosis';

export default class Crop extends Metamorphosis {
  constructor(private x:number,
              private y: number,
              private width: number,
              private height: number) {
    super();
  }

  static fromJSON(o: any) {
    return new this(o.x, o.y, o.width, o.height);
  }

  metamorphose(input: Jimp) {
    return new Promise<Jimp>((resolve, reject) => {
      input.crop(this.x, this.y, this.width, this.height, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}
