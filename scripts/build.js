const exec = require('child_process').exec;

function build() {
  exec(`
    rm -rf dst &&
    cp -r src dst &&
    tsc
  `, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}

if (require.main === module) {
  build();
} else {
  module.exports = build;
}
