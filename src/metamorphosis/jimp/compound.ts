import * as Jimp from 'jimp';
import Metamorphosis from '../metamorphosis';

export default class Compound extends Metamorphosis {
  constructor(private metamorphosisSequnece: Metamorphosis[]) {
    super();
  }

  static fromJSON(o) {
    return new this(o.metamorphosisSequnece);
  }

  metamorphose(input: Jimp) : Promise<Jimp> {
    let result = Promise.resolve(input);
    this.metamorphosisSequnece.forEach((m) => {
      result = result.then((transformed) => m.metamorphose(transformed));
    });
    return result;
  }
}
