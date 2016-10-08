import { Metamorphosis } from './index';

enum OptionType {
  String: 'string',
  Number: 'number',
}

function MetamorphosisFactory(
  template: {
    name: string,
    options: { name: string, type: OptionType }[]
  }
) : Metamorphosis {
  const metamorphosis = function(o) {
    const that = this;

    that.options = {};
    template.options.forEach(function(definition) {
      const v = o[definition.name];
    });
  };
  metamorphosis.name = name;

  return metamorphosis;
}
