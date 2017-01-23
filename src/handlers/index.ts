import HandlerWrapper from './handler_wrapper';

import metamorphose from './metamorphose';
import api from './api';

const handlers = {
  metamorphose: HandlerWrapper.safelyWrap(metamorphose),
  api: HandlerWrapper.safelyWrap(api),
};

export = handlers;