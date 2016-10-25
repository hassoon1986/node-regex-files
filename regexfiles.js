(function(){
  var fs = require('fs');
  var path = require('path');

  var regInclude = function(file, rIncludes) {
    if(!rIncludes || rIncludes.length < 1) {
      return true;
    }
    var len = rIncludes.length;
    var i = 0;
    for (; i < len; i++) {
      if (file.match(rIncludes[i])) {
        return true;
      }
    }
    return false;
  };

  var regExclude = function(dir, rExcludes, rIncludes, done) {
    var inResults = [];

    fs.readdir(dir, function(err, list) {
      if (err) return done(err);

      var pending = list.length;
      if (!pending) return done(null, inResults);

      list.forEach(function(file) {
        file = path.join(dir, file);

        var excluded = false;

        if(rExcludes && rExcludes.length > 0) {
          var len = rExcludes.length;
          var i = 0;
          for (; i < len; i++) {
            if (file.match(rExcludes[i])) {
              excluded = true;
            }
          }
        }

        if (excluded === false) {
          if(regInclude(file, rIncludes)) {
            inResults.push(file)
          }

          fs.stat(file, function(err, stat) {
            if (stat && stat.isDirectory()) {
              regExclude(file, rExcludes, rIncludes, function(err, inres) {
                inResults = inResults.concat(inres);
                if (!--pending) {
                  done(null, inResults);
                }
              });
            } else {
              if (!--pending) {
                done(null, inResults);
              }
            }
          });
        } else {
          if (!--pending) {
            done(null, inResults);
          }
        }
      });
    });
  };

  var regexfiles = function(dir, rExcludes, rIncludes, done) {
    regExclude(dir, rExcludes, rIncludes, function(err, files) {
      done(null, files);
      return;
    });
  };
  module.exports = regexfiles;
})();