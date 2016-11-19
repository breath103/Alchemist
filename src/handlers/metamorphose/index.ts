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

    const metamorphosedImage = await metamorphosis.metamorphose(image);

    // const uploadToS3 = await ImageHelper.writeJimpToS3(metamorphosedImage, {
    //   Bucket: this.imageS3Bucket,
    //   Key: `${this.imageS3Prefix}${imageId}/${recipeName}`
    // });

    return metamorphosedImage;
  }
}

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

  metamorphose(imageId)
    .then((image) => {
      const mimeType = Jimp.MIME_PNG;
      image.getBuffer(mimeType, (err, buffer) => {
        context.done(err, {
          statusCode: 200,
          headers: {
            'Content-Type': mimeType,
          },
          body: buffer.toString('base64')
        });
      })
    }).catch(e => {
      context.done(e, null);
    })
};
