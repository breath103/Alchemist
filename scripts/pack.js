const exec = require('child_process').exec;

function pack() {
  exec(`
    zip -r dst.zip dst **
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
