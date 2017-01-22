import HandlerWrapper from './handler_wrapper';

import metamorphose from './metamorphose';

const handlers = {
  metamorphose: HandlerWrapper.safelyWrap(metamorphose),
};

export = handlers;