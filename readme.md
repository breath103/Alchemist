Thing to implement

Features

1) Upload Image To S3
  Let user to upload to image to certain S3 path, and return random generated image_id (Refer Cloudinary API).
  Image -> (HTTP POST multipart) -> API Gateway -> AWS Lambda -> S3
    |                                                    |
    --------<---------- Client <- { image_id: '158g2'} <-
2) Define the <Metamorphosis> and register it
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

  in the long term, we should store those on database (Dynamo DB maybe?)
  and be able to manage those on web console OR via API,
  but in short term, we'll put those into the deployment package such as metamorphosis/small_thumbnail.json
  and deploy it to lambda with the other code.

3) User can get that image via HTTP call,
  http://alchemist.test.com/images/158g2/smt



# What's this for?
this is for all the developers who building microservice (usually http) based on
AWS Gateway / AWS Lambda, Plus sweet typescript / serverless framework

# How to start?
There are few things you need to customize to starts.

1) serverless.yml
  - name service

    ```service: lambda-microservice-template # NOTE: update this with your service name```


## How to invoke function on lambda

serverless invoke -f #{functionName}

## How to invoke function locally

npm run invoke -- -f hello

## Test

this project use mocha + typescript for unit test. place test files as src/**/__test__/*.ts
then run ```npm run test```
