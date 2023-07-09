<script setup lang="ts">
const props = defineProps<{
  series?: Series;
  max: number;
  modelValue: number;
}>();
const emit = defineEmits<{
  (event: "update:modelValue", data: number): void;
}>();

const isLast = computed(() => {
  return props.modelValue >= props.max;
});

const isFirst = computed(() => {
  return props.modelValue <= 1;
});

const changeSeason = (next?: boolean) => {
  if (next && isLast.value) return emit("update:modelValue", 1);
  if (!next && isFirst.value) return emit("update:modelValue", props.max);
  const value = next ? props.modelValue + 1 : props.modelValue - 1;
  emit('update:modelValue', value)
};
</script>

<template>
  <div
    class="text-[#121737] flex items-center justify-between mt-5 border-b pb-3"
  >
    <h2 class="leading-[130%] font-bold flex items-center gap-1">
      <router-link class="hover:text-[#2e5ce5] text-lg" to="/">
        <icon-home />
      </router-link>
      <span class="text-[14px]">
        {{ series?.title.split("Tv Series")[0].trim() }}
      </span>
    </h2>
    <div class="flex items-center justify-between">
      <span
        @click="changeSeason(false)"
        class="cursor-pointer border text-[1rem] border-[#e7e8eb] bg-[#fff] py-[2px] px-[6px] rounded-[2px] text-gray-500 hover:bg-white hover:text-gray-900"
      >
        <icon-next class="-scale-100" />
      </span>
      <span class="font-bold px-2"
        >Season {{ modelValue.toString().padStart(2, "0") }}</span
      >
      <span
        @click="changeSeason(true)"
        class="cursor-pointer border text-[1rem] border-[#e7e8eb] bg-[#fff] py-[2px] px-[6px] rounded-[2px] text-gray-500 hover:bg-white hover:text-gray-900"
      >
        <icon-next />
      </span>
    </div>
  </div>
</template>
