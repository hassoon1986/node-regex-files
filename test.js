var regexfiles = require('./regexfiles.js')

var _regIncludes = [/\.html$/i];
var _regExcludes = [/\/node_modules\//, /\/\.git\//, /\/\.tmp\//];

var st = new Date();
regexfiles('./', _regIncludes, _regExcludes, function (err, subfiles) {
  if (err) {
    console.log(chalk.red(err.message));
    return;
  }
  console.log(subfiles);
  var end = st.getTime() - (new Date()).getTime()
  console.log(end)
});

var st2 = new Date();
regexfiles('./', _regIncludes, [], function (err, subfiles) {
  if (err) {
    console.log(chalk.red(err.message));
    return;
  }
  console.log(subfiles);
  var end = st2.getTime() - (new Date()).getTime()
  console.log(end)
});