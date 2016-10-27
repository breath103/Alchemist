import { Factory } from './metamorphosis';
import JimpMetamorphosis from './jimp';

const allMetamorphosis = {};
Object.assign(allMetamorphosis, JimpMetamorphosis);

export function loadMetamorphosis(object: any) {
  return Factory.fromJSON(object, allMetamorphosis);
};
