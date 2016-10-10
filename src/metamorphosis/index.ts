import Metamorphosis from './metamorphosis';
import JimpMetamorphosis from './jimp';

const allMetamorphosis = {};
Object.assign(allMetamorphosis, JimpMetamorphosis);

export function loadMetamorphosis(json) {
  return Metamorphosis.fromJSON(json, allMetamorphosis);
};
