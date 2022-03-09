module.exports = {
  arrowParens: "avoid", // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
  singleQuote: false, // 是否单引号
  semi: true, // 声明结尾使用分号(默认true)
  printWidth: 100, // 一行的字符数，超过会换行（默认80）
  tabWidth: 2, // 每个tab相当于多少个空格（默认2）
  useTabs: false, // 是否使用tab进行缩进（默认false）
  quoteProps: "as-needed",
  bracketSpacing: true, // 对象字面量的大括号间使用空格（默认true）
  jsxBracketSameLine: false, // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
  jsxSingleQuote: false,
  htmlWhitespaceSensitivity: "ignore",
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 200,
      },
    },
  ],
};
