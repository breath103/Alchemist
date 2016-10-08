import * as Jimp from 'jimp';

abstract class Metamorphosis {
  abstract metamorphose(input: Jimp) : Promise<Jimp>;

  toJSON() {
    const properties = {};

    Object.getOwnPropertyNames(this).forEach(name => {
      const property = this[name];
      properties[name] = property.toJSON ? property.toJSON() : property;
    });

    return {
      class: this.constructor.name,
      properties,
    };
  }

  static fromJSON(jsonObject, supportedClasses) : Metamorphosis {
    return JSON.parse(JSON.stringify(jsonObject), (k, v) => {
      if (v.class) {
        const klass = supportedClasses[v.class];
        if (klass) {
          return klass.fromJSON(v.properties);
        } else {
          throw new Error(`${v.class} is not supported`);
        }
      }

      return v;
    });
  }
}

export default Metamorphosis;
