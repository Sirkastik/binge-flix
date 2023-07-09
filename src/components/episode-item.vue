<script setup lang="ts">
const props = defineProps<{
  episode: Episode;
  modelValue: string;
}>();
const emit = defineEmits<{
  (event: "update:modelValue", data: string): void;
}>();

const copied = computed(() => {
  return Boolean(props.modelValue && props.modelValue === props.episode.url);
});
</script>

<template>
  <li>
    <div class="font-semibold px-2 leading-[130%]">
      {{ episode.title }}
    </div>
    <div class="py-2 text-gray-500">{{ episode.size }}</div>
    <div class="flex gap-3 justify-center items-center">
      <span
        class="cursor-pointer relative"
        :class="{
          'text-[#2e5ce5]': copied,
        }"
        @click="emit('update:modelValue', episode.url)"
      >
        <span
          class="pointer-events-none absolute z-10 -left-3 -right-10 top-0 -translate-y-[14px] bg-[#2e5ce5] opacity-0 rounded-[3px] px-1 py-[3px] font-medium text-white text-[0.55rem] text-center transition-all"
          :class="{
            'opacity-100 translate-y-0': copied,
          }"
        >
          Link Copied
        </span>
        <icon-link />
      </span>
      <a
        @click.stop=""
        :href="episode.url"
        download
        class="transition-all hover:scale-150 hover:text-[#2e5ce5]"
      >
        <icon-download />
      </a>
    </div>
  </li>
</template>
