export function bindEvent(nodes, methods) {
  nodes.forEach((el) => {
    const handlerName = el.getAttribute("@click");

    if (handlerName) {
      el.addEventListener("click", methods[handlerName].bind(this), false);
    }
  });
}
