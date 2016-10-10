import * as Jimp from 'jimp';
import * as AWS from 'aws-sdk';

export default class ImageHelper {
  static readJimpFromS3(options: { Bucket: string, Key: string }) : Promise<Jimp> {
    return new Promise((resolve, reject) => {
      const s3 = new AWS.S3();
      s3.getObject(options, (err, data) => {
        if (err) reject(err);
        else resolve(data.Body);
      });
    }).then((buffer: Buffer) => {
      return new Promise((resolve, reject) => {
        Jimp.read(buffer, (err, img) => {
          if (err) reject(err);
          else resolve(img);
        });
      });
    });
  }

  static readJimp(path: string) : Promise<Jimp> {
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
