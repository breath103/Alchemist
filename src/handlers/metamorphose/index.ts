import { loadMetamorphosis } from './metamorphosis';
import ImageHelper from './image_helper';

class Engine {
  constructor(
    private imageS3Bucket: string,
    private imageS3Prefix: string
  ) {}

  /** returns https path for image */
  async metamorphose(imageId: string, recipeName: string, recipe: any) {
    const image = await ImageHelper.readJimpFromS3({
      Bucket: this.imageS3Bucket,
      Key: `${this.imageS3Prefix}${imageId}`
    });

    const metamorphosis = loadMetamorphosis(recipe);

    const result = await metamorphosis.metamorphose(image);
    const uploadToS3 = await ImageHelper.writeJimpToS3(result, {
      Bucket: this.imageS3Bucket,
      Key: `${this.imageS3Prefix}${imageId}/${recipeName}`
    });

    return `https://s3.amazonaws.com/${this.imageS3Bucket}/images/${imageId}/${recipeName}`;
  }
};

import * as Jimp from 'jimp';

const engine = new Engine('alchemist-images', 'images/');

async function metamorphose(imageId: string) {
  const recipeName = 'test';
  const recipe = {
    "class": "Resize",
    "properties": {
      "width": 200,
      "height": 200
    }
  };

  return await engine.metamorphose(imageId, recipeName, recipe);
}

export default function (event: any, context: Context) {
  const imageId = 'Lea_Seydoux.jpg'

  metamorphose(imageId).then((result) => {
    context.done(null, {
      statusCode: 302,
      headers: {
        'Content-Type': 'image/jpeg',
        'Location': result,
      }
    });
  }).catch(e => {
    context.done(e, null);
  })
};
