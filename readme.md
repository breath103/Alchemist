Thing to implement

Features

1) Upload Image To S3
  Let user to upload to image to certain S3 path, and return random generated image_id (Refer Cloudinary API).
  Image -> (HTTP POST multipart) -> API Gateway -> AWS Lambda -> S3
    |                                                    |
    --------<---------- Client <- { image_id: '158g2'} <-
2) Define the transform and register it
  Such as
  small_thumbnail = {
    name: 'smt',
    transforms: [
      {
        type: 'crop',
        width: '500',
        height: '400',
        crop_type: 'center',
      },
      {
        type: 'rotate',
        center_x: '50%',
        center_y: '50%',
        degree: '30'
      }
    ]
  }

3) User can get that image via HTTP call,
  http://alchemist.test.com/images/158g2/smt
