function findLetterRepeatCount(str) {
  const context = {
    startPos: 0, // 起始位置
    cursor: 0, // 指针向右移动的位置
    maxCount: 0, // 最大数量
    letter: "", // 最长字符
    str, // 源数据
  };

  if (context.cursor === context.str.length) {
    return {
      maxCount: 0,
      letter: context.str[0] || "",
    };
  }

  while (context.cursor < context.str.length) {
    moveCursor(context);
  }

  return {
    maxCount: context.maxCount,
    letter: context.letter || "",
  };
}

function moveCursor(context) {
  while (
    context.str[context.cursor] === context.str[context.startPos] &&
    context.cursor < context.str.length
  ) {
    context.cursor++;
  }

  if (context.cursor - context.startPos > context.maxCount) {
    context.maxCount = context.cursor - context.startPos;
    context.letter = context.str[context.cursor - 1];
  }

  context.startPos = context.cursor;
}

const testStr =
  "dddddwwwwwwwnnnnnnnnnnnnnnnnnnnnnnnnnnnnhhhhhhhhhhhhhhhhhxxxxxxxxxx";
const result = findLetterRepeatCount(testStr);
console.log(result, "result");

function getLetterRepeatCount(str) {
  let startPos = 0;
  let cursor = 0;
  let maxCount = 0;
  let maxStr = "";

  while (cursor < str.length) {
    if (str[cursor] !== str[startPos]) {
      if (cursor - startPos > maxCount) {
        maxCount = cursor - startPos;
        maxStr = str[cursor - 1];
      }
      startPos = cursor;
    }
    cursor++;
  }

  return {
    maxCount,
    maxStr,
  };
}

const maxInfo = getLetterRepeatCount(testStr);

console.log(maxInfo, "maxInfo");
