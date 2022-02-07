<template>
  <div class="">
    <div class="flex justify-between items-center py-4 px-3">
      <div class="text-medium text-black font-semibold">
        <p>Total: {{ meta.total }} - From {{ meta.from }} to {{ meta.to }}</p>
      </div>
      <div class="text-medium">
        <button :disabled="meta.currentPage == 1" @click="decreasePage(meta.currentPage-1)" class="focus:outline-none border border-gray px-10 text-gray-base py-2 rounded-tl-full rounded-bl-full">Previous</button>
        <button :disabled="meta.currentPage == meta.lastPage" @click="increasePage(meta.currentPage+1)" class="focus:outline-none border border-gray px-10 text-gray-base py-2 rounded-tr-full rounded-br-full">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:{
    meta: { type: Object}
  },
  data(){
    return {
      num:1
    };
  },
  methods:{
    increasePage(page){
      this.$emit('pagePagination',page)
    },
    decreasePage(page){
      this.$emit('pagePagination',page)
    }
  }
}
</script>

<style scoped>

</style>
