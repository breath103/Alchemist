import * as Jimp from 'jimp';

export default class ImageHelper {
  static readJimp(path) : Promise<Jimp> {
    return new Promise((resolve, reject) => {
      Jimp.read(path, (err, img) => {
        if (err) reject(err);
        else resolve(img);
      });
    });
  }

  static writeJimp(image: Jimp, path: string) : Promise<Jimp> {
    return new Promise((resolve, reject) => {
      image.write(path, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}
