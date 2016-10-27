import { S3 } from 'aws-sdk';

async function uploadToS3(imageId:string, imageBody:Buffer) {
  return new Promise((resolve, reject) => {
    const s3 = new S3();

    s3.upload({
      Bucket: 'alchemist-image',
      Key: 'images/',
      Body: imageBody,
    }, {}, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

export default (event: any, context: any, cb: any) => {
  // console.log(event);
  cb(null, event);
  // uploadToS3("test-id", event.body.image)
  //   .then(r => {
  //     cb(null, r);
  //   }).catch(e => {
  //     cb(e)
  //   });
};
