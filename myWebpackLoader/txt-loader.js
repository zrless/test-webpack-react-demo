/**
 * webpack loader
 * 本质上就是一个 node 模块，通过写一个函数来完成自动化的过程；
 * 是 webpack 用于在编译过程中解析各类文件格式，并输出；
 * 由此我们就可以在开发模式下，通过解析各类前端无法解析的文件格式，然后将其解析后返回为对象或字符串供前端开发时使用，在 webpack 的编译过程中自动会将我们前端项目中引用的文件格式对应到指定 loader 解析后输出。
 */
const utils = require('loader-utils');
module.exports = function (source) {
  const options = utils.getOptions(this);
  console.log('==============', options);
  const result = source.replace(/\[name\]g/, options.name);
  this.callback(null, result);
};
