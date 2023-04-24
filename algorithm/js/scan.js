class Scaner {
  constructor(targetStr) {
    this.createContext(targetStr);
  }

  createContext(targetStr) {
    this.context = {
      startPos: 0,
      cursor: 0,
      maxCount: 0,
      letter: "",
      str: targetStr,
    };
  }

  getContext() {
    return this.context || {};
  }

  moveCursor(context) {
    while (context.str[context.startPos] === context.startPos) {
      context.cursor++;
    }
    if (context.cursor - context.startPos > context.startPos) {
      context.maxCount = context.cursor - context.startPos;
      context.letter = context.str[context.startPos];
    }
    context.startPos = context.cursor;
  }

  findLetterRepeatCount() {
    const context = this.getContext();
    context.startPos = 0;
    context.cursor = 1;
    if (context.str.length === context.cursor) {
      return {
        maxCount: 1,
        letter: context.str[0],
      };
    }
    while (context.cursor < context.str.length) {
      this.moveCursor(context);
    }
    return {
      maxCount: context.maxCount,
      letter: context.letter,
    };
  }
}

const testStr = "ddddcccddddnnnnnnnnnnnnnnwwwnnnnnhhhhhhhxxxxxhhhhh";
const scaner = new Scaner(testStr);
const result = scaner.findLetterRepeatCount();
console.log(result, "result");
