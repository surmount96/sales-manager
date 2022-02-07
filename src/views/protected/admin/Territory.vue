<template>
  <div>
    <div class="h-16 shadow p-3 flex items-center justify-between">
      <div>
        <h4 class="font-semibold">Territory</h4>
      </div>
      <button class="py-2 px-3 text-medium focus:outline-none border border-gray bg-white rounded-md mx-2 flex items-center">
        <i class="ri-dashboard-line mr-2 ri-fw"></i>
        Create Region
      </button>
    </div>
    <table class="w-full">
      <tr class="bg-gray-400 font-semibold">
        <td class="py-4 text-medium px-3 ">Name</td>
        <td class="py-4 text-medium px-3">Email</td>
        <td class="py-4 text-medium px-3">Action</td>

      </tr>
      <tr class="border-b border-gray text-gray-base" v-for="user in users" :key="user.id">

      </tr>
    </table>
    <div class="flex justify-between items-center py-4 px-3">
      <div class="text-medium text-black font-semibold">
        <p>PAGE 1 of 24</p>
      </div>
      <div class="text-medium">
        <button class="focus:outline-none border border-gray px-10 text-gray-base py-2 rounded-tl-full rounded-bl-full opacity-30">Previous</button>
        <button class="focus:outline-none border border-gray px-10 text-gray-base py-2 rounded-tr-full rounded-br-full">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "Territory"
}
</script>

<style scoped>

</style>