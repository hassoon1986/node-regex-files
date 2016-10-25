var regexfiles = require('./regexfiles.js')

var dir = './'; // the root dir.
var _rIncludes = [/\.html$/i]; // fetch files that matched this conditions.
var _rExcludes = [/\/node_modules\//, /\/\.git\//, /\/\.tmp\//]; // exclude files that matched this conditions, do exclude first.

var st = new Date();
regexfiles(dir, _rIncludes, _rExcludes, function (err, subfiles) {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log(subfiles);
  var end = st.getTime() - (new Date()).getTime()
  console.log(end)
});

var st2 = new Date();
regexfiles(dir, _rIncludes, [], function (err, subfiles) {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log(subfiles);
  var end = st2.getTime() - (new Date()).getTime()
  console.log(end)
});

var st3 = new Date();
regexfiles(dir, [], _rExcludes, function (err, subfiles) {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log(subfiles);
  var end = st3.getTime() - (new Date()).getTime()
  console.log(end)
});