import ImageHelper from './image_helper';
import MetamorphosisHelper from './metamorphosis_helper';

import { Metamorphosis, CropMetamorphosis, BlurMetamorphosis } from './metamorphosis';

const metamorphosises = [
  new CropMetamorphosis({x: 50, y: 50, width: 400, height: 400}),
  new BlurMetamorphosis({radius: 10}),
];

const SAVE_PATH = "./sample_images/Lea_Seydoux.jpg";
const RESULT_PATH = "./Lea_Seydoux-result.jpg";
ImageHelper.readJimp(SAVE_PATH)
  .then(image =>
    MetamorphosisHelper.metamorphose(image, metamorphosises)
  ).then(image =>
    ImageHelper.writeJimp(image, RESULT_PATH)
  ).then(() => {
    console.log(`===============================\n check ${RESULT_PATH} for result\n\n`);
  })
