class Scaner {
  constructor(targetStr) {
    this.createContext(targetStr);
  }

  createContext(targetStr) {
    this.context = {
      startPos: 0, // 起始位置
      cursor: 0, // 指针向右移动的位置
      maxCount: 0, // 最大数量
      letter: "", // 最长字符
      str: targetStr, // 源数据
    };
  }

  getContext() {
    return this.context || {};
  }

  findLetterRepeatCount() {
    const context = this.getContext();
    context.startPos = 0;
    context.cursor = 1;
    // 如果指针向右移动的位置等于字符长度，则直接输出结果
    if (context.cursor === context.str.length) {
      // 1 => 4
      return {
        maxCount: 1,
        letter: context.str[0],
      };
    }
    // 如果指针向右移动的位置小于字符长度，则进入循环
    while (context.cursor < context.str.length) {
      this.moveCursor(context);
    }
    // 如果指针向右移动的位置等于字符长度，则输出结果
    return {
      maxCount: context.maxCount,
      letter: context.letter,
    };
  }

  // 移动指针
  moveCursor(context) {
    // 如果起始位置的字符等于指针移动位置的字符，并且指针移动的位置小于字符的最大长度，则进入循环
    // 如果起始位置的字符不等于指针移动位置的字符，则指针位置不移动
    while (
      context.str[context.startPos] === context.str[context.cursor] &&
      context.cursor < context.str.length
    ) {
      // 指针持续向后移动
      context.cursor++; // 4 =>
    }

    // 如果指针移动的位置减去起始位置的大小大于原先存入的最大数量，则存入的最大数量更新为：指针移动的位置减去起始位置的大小
    if (context.cursor - context.startPos > context.maxCount) {
      context.maxCount = context.cursor - context.startPos; // 4
      // 最长字符标记为当前指针移动所在的这个位置
      context.letter = context.str[context.cursor - 1]; // d
    }

    // 将起始位置变更为指针移动位置
    context.startPos = context.cursor; // 此时的位置正好是下一个不一样的字符所在位置
  }
}

const testStr = "ddddcccddddnnnnnnnnnnnnnnwwwnnnnnhhhhhhhxxxxxhhhhh";
const scaner = new Scaner(testStr);
const result = scaner.findLetterRepeatCount();
console.log(result, "result");
