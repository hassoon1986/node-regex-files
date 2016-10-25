# node-regex-files

```js
var regexfiles = require('regex-files');

var dir = './'; // the root dir.
var rExcludes = [/\/node_modules\//, /\/\.git\//, /\/\.tmp\//]; // exclude files that matched this conditions, do exclude first.
var rIncludes = [/\.html$/i]; // fetch files that matched this conditions. If it is empty, then it is not filtered.

var st = new Date();
regexfiles(dir, rExcludes, rIncludes, function (err, subfiles) {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log(subfiles);
  var end = st.getTime() - (new Date()).getTime()
  console.log(end)
});

var st2 = new Date();
regexfiles(dir, [], rIncludes, function (err, subfiles) {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log(subfiles);
  var end = st2.getTime() - (new Date()).getTime()
  console.log(end)
});

var st3 = new Date();
regexfiles(dir, rExcludes, [], function (err, subfiles) {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log(subfiles);
  var end = st3.getTime() - (new Date()).getTime()
  console.log(end)
});
```