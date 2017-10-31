statiq-less
===========

Less.js asset handler for statiq

## Install

    npm install statiq-less

## Usage

In your statiqfile.js:

    const less = require('statiq-less');
    
    module.exports = function(statiq) {
      statiq.config({
        ... // Your configs
      });
    
      less(statiq, options); // There
    };

Now, every `*.less` file in the asset folder will be processed and copied as `*.css` in the publish folder.

## Options

`main` (string) provide a main filename to process only that file and its imports instead of copying all modules.

The options object is also passed directly to the less render method.
