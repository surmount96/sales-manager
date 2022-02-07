<template>
    <div class="flex flex-col items-center justify-center" style="height:100vh">
        <i class="ri-lock-line text-h3"></i>
        <p class="font-bold mt-3 mb-1">
            The page your are trying to access is private.
        </p>
        <p>
            You don't have permission to view this page.
        </p>
        <button @click="goBack" class="text-medium bg-blue-base py-3 px-12 text-white rounded-md mt-5">
            Return
        </button>

    </div>
</template>

<script>
export default {
  methods:{
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>

