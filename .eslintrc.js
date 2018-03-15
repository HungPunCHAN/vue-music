// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    /*
rules：开启规则和发生错误时报告的等级
规则的错误等级有三种：
0或'off'：关闭规则。
1或'warn'：打开规则，并且作为一个警告（并不会导致检查不通过）。
2或'error'：打开规则，并且作为一个错误 (退出码为1，检查不通过)。
     */
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //不检测文件末尾是否有空行
    'eol-last': 0,
    //function括号前空格
    'space-before-function-paren': 0,
    //缩进风格
    'indent': [0,1,2,3,4],
     // 关闭语句强制分号结尾
    'semi': [0, "always"],
    //关闭禁止混用tab和空格
    'no-mixed-spaces-and-tabs': [0],
    //注释风格要不要有空格什么的
    'spaced-comment': 0,
    'no-tabs': 0,
    //不以新行开始的块{前面要不要有空格
    'space-before-blocks': [0, "always"],
    // 禁用行尾空格
    'no-trailing-spaces': 0,
    // 要求操作符周围有空格
    'space-infix-ops': 0,
    // 强制在对象字面量的属性中键和值之间使用一致的间距[0, {"beforeColon": false, "afterColon": true}]
    'keyword-spacing': [0]
  }
}
