import { loadMetamorphosis } from './metamorphosis';
import ImageHelper from './image_helper';

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

import * as Jimp from 'jimp';

export default function (event: any, context: Context) {
  const imageId = 'test-id'
  engine.metamorphose(
    imageId,
    require('./db/test')
  ).then(result => {
    result.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
      context.done(null, {
        statusCode: 200,
        headers: { 'Content-Type': 'image/jpeg' },
        body: buffer.toString('utf8'),
      });
    })
  }).catch(e => {
    context.done(e, null);
  })
};
