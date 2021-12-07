class OutputText {
  constructor(props) {
    this.name = props.name;
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('OutputText', (compilation, callback) => {
      const text = this.name + '测试';
      compilation.assets['test.txt'] = {
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
