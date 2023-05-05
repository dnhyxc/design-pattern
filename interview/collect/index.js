/**
 * 考点：依赖收集
 * vue Options API
 * vue Reactive API / Composition API
 *
 * .vlaue 怎么实现
 * 响应式怎么实现 -> 一对多 -> 依赖收集
 *
 * 绑定事件处理函数如何解决 this 指向问题
 */

import { createApp } from "./source/collect";
import { ref } from "./source/hooks";

createApp("#app", {
  refs: {
    title: ref("this is title"),
    content: ref("this is content"),
  },
  methods: {
    setTitle() {
      this.title.value = "这是标题";
    },
    setContent() {
      this.content.value = "这是内容";
    },
    reset() {
      this.title.$reset();
      this.content.$reset();
    },
  },
});
