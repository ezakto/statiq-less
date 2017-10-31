const fs = require('fs');
const path = require('path');
const less = require('less');

module.exports = function(statiq, options = {}) {
  const { assetHandler } = statiq._config;

  statiq.config({
    assetHandler: function(source, target) {
      if (path.extname(source) !== '.less') return assetHandler(source, target);
      if (options.main && path.basename(source, '.less') !== path.basename(options.main, '.less')) return;

      const lessTarget = path.join(path.dirname(target), path.basename(target, '.less') + '.css');

      less.render(fs.readFileSync(source, 'utf8'), Object.assign(options, { filename: source }), (e, output) => {
        fs.writeFileSync(lessTarget, output.css);
      });

      return lessTarget;
    }
  });
};
