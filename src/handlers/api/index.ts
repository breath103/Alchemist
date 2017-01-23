import * as LambdaProxy from '../../interfaces/lambda-proxy';

import { resolve } from 'universal-router/legacy';

class HTTPResponseFactory {
  static json(object: any) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object),
    };
  }
}

export default async function (event: LambdaProxy.Event, context: LambdaProxy.Context) {
  const routes = [
    {
      path: '/api/images.json',
      async action() {
        return HTTPResponseFactory.json({
          someResult: "XXX",
        })
      }
    },
  ];

  const result = await resolve(routes, event);
  return result;
};
