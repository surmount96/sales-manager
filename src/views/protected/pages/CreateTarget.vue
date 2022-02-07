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
          <td class="py-4 text-medium px-3">Action</td>
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
            <button @click="openModal(user.id)" class="bg-dark-100 py-2 px-4 text-small text-white rounded-sm">
              Assign target
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

    <vue-final-modal
        v-model="target"
        classes="modal-container"
        content-class="modal-content"
        >
      <div class="pb-3 border-b border-gray">
        <h5 >Assign target</h5>
      </div>
      <form action=""
      >
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">Period</label>
          <datepicker v-model="period" class="focus:outline-none border border-gray py-2 px-3 text-medium rounded-md w-full"></datepicker>
        </div>
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">Transaction Volume</label>
          <input v-model="volume" type="text" placeholder="Enter your volume" class="py-2 px-5  text-medium text-gray-base  rounded-md focus:outline-none border border-gray w-full">
<!--          <small class="text-red-dark text-small">{{ errors['email']}}</small>-->
        </div>
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">Transaction Value</label>
          <input v-model="value" type="text" placeholder="Enter your value" class="py-2 px-5  text-medium text-gray-base  rounded-md focus:outline-none border border-gray w-full">
          <!--          <small class="text-red-dark">{{ errors['role']}}</small>-->
        </div>

        <hr class="border-t border-gray my-6">
        <div class="flex items-center justify-end">
          <button  class="border border-blue-base py-2 px-8 text-medium rounded-md focus:outline-none mx-2">
            Cancel
          </button>
          <button @click.prevent="assign"  class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none ml-4">
            {{ message }}
          </button>
        </div>
      </form>
    </vue-final-modal>
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
      target:false,
      users:{},
      user:{},
      volume:'',
      period:'',
      value:'',
      message:'Assign'
    };
  },

  methods:{
    ...mapActions(['fetchAllUsers','logout','assignTarget']),
    ...mapMutations(['updateLoader','toggleUserModal']),
    async getUsers(data = '',page = 1){
      this.updateLoader(true);
      try {
        const res = await this.fetchAllUsers({roles:data,size:5,page});
        this.users = res.data
        this.showFilter = false;
        this.updateLoader(false);
      } catch (err) {
        if(err.response.status === 401) {
          console.log(err.response.status)
          this.updateLoader(false);
          // this.$toast.error(`Your session has expired please sign in again.`);
          // this.logout();
        }
      }
      // console.log(res)
    },
    openModal(user){
      this.target = true;
      this.user = user;
    },
    async assign(){
      // console.log(this.user)
      // console.log(this.volume)
      // console.log(this.value)
      // console.log(this.period)
      const clock = new Date(this.period);
      const month = clock.getMonth() + 1;
      // const year = clock.getFullYear();
      console.log(new Date().format('Y-m'))
      const period = clock.getFullYear() +'-'+ month < 10 ? '0'+month : month
      console.log(period);
      try {
        if(this.value && this.volume){
          const params = {
            id:this.user,
            period:clock,
            targets: [
              {
                type: 'TRANSACTION_VOLUME',
                value: this.volume
              },
              {
                type: 'TRANSACTION_VALUE',
                value: this.value
              }
            ]
          };
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

<style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
  width:430px;
}
</style>