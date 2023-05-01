import { reactive, watchEffect, watch, computed } from "./source";

const btnA = document.querySelector("#aBtn");
const btnB = document.querySelector("#bBtn");

const state = reactive({
  a: 1,
  b: { c: 2 },
});

const res = computed(() => state.a + state.b.c);

btnA.addEventListener(
  "click",
  () => {
    state.a = 100;
    console.log(res.value, "res");
  },
  false
);

btnB.addEventListener(
  "click",
  () => {
    state.b.c = 200;
    console.log(res.value, "res");
  },
  false
);

watchEffect(() => {
  console.log("watchEffect => state.a", state.a);
});

watchEffect(() => {
  console.log("watchEffect => state.b.c", state.b.c);
});

watch(
  () => state.a,
  (cur, prev) => {
    console.log(cur, prev);
    console.log("watch => state.a", state.a);
  }
);

watch(
  () => state.b.c,
  (cur, prev) => {
    console.log(cur, prev);
    console.log("watch => state.b.c", state.b.c);
  }
);
