import { bindEvent } from "./event";
import { createRefs } from "./hooks";
import { render } from "./render";

export function createApp(el, { refs, methods }) {
  const $el = document.querySelector(el);
  const allNodes = $el.querySelectorAll("*");

  const refSet = createRefs(refs, allNodes);
  console.log(refSet, "refSet");
  render(refSet);
  bindEvent.apply(refSet, [allNodes, methods]);
}
