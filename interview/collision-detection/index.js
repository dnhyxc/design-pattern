const boxs = document.querySelector("#container");

boxs.addEventListener("mousedown", onMouseDown, false);

function onMouseDown(e) {
  const { target } = e;
  if (target.id.includes("box")) {
    target.style.zIndex = 1;
    target._x = e.clientX - target.offsetLeft;
    target._y = e.clientY - target.offsetTop;
    window.addEventListener("mousemove", onMouseMove, false);
    boxs.addEventListener("mouseup", onMouseUp, false);
  }
}

function onMouseUp(e) {
  window.removeEventListener("mousemove", onMouseMove, false);
  boxs.removeEventListener("onmouseup", onMouseUp, false);
  e.target.style.zIndex = 0;
}

function onMouseMove(e) {
  const { target } = e;
  const x = e.clientX - target._x;
  const y = e.clientY - target._y;

  target.style.left = x + "px";
  target.style.top = y + "px";

  const isCollision = collisionCheckWithMidpoint();
  console.log(isCollision, "isCollision");
}

function createBoxInfo(box) {
  return {
    x: box.offsetLeft,
    y: box.offsetTop,
    w: box.offsetWidth,
    h: box.offsetHeight,
  };
}

// 第一种实现方式：通过中点坐标进行比较
function collisionCheckWithMidpoint() {
  const box1 = document.querySelector("#box1");
  const box2 = document.querySelector("#box2");
  const box1Info = createBoxInfo(box1);
  const box2Info = createBoxInfo(box2);

  const box1Center = {
    x: box1Info.x + box1Info.w / 2,
    y: box1Info.y + box1Info.h / 2,
  };

  const box2Center = {
    x: box2Info.x + box2Info.w / 2,
    y: box2Info.y + box2Info.h / 2,
  };

  const diff = {
    x: Math.abs(box1Center.x - box2Center.x),
    y: Math.abs(box1Center.y - box2Center.y),
  };

  // 如果两个盒子中点坐标的差值小于等于 box1 + box2 宽高的一半，说明已经碰撞了
  if (
    diff.x <= (box1Info.w + box2Info.w) / 2 &&
    diff.y <= (box1Info.h + box2Info.h) / 2
  ) {
    return true;
  }

  return false;
}

// 第二种实现方式：通过四个边的点左边进行比较
function collisionCheckWithFourSides() {
  const box1 = document.querySelector("#box1");
  const box2 = document.querySelector("#box2");
  const box1Info = createBoxInfo(box1);
  const box2Info = createBoxInfo(box2);

  if (
    // 在左侧
    box1Info.x + box1Info.w < box2Info.x ||
    // 在上侧
    box1Info.y + box1Info.h < box2Info.y ||
    // 在右侧
    box1Info.x > box2Info.x + box2Info.w ||
    // 在下侧
    box1Info.y > box2Info.y + box2Info.h
  ) {
    return false;
  }

  return true;
}
