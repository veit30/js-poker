const path = require('path');

module.exports = {
  entry: './js/src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'js/dist')
  }
};
