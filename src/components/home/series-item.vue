<script setup lang="ts">
defineProps<{
  series: Series;
}>();
const emit = defineEmits<{
  (event: "delete", title: string): void;
}>();
</script>

<template>
  <li
    class="bg-white p-4 flex flex-col gap-4 rounded-[4px] border border-transparent hover:border-[#2e5ce5] transition duration-[.4s] shadow-[0_6px_24px_rgba(160,162,175,.1)] hover:shadow-[0_6px_24px_rgba(46,92,229,.1)] relative"
  >
    <span
      class="text-[1rem] p-2 transition absolute z-10 top-0 right-0 bg-[#e7e8eb] bg-opacity-50 hover:bg-white hover:text-[red] hover:bg-opacity-90 text-[#121737] rounded-[2px] cursor-pointer"
      @click="emit('delete', series.title)"
    >
      <icon-delete />
    </span>

    <img
      @click="$router.push(`/series/${series.title}`)"
      class="rounded-[2px] cursor-pointer"
      :src="series.image"
      :alt="series.title"
    />
    <div class="flex justify-between items-center">
      <span
        class="font-bold text-[1.2rem] text-[#121737] leading-[16px] cursor-pointer"
        @click="$router.push(`/series/${series.title}`)"
      >
        {{ series.title.split("Tv Series")[0].trim() }}
      </span>
      <a
        :href="series.url"
        target="_blank"
        class="flex items-center text-[#a0a2af] text-[10px] border border-[#e7e8eb] bg-[#f6f6f7] uppercase py-[3px] px-[8px] rounded-[2px] hover:text-[#2e5ce5] hover:border-[#2e5ce5]"
      >
        <span>Visit</span><span><icon-external /></span>
      </a>
    </div>
    <div class="flex items-center gap-2 flex-wrap">
      <span
        v-for="genre in series.genres"
        class="py-1 px-2 text-[10px] bg-[#ebf3ff] rounded-[2px] text-center text-[#2e5ce5]"
      >
        {{ genre }}
      </span>
    </div>
  </li>
</template>
