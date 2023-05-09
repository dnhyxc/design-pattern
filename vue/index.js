import { reactive, watchEffect, watch, computed } from "./package/index";

const response = {
  name: "dnhyxc",
  code: 200,
  data: {
    title: "数据劫持",
    list: [1, 2, 3, 4, 5],
  },
};

const status = reactive(response);

watchEffect(() => {
  console.log(status.name, "<<<<<response.name");
  title.innerHTML = status.name;
});

watchEffect(() => {
  console.log(status.data.list, "<<<<<response.data.list");
  list.innerHTML = status.data.list;
});

watch(
  () => status.name,
  (value, oldValue) => {
    console.log(value, "<<<<<<<value,status.name");
    console.log(oldValue, "<<<<<<<oldValue,status.name");
  }
);

watch(
  () => status.data.list,
  (value, oldValue) => {
    console.log(value, "<<<<<<<value,status.data.list");
    console.log(oldValue, "<<<<<<<oldValue,status.data.list");
  }
);

const computedState1 = computed(() => {
  return status.name + "[yhyh]";
});

console.log(computedState1.value, "computedState1");

const computedState2 = computed(() => {
  return status.data.list;
});

console.log(computedState2.value, "computedState2");

btn1.addEventListener("click", () => {
  status.name = "cxcx";
  console.log(computedState1.value, "computedState1");
});

btn2.addEventListener("click", () => {
  status.data.list = [1, 2, 3, 4, 5, 66];

  console.log(computedState2.value, "computedState2");
});

btn3.addEventListener("click", () => {
  status.name = "dnhyxc";
  status.data.list = [1, 2, 3, 4, 5];
});
