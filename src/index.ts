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

function writeJimp(image: Jimp, path: string) : Promise<Jimp> {
  return new Promise((resolve, reject) => {
    image.write(path, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  })}

function metamorphose(image: Jimp, metamorphosis: Metamorphosis[]) : Promise<Jimp> {
  let result = Promise.resolve(image);
  metamorphosises.forEach((m) => {
    result = result.then((transformed) => m.metamorphose(transformed));
  });
  return result;
}

const metamorphosises = [
  new CropMetamorphosis({x: 200, y: 200, width: 100, height: 100})
];



readJimp("./sample_images/Lea_Seydoux.jpg")
  .then(image => metamorphose(image, metamorphosises))
  .then(image => writeJimp(image, "./Lea_Seydoux-result.jpg"));
