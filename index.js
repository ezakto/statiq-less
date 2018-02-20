const fs = require('fs');
const path = require('path');
const less = require('less');

module.exports = function(options = {}) {
  return function(statiq) {
    const { assetHandler } = statiq._config;

    statiq.config({
      assetHandler: function(source, target) {
        if (path.extname(source) !== '.less') return assetHandler(source, target);
        if (options.main && path.basename(source, '.less') !== path.basename(options.main, '.less')) return;

        const lessTarget = path.join(path.dirname(target), path.basename(target, '.less') + '.css');

        return new Promise((resolve, reject) => {
          fs.readFile(source, 'utf8', (err, data) => {
            if (err) return reject(err);

            less.render(data, Object.assign(options, { filename: source }), (err, output) => {
              if (err) return reject(err);

              fs.writeFile(lessTarget, output.css, err => {
                if (err) return reject(err);

                resolve(lessTarget);
              });
            });
          });
        });
      }
    });
  }
};
