import * as Jimp from 'jimp';
import { Metamorphosis } from './metamorphosis';

export default class MetamorphosisHelper {
  static metamorphose(image: Jimp, metamorphosises: Metamorphosis[]) : Promise<Jimp> {
    let result = Promise.resolve(image);
    metamorphosises.forEach((m) => {
      result = result.then((transformed) => m.metamorphose(transformed));
    });
    return result;
  }
};
