### 桥接模式

该模式将抽象部分与它的实现部分分离，使它们都可以独立变化。

#### 适用场景

1. 如果一个系统需要在构件的抽象化角色和具体化角色之间增加更多的灵活性，避免在两个层次之间建立静态的继承联系，通过桥接模式可以使它们在抽象层建立一个关联关系。

2. 对于那些不希望使用继承或因为多层次继承导致系统类的个数急剧增加的系统，桥接模式尤为适用。

3. 一个类存在两个独立变化的维度，且这两个维度都需要进行扩展。

#### 实现方式

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>桥接模式</title>
  </head>
  <body>
    <div id="message">
      <div id="content"></div>
    </div>

    <div id="message_2">
      <div id="content"></div>
    </div>
    <script>
      const Animations = {
        bounce: {
          show(ele) {
            console.log(ele, "弹跳显示");
          },

          hide(ele) {
            console.log(ele, "弹跳隐藏");
          },
        },

        slide: {
          show(ele) {
            console.log(ele, "滑动显示");
          },

          hide(ele) {
            console.log(ele, "滑动隐藏");
          },
        },

        rotate: {
          show(ele) {
            console.log(ele, "旋转显示");
          },

          hide(ele) {
            console.log(ele, "旋转隐藏");
          },
        },
      };

      function Toast(ele, animation) {
        this.ele = ele;
        this.animation = animation;
        // 扩展 Message 其它属性
      }

      Toast.prototype.show = function () {
        this.animation.show(this.ele);
      };

      Toast.prototype.hide = function () {
        this.animation.hide(this.ele);
      };

      class Message {
        constructor(ele, animation) {
          this.ele = ele;
          this.animation = animation;
        }

        show() {
          this.animation.show(this.ele);
        }

        hide() {
          this.animation.hide(this.ele);
        }

        setContent(value) {
          const content = this.ele.querySelector("#content");
          content.innerHTML = value;
        }
      }
      const toast1 = new Toast("toast1", Animations.bounce);
      const toast2 = new Toast("toast1", Animations.slide);
      const message1 = new Message(message, Animations.rotate);
      const message2 = new Message(message_2, Animations.bounce);

      toast1.show();
      toast2.show();
      message1.show();
      message2.show();

      setTimeout(() => {
        message1.setContent("我是message1消息内容");
        message2.setContent("我是message2消息内容");
      }, 1500);

      setTimeout(() => {
        toast1.hide();
        toast2.hide();
        message1.hide();
        message2.hide();
      }, 2000);
    </script>
  </body>
</html>
```

#### 桥接模式的优缺点

优点：把抽象与实现隔离开，有助于独立地管理各组成部分。

缺点：每使一个桥接元素都要增加一次函数调用，这对应用程序地性能会有一些负面影响（提高了系统地复杂度）。
