const figlet = require('figlet');

process.stdin.on('data', s => {
  console.log(figlet.textSync(s));
});
