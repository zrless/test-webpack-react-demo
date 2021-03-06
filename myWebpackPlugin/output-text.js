/**
 * webpack plugin
 * 本质上就是一个 node 模块，通过写一个类来使用编译暴漏出来的钩子实现编译过程的可控；
 * 是 webpack 用于在编译过程中利用钩子进行各种自定义输出的函数；
 * 由此我们就可以在开发模式下，可以通过监听编译过程的各个钩子事件来完成如释出模版，对 js、css、html 进行压缩、去重等各类操作，结束后释出对应文件等等你可以想到的任何操作
 * 
 * webpack 的插件简单来说就是在函数中通过调用 webpack 执行的钩子来完成自动化的过程，在函数中我们通过监听 compiler 钩子，并在回调中执行我们需要做的事情，
 * 最后调用回调中的第二个参数 callback 使 webpack 继续构建，否则将在此处停止编译，整个过程都是在 webpack 的整个编译过程中利用其暴漏出的钩子进行的
 */
class OutputText {
  constructor(props) {
    this.name = props.name;
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('OutputText', (compilation, callback) => {
      const text = this.name + '测试';
      compilation.assets['OutputTextTest.txt'] = {
        source() {
          return text;
        },
        size() {
          return text.length;
        },
      };
      callback();
    });
  }
}

module.exports = OutputText;






