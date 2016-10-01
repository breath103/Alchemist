import { Metamorphosis, CropMetamorphosis } from './metamorphosis';
import * as Jimp from 'jimp';

function readJimp(path) : Promise<Jimp> {
  return new Promise((resolve, reject) => {
    Jimp.read(path, (err, img) => {
      if (err) reject(err);
      else resolve(img);
    });
  });
}

function metamorphose(metamorphosis: Metamorphosis[]) : Promise<Jimp> {

}

const metamorphosises = [
  new CropMetamorphosis({x: 200, y: 200, width: 100, height: 100})
];

readJimp("./sample_images/Lea_Seydoux.jpg")
  .then((image) => {
    let result = Promise.resolve(image);
    metamorphosises.forEach((m) => {
      result = result.then((transformed) => m.metamorphose(transformed));
    });
    return result;
  })
  .then(image => new Promise((resolve, reject) => {
    image.write("./Lea_Seydoux-result.jpg", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  }), (err) => {
    throw err;
  });
// if (err) throw err;
// lenna.resize(256, 256)            // resize
//      .quality(60)                 // set JPEG quality
//      .greyscale()                 // set greyscale
//      .write("./Lea_Seydoux-result.jpg", (err, result) => {
//        if (err) throw err;
//        else {
//          console.log("Done : ", result);
//        }
//      }); // save
