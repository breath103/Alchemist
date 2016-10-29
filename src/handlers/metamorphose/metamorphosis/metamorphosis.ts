import * as Jimp from 'jimp';

interface MetamorphosisClass {
  fromJSON(object: any): Metamorphosis;
}

abstract class Metamorphosis {
  abstract metamorphose(input: Jimp) : Promise<Jimp>;

  toJSON() {
    const properties: { [key: string]: any; } = {};

    Object.getOwnPropertyNames(this).forEach(name => {
      const property = (this as { [key: string]: any; })[name];
      properties[name] = property.toJSON ? property.toJSON() : property;
    });

    return {
      class: this.constructor.name,
      properties,
    };
  }
}

export class Factory {
  static fromJSON(
    jsonObject: any,
    supportedClasses: { [name: string]: MetamorphosisClass; }
  ) : Metamorphosis {
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
