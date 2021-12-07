module.exports = {
  root: true,
  parserOptions: {
    // sourceType: "module",
  },
  env: {
    browser: true, // 浏览器全局变量
    commonjs: true, // CommonJS全局变量和CommonJS范围
    es6: true, // 启用除模块之外的所有ECMAScript 6功能
    node: true, // Node.js全局变量和Node.js范围
  },
  rules: {
    // indent: ["error", 2],
    // quotes: ["error", "double"],
    // semi: ["error", "always"],
    // "no-console": "error",
    // "arrow-parens": 0,
  },
  
  // extends: 'eslint:recommended',
};

//.eslintrc文件配置 https://www.jianshu.com/p/a4966ddf9b0c
