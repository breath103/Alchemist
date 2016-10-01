import * as Jimp from 'jimp';

abstract class Metamorphosis {
  abstract metamorphose(input: Jimp) : Promise<Jimp>;
}

/// Crop
interface CropOptions {
  x: number;
  y: number;
  width: number;
  height: number;
}

class CropMetamorphosis extends Metamorphosis {
  constructor(private options: CropOptions) {
    super();
  }

  metamorphose(input: Jimp) : Promise<Jimp> {
    return new Promise<Jimp>((resolve, reject) => {
      input.crop(
        this.options.x,
        this.options.y,
        this.options.width,
        this.options.height,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  }
}

interface BlurOptions {
  radius: number;
}
class BlurMetamorphosis extends Metamorphosis {
  constructor(private options: BlurOptions) {
    super();
  }

  metamorphose(input: Jimp) : Promise<Jimp> {
    return new Promise<Jimp>((resolve, reject) => {
      input.blur(this.options.radius, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  }
}

interface RotateOptions {
  degree: number;
}

class RotateMetamorphosis extends Metamorphosis {
  constructor(private options: RotateOptions) {
    super();
  }

  metamorphose(input: Jimp) : Promise<Jimp> {
    return new Promise<Jimp>((resolve, reject) => {
      input.rotate(this.options.degree, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

interface CompoundOptions {
  metamorphosisSequnece: Metamorphosis[]
}
class CompoundMetamorphosis extends Metamorphosis {
  constructor(private options: CompoundOptions) {
    super();
  }

  metamorphose(input: Jimp) : Promise<Jimp> {
    return new Promise<Jimp>((resolve, reject) => {
      let result = Promise.resolve(input);
      this.options.metamorphosisSequnece.forEach((m) => {
        result = result.then((transformed) => m.metamorphose(transformed));
      });
      return result;
    });
  }
}

//
export {
  Metamorphosis,
  CropMetamorphosis,
  BlurMetamorphosis,
  RotateMetamorphosis,
  CompoundMetamorphosis,
};
