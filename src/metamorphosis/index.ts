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
export {
  Metamorphosis,
  CropMetamorphosis
};
