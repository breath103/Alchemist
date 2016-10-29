import * as Jimp from 'jimp';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();

export default class ImageHelper {
  static readJimpFromS3(options: { Bucket: string, Key: string }) : Promise<Jimp> {
    return new Promise((resolve, reject) => {
      s3.getObject(options, (err, data) => {
        if (err) {
          console.log(options);
          console.error(err);
          reject(err);
        } else {
          resolve(data.Body);
        }
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

  static async writeJimpToS3(image: Jimp, options: { Bucket: string, Key: string }) {
    const buffer = await new Promise((resolve, reject) => {
      image.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
        if (err) reject(err);
        else resolve(buffer);
      });
    });

    return await new Promise((resolve, reject) => {
      s3.putObject({
        Body: buffer,
        Bucket: options.Bucket,
        Key: options.Key,
        ACL: 'public-read',
      }, (err: Error, data: any) => {
        if (err) reject(err);
        else resolve(data);
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
