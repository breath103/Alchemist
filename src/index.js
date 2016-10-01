const Jimp = require('jimp');
// Test
Jimp.read("./sample_images/Lea_Seydoux.jpg", function (err, lenna) {
  if (err) throw err;
  lenna.resize(256, 256)            // resize
       .quality(60)                 // set JPEG quality
       .greyscale()                 // set greyscale
       .write("./Lea_Seydoux-result.jpg", (err, result) => {
         if (err) throw err;
         else {
           console.log("Done : ", result);
         }
       }); // save
});
