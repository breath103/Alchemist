import { loadMetamorphosis } from '../metamorphosis';

import ImageHelper from '../image_helper';

// const SAVE_PATH = "./sample_images/Lea_Seydoux.jpg";
// const RESULT_PATH = "./Lea_Seydoux-result.jpg";
//
// async function test() {
//   console.log(testMetamorph);
//   let image = await ImageHelper.readJimp(SAVE_PATH);
//   image     = await testMetamorph.metamorphose(image);
//   await ImageHelper.writeJimp(image, RESULT_PATH);
//   console.log(`===============================\n check ${RESULT_PATH} for result\n\n`);
//   return image;
// }

class Engine {
  private imageS3Bucket: string;
  private imageS3Prefix: string;

  constructor() {
    this.imageS3Bucket = "s3-alchemist";
    this.imageS3Prefix = "images/";
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
  const imageId = "12345"
  engine.metamorphose(
    imageId,
    require('../db/test.json')
  ).then(result => {
    cb(result);
  }).catch(e => {
    cb(e);
  })
  // test().then((result) => {
  //   console.log(result);
  //   cb(
  //     null,
  //     {
  //       result,
  //       message: 'Go Serverless v1.0! Your function executed successfully!',
  //       event
  //     }
  //   );
  // }).catch(e => {
  //   cb(e);
  // })
};
