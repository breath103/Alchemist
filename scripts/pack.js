const exec = require('child_process').exec;

function pack() {
  exec(`
    (rm dst.zip || true) &&
    cp package.json dst/package.json &&
    cd dst &&
    npm install --production &&
    zip -r ../dst.zip . **
  `, {
    maxBuffer: 1024 * 1024 * 20
  }, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  });
}

if (require.main === module) {
  pack();
} else {
  module.exports = pack;
}
