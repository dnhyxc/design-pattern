import Ref from "./ref";
// import { update } from "./render";

// 使用函数实现
// export function ref(defalutValue) {
//   const refWrapper = {
//     deps: new Set(),
//     _value: defalutValue,
//     _defalutValue: defalutValue,
//     $reset() {
//       this.value = this._defalutValue;
//     },
//   };

//   Object.defineProperty(refWrapper, "value", {
//     get() {
//       return refWrapper._value;
//     },
//     set(newValue) {
//       refWrapper._value = newValue;
//       update(refWrapper);
//     },
//   });

//   console.log(refWrapper, "refWrapper");

//   return refWrapper;
// }

// 使用类实现
export function ref(defalutValue) {
  return new Ref(defalutValue);
}

const reg_var = /\{\{(.+?)\}\}/;

export function createRefs(refs, nodes) {
  nodes.forEach((el) => {
    if (reg_var.test(el.textContent)) {
      const refKey = el.textContent.match(reg_var)[1].trim();
      console.log(refKey, "refKey");
      refs[refKey].deps.add(el);
    }
  });

  return refs;
}
