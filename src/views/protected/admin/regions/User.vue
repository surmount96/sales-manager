<template>
  <div>
    <div class="my-3">
      <button @click="goBack" class="flex items-center py-2 justify-center w-24 text-medium border border-gray bg-white  rounded-md focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        <span class="mx-2">Back</span>
      </button>
    </div>
    <div class="bg-white p-4">
      <div class="flex justify-between items-center py-3 mb-4">
        <h4 class="text-large">
          {{ region.name }} Region
        </h4>
      </div>
      <div class="text-body-2 flex flex-wrap mb-6">
        <div class="w-1/2">
          <div class="">
            <p class="font-semibold mb-3">
              RSM
            </p>
            <p class="text-medium">
              {{ region.regionManager ? region.regionManager.email : ' - '}}
              <span v-if="region.regionManager">
                    {{ region.regionManager.firstName !== null ? '('+region.regionManager.firstName+' '+ region.regionManager.lastName+')' : ' ' }}
                  </span>
            </p>
          </div>
        </div>
        <div class="w-1/2">
          <div class="">
            <p class="font-semibold mb-3">
              States
            </p>
            <p class="text-medium">
               <span v-for="(state,index) in region.states" :key="state.id">
                  {{ state.name }}{{ region.states.length != (index+1) ? ', ': '' }}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="">
        <h5 class="text-large font-semibold mb-3"> Area sales officers</h5>
        <table class="table-auto w-full shadow-sm">
          <tr class="bg-gray-400 font-semibold">
            <td class="py-4 text-medium px-3 ">
               Name
            </td>
            <td class="py-4 text-medium px-3 ">
              Email
            </td>
            <td class="py-4 text-medium px-3 ">
              Phone numbers
            </td>
            <td class="py-4 text-medium px-3 ">
              Type
            </td>
            <td class="py-4 text-medium px-3 ">
              Role
            </td>
<!--            <td class="py-4 text-medium px-3 ">-->
<!--              Action-->
<!--            </td>-->
          </tr>
          <tr class="border-b border-gray text-gray-base" v-for="user in users" :key="user.id">
            <td class="py-4 text-medium px-3">{{ user.firstName }} {{ user.lastName }}</td>
            <td class="py-4 text-medium px-3"> {{ user.email }}</td>
            <td class="py-4 text-medium px-3" v-if="user.phoneNumbers.length > 0">
              <span v-for="phone in user.phoneNumbers" :key="phone.id">{{ phone }}</span>
            </td>
            <td class="py-4 text-medium px-3"> {{ user.type }}</td>
            <td class="py-4 text-medium px-3"> {{ user.role.description }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapMutations,mapActions } = createNamespacedHelpers('auth');

export default {
  name: "User",
  data(){
    return{
      users:{},
      region:{},
      assignASSModal:false
    }
  },
  methods:{
    ...mapActions(['userInRegion']),
    ...mapMutations(['updateLoader', 'toggleUserModal','logout','showModalDetails']),
    goBack(){
      this.$router.go(-1);
    },
    async fetchUser(){
      try{
        const res = await this.userInRegion({id:this.$route.params.id})
        this.users = res.data
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted(){
    this.fetchUser();
    this.region = this.$store.state.auth.regions
  }
}
</script>

<style scoped>

</style>
