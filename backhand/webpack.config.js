var request   = require('request');
const path = require('path');
var config = {
  externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore'],
};

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.bundle.js'
  },
  target: 'node'
};