<template>
    <div>
         <section class="bg-white border border-gray rounded-md" style="min-height:50vh">
            <div class="h-16 shadow p-3 flex items-center justify-between">
                <div>
                    <h4 class="font-semibold">Target</h4>
                </div>
                <div class=" flex">
                    
                    <div class="relative">
                        <button @click="showFilter = !showFilter" :class="{'text-white bg-yellow-dark' :showFilter}" class="flex items-center py-2 px-3 text-medium border border-gray rounded mx-3 focus:outline-none">    
                            <img src="/icons/black-filter.svg" alt="">
                            <span class="ml-2">Filter by</span>
                            
                        </button>
                        <div v-show="showFilter" class=" absolute top-0 right-0 mt-10 w-24 mr-3 bg-white shadow rounded-md">
                            <p class="border-b border-gray text-medium text-center text-gray-light pt-2 pb-1 cursor-pointer " @click="getUsers('RSM')">RSM</p>
                            <p class="border-b border-gray text-medium text-center text-gray-light py-2 cursor-pointer " @click="getUsers('TSO')">TSO</p>
                            <p class="border-b border-gray text-medium text-center text-gray-light py-2 cursor-pointer " @click="getUsers('ASS')">ASS</p>
                        </div>
                    </div>
                    <button class="flex items-center py-2 px-3 text-medium border border-gray rounded mx-3">
                        <img src="/icons/download.svg" alt="">
                        <span class="ml-2">Upload user</span>
                    </button>
                    <button class="flex items-center py-2 px-3 text-medium border border-gray rounded mx-3">
                        <img src="/icons/download.svg" alt="">
                        <span class="ml-2">Download</span>
                    </button>
                </div>
            </div>
                <table class="w-full">
                    <tr class="bg-gray-400 font-semibold">
                        <td class="py-4 text-medium px-3 ">User</td>
                        <td class="py-4 text-medium px-3 ">Email</td>
                        <td class="py-4 text-medium px-3 ">Role</td>
                        <td class="py-4 text-medium px-3">Transaction Volume</td> 
                        <td class="py-4 text-medium px-3">Transaction Value</td>
                    </tr>
                    <tr class="border-b border-gray text-gray-base"  v-for="user in users" :key="user.id">
                        <td class="py-4 text-medium px-3">{{ user.firstName ? user.firstName :'-' }} {{ user.lastName ? user.lastName :'' }}</td>
                        <td class="py-4 text-medium px-3">
                          {{ user.email }}
                        </td>
                        <td class="py-4 text-medium px-3">
                          {{ user.role }}
                        </td>
                        <td class="py-4 text-medium px-3">
                            <input type="text" v-model="volume" @change="assign(user)" class="py-2 rounded-md bg-gray-600 text-medium px-4 focus:outline-none placeholder:text-red-dark" placeholder="Enter Volume">
                        </td>
                        <td class="py-4 text-medium px-3">
                            <input type="text" v-model="value" @change="assign(user)" class="py-2 rounded-md bg-gray-600 text-medium text-gray-base px-4 focus:outline-none"  placeholder="Enter Value">
                        </td>
                        <td class="py-4 text-medium px-3">
                          <button @click.prevent="assign"  class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none ml-4">
                            View transaction
                          </button>
                        </td>
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
         </section>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapMutations,mapActions } = createNamespacedHelpers('auth');
export default {
    data(){
        return {
            regions:{},
            showFilter:false,
            users:{},
            volume:'',
            value:''
        };
    },

    methods:{
        ...mapActions(['fetchAllUsers','logout','assignTarget']),
        ...mapMutations(['updateLoader','toggleUserModal']),
        async getUsers(data = '',page = 1){
          this.updateLoader(true);
          try {
            const res = await this.fetchAllUsers({roles:data,size:10,page});
            this.users = res.data
            this.showFilter = false;
            this.updateLoader(false);
          } catch (err) {
            if(err.response.status === 401) {
              console.log(err.response.status)
              this.$toast.error(`Your session has expired please sign in again.`);
              this.logout();
            }
          }
          // console.log(res)
        },
        async assign(data){
          try {
              if(this.value && this.volume){
                const params = {
                  id:data.id
                };
                console.log(data)
                const res = await this.assignTarget(params);
                console.log(res)
              }

          }catch (err) {

          }
        }
    },
    async mounted(){
       this.getUsers()
    }
}
</script>