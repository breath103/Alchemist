// Currently it's <JIMP> Metamorphosis. be mindfull of that.
export default class Metamorphosis {
  contructor(type, options) {

  }

  metamorphose(input) {
    new Promise() {

    }
  }
}


lenna.resize(256, 256)            // resize
     .quality(60)                 // set JPEG quality
     .greyscale()                 // set greyscale
     .write("./Lea_Seydoux-result.jpg", (err, result) => {
       if (err) throw err;
       else {
         console.log("Done : ", result);
       }
     }); // save
