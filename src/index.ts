import ImageHelper from './image_helper';

import {
  Metamorphosis,
  CropMetamorphosis,
  BlurMetamorphosis,
  RotateMetamorphosis,
  CompoundMetamorphosis
} from './metamorphosis';

const metamorphosis = new CompoundMetamorphosis({
  metamorphosisSequnece: [
    new CropMetamorphosis({x: 150, y: 150, width: 400, height: 400}),
    new BlurMetamorphosis({radius: 3}),
    new RotateMetamorphosis({degree: 60}),
  ]
})


const SAVE_PATH = "./sample_images/Lea_Seydoux.jpg";
const RESULT_PATH = "./Lea_Seydoux-result.jpg";
ImageHelper.readJimp(SAVE_PATH)
  .then(image =>
    metamorphosis.metamorphose(image)
  ).then(image =>
    ImageHelper.writeJimp(image, RESULT_PATH)
  ).then(() => {
    console.log(`===============================\n check ${RESULT_PATH} for result\n\n`);
  })
