export function render(refs) {
  for (const key in refs) {
    const ref = refs[key];
    _render(ref);
  }
}

function _render({ deps, value }) {
  deps.forEach((dep) => {
    dep.textContent = value;
  });
}

export function update({ deps, value }) {
  _render({ deps, value });
}
