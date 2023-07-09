<script setup lang="ts">
const library = useLibrary();

onMounted(library.getList);
</script>

<template>
  <div class="flex items-center justify-between pb-6">
    <div class="flex items-center gap-1">
      <img src="../assets/logo.png" alt="logo" class="w-[1.5rem] h-[1.5rem]" />
      <h1 class="font-extrabold text-[1.5rem] text-center">BINGE FLIX</h1>
    </div>
    <a
      href="http://www.todaytvseries6.com/"
      target="_blank"
      class="text-[1.5rem] hover:text-[#2e5ce5]"
    >
      <icon-home />
    </a>
  </div>
  <ul class="flex flex-col gap-6">
    <series-item
      @click.self="$router.push(`/series/${series.title}`)"
      @delete="library.deleteSeries"
      class="bg-white p-4 flex flex-col gap-4 rounded-[4px] border border-transparent hover:border-[#2e5ce5] transition duration-[.4s] shadow-[0_6px_24px_rgba(160,162,175,.1)] hover:shadow-[0_6px_24px_rgba(46,92,229,.1)] relative"
      v-for="series in library.list.value"
      :key="series.title"
      :series="series"
    />
  </ul>
</template>
