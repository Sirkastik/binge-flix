<script setup lang="ts">
const library = useLibrary();

onMounted(library.getList);
</script>

<template>
  <home-header />
  <ul class="flex flex-col gap-6">
    <home-series-item
      @click.self="$router.push(`/series/${series.title}`)"
      @delete="library.deleteSeries"
      class="bg-white p-4 flex flex-col gap-4 rounded-[4px] border border-transparent hover:border-[#2e5ce5] transition duration-[.4s] shadow-[0_6px_24px_rgba(160,162,175,.1)] hover:shadow-[0_6px_24px_rgba(46,92,229,.1)] relative"
      v-for="series in library.list.value"
      :key="series.title"
      :series="series"
    />
  </ul>
</template>
