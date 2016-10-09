import ImageHelper from './image_helper';

import { loadMetamorphosis } from './metamorphosis';

const testMetamorph = loadMetamorphosis(require('./db/test.json'));

const SAVE_PATH = "./sample_images/Lea_Seydoux.jpg";
const RESULT_PATH = "./Lea_Seydoux-result.jpg";

async function test() {
  console.log(testMetamorph);
  let image = await ImageHelper.readJimp(SAVE_PATH);
  image     = await testMetamorph.metamorphose(image);
  await ImageHelper.writeJimp(image, RESULT_PATH);
  console.log(`===============================\n check ${RESULT_PATH} for result\n\n`);
  return image;
}

export default (event, context, cb) => {

  test().then((result) => {
    console.log(result);
    cb(
      null,
      {
        result,
        message: 'Go Serverless v1.0! Your function executed successfully!', event
      }
    );

  }).catch(e => {
    console.error(e);
  })

};
