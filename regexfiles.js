(function(){
  var fs = require('fs');
  var path = require('path');

  var regInclude = function(file, regIncludes) {
    var len = regIncludes.length;
    var i = 0;
    for (; i < len; i++) {
      if (file.match(regIncludes[i])) {
        return true;
      }
    }
    return false;
  };

  var regExclude = function(dir, regExcludes, regIncludes, done) {
    var inResults = [];

    fs.readdir(dir, function(err, list) {
      if (err) return done(err);

      var pending = list.length;
      if (!pending) return done(null, inResults);

      list.forEach(function(file) {
        file = path.join(dir, file);

        var excluded = false;

        if(regExcludes && regExcludes.length > 0) {
          var len = regExcludes.length;
          var i = 0;
          for (; i < len; i++) {
            if (file.match(regExcludes[i])) {
              excluded = true;
            }
          }
        }

        if (excluded === false) {
          if(regInclude(file, regIncludes)) {
            inResults.push(file)
          }

          fs.stat(file, function(err, stat) {
            if (stat && stat.isDirectory()) {
              regExclude(file, regExcludes, regIncludes, function(err, inres) {
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

  var regexfiles = function(dir, regIncludes, regExcludes, done) {
    if(!regExclude || regExclude.length < 1) {
      return [];
    }
    regExclude(dir, regExcludes, regIncludes, function(err, files) {
      done(null, files);
      return;
    });

  };
  module.exports = regexfiles;
})();