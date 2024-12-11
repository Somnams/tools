/// merge config options => 
///   new compiler => module compiler => 
/// compiler finished => output file

const webpack = require('./webpack');
const config = require('../example/webpack.config');
const compiler = webpack(config);

compiler.run()