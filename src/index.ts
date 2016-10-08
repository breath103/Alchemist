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
}

test().catch(e => {
  console.error(e);
});
