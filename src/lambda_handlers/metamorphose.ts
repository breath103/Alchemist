import { loadMetamorphosis } from '../metamorphosis';

import ImageHelper from '../image_helper';

class Engine {
  private imageS3Bucket: string;
  private imageS3Prefix: string;

  constructor() {
    this.imageS3Bucket = 'alchemist-image';
    this.imageS3Prefix = 'images/';
  }

  async metamorphose(imageId: string, metamorphosisRecipe: any) {
    const image = await ImageHelper.readJimpFromS3({
      Bucket: this.imageS3Bucket,
      Key: `${this.imageS3Prefix}${imageId}`
    });

    const metamorphosis = loadMetamorphosis(metamorphosisRecipe);

    const result = await metamorphosis.metamorphose(image);
    return result;
  }
};

const engine = new Engine();

export default (event, context, cb) => {
  const imageId = 'test-id'
  engine.metamorphose(
    imageId,
    require('../db/test.json')
  ).then(result => {
    cb(result);
  }).catch(e => {
    cb(e);
  })
};
