var fs = require('fs');
fs.readFile('node_modules/wink-node-red-defaults/defaults/flow.json', 'utf8', function (err,data){
  if (err) {
  return console.log(err);
  }
  fs.writeFile('../../defaults/flow.json',data, 'utf8', function(err) {
    if (err) return console.log(err);
  });
});
