import * as fs from 'fs';
import * as LambdaProxy from '../../interfaces/lambda-proxy';

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

export default async function (event: LambdaProxy.Event, context: LambdaProxy.Context) {
  const imageId = 'Lea_Seydoux.jpg'
  const image = await metamorphose(imageId);
  const mimeType = Jimp.MIME_PNG;
  const buffer = await new Promise<Buffer>((resolve, reject) => {
    image.getBuffer(mimeType, (err, buffer) => {
      if (err) reject(err);
      else resolve(buffer);
    });
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': mimeType,
    },
    body: buffer.toString('base64'),
    isBase64Encoded: true,
  };
};
