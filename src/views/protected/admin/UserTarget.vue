<template>
    <div>
         <section class="bg-white border border-gray rounded-md" style="min-height:50vh">
            <div class="px-3 py-1">

            </div>
            <div class="h-16 shadow p-3 flex items-center justify-between">
              <button @click="goBack" class="flex items-center py-2 justify-center w-24 text-medium border border-gray rounded-md focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
                <span class="mx-2">Back</span>
              </button>
                <div class=" flex flex-wrap items-center">
                    <button v-show="targetState" @click="showProfile"  class="flex items-center py-2 px-3 text-medium border border-gray rounded mx-3 focus:outline-none">
                      <img src="/icons/download.svg" alt="">
                      <span class="ml-2">View profile</span>
                    </button>
                    <div class="flex flex-wrap">
<!--                      <button v-show="profileState" @click="showTarget" class="flex items-center py-2 px-3 text-medium border border-gray rounded mx-3 focus:outline-none">-->
<!--                        <img src="/icons/download.svg" alt="">-->
<!--                        <span class="ml-2">View target</span>-->
<!--                      </button>-->
                      <button v-show="targetState" @click="openModal(user.id)" class="flex items-center py-2 px-3 text-medium border border-gray rounded mx-3 focus:outline-none">
                        <img src="/icons/download.svg" alt="">
                        <span class="ml-2">Create target</span>
                      </button>
                    </div>
                    <div class="flex" v-show="targetState">
                      <div>
                        <label class="text-medium"></label>
                        <datepicker v-model="periodView" class="focus:outline-none border border-gray py-2 px-3 text-medium rounded-md w-full"></datepicker>
                      </div>
                      <button title="Filter by" @click="filterByPeriod" class="flex items-center py-2 px-3 text-medium border border-gray rounded ml-3 focus:outline-none">
                        <img src="/icons/black-filter.svg" alt="">
                      </button>
                    </div>
                    <button v-show="userTargetState" @click="viewTarget" class="flex items-center py-2 px-3 text-medium border border-gray rounded mx-3 focus:outline-none">
                      <span class="ml-2">View target</span>
                    </button>
                </div>
            </div>
             <div class="flex justify-between items-center px-10 py-3">
               <h4 class="text-large">
                 {{ user.firstName ? user.firstName :'-' }} {{ user.lastName ? user.lastName :'' }}
               </h4>
               <div class="flex flex-wrap">
                 <button @click="roleModal = true" class="flex items-center py-2 px-3 text-medium border border-gray rounded mr-3 focus:outline-none">
                   <img src="/icons/download.svg" alt="">
                   <span class="ml-2">Update role</span>
                 </button>
                 <button @click="confirmDelist(user.id)" class="py-2 px-3 text-medium focus:outline-none border border-red-default text-red-default bg-white rounded-md mx-2 flex items-center">
                   <i class="ri-delete-bin-2-line mr-2 ri-fw"></i>
                   Delist
                 </button>
               </div>
             </div>
              <div class="px-10" v-show="targetState">
                <table class="w-full">
                  <tr class="bg-gray-400 font-semibold rounded-sm">
                    <td class="py-4 text-medium px-3 ">Period</td>
                    <td class="py-4 text-medium px-3">Transaction Volume</td>
                    <td class="py-4 text-medium px-3">Transaction Value</td>
                    <td class="py-4 text-medium px-3">Action</td>
                  </tr>
                  <tr class="border-b border-gray text-gray-base" v-for="target in targets" :key="target.id">
                    <td class="py-4 text-medium px-3">{{ target.period }}</td>
                    <td class="py-4 text-medium px-3">
                      <p>
                        <span class="text-green-100">Expected:</span>
                        {{ target.target.volume }}
                      </p>
<!--                      <p>-->
<!--                        <span class="text-red-dark">Actual: </span>-->
<!--                        3000000.0-->
<!--                      </p>-->
                    </td>
                    <td class="py-4 text-medium px-3">
                      <p>
                        <span class="text-green-100">Expected:</span>
                        {{ target.target.value }}
                      </p>
<!--                      <p>-->
<!--                        <span class="text-red-dark">Actual: </span>-->
<!--                        300000.0-->
<!--                      </p>-->
                    </td>
                    <td class="">
                      <button @click="deleteSingleTarget" class="py-2 px-3 text-medium focus:outline-none border border-red-default text-red-default bg-white rounded-md mx-2 flex items-center">
                        <i class="ri-delete-bin-2-line mr-2 ri-fw"></i>
                        Delete
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
              </div>
             <div class="py-3 px-6" v-show="profileState">
               <div class="py-3 px-4">
                 <h6 class=" mt-4 mb-6 font-semibold">Basic Information</h6>
                 <div class="text-body-2 flex flex-wrap mb-6">
                   <div class="w-1/2">
                     <div class="">
                       <p class="font-semibold">
                         Email
                       </p>
                       <p>
                         {{ user.email ? user.email :'-' }}
                       </p>
                     </div>
                   </div>
                   <div class="w-1/2">
                     <div class="">
                       <p class="font-semibold">
                         Role
                       </p>
                       <p>
                         {{ user.role ? user.role.description :'-' }}
                       </p>
                     </div>
                   </div>
                 </div>
                 <div class="text-body-2 flex flex-wrap mb-3">
                   <div class="w-1/2">
                     <div class="">
                       <p class="font-semibold">
                         Status
                       </p>
                       <p :class="{'text-red-default': user.status === 'INACTIVE', 'text-success': user.status === 'ACTIVE'}">
                         {{ user.status }}
                       </p>
                     </div>
                   </div>
                   <div class="w-1/2">
                     <div class="">
                       <p class="font-semibold">
                         Phone number(s)
                       </p>
                       <p>
                         <span v-for="(phone, index) in user.phoneNumbers" :key="phone.id">
                           {{ phone ? phone : '-' }}
                           {{ user.phoneNumbers.length != (index+1) ? ', ': '' }}
                         </span>
                       </p>
                     </div>
                   </div>
                 </div>
                 <div class="text-body-2 flex flex-wrap mb-6">
                   <div class="w-1/2">
                     <div class="">
                       <p class="font-semibold">
                         Region
                       </p>
                       <p>
                         {{ user.region ? user.region.name :'-' }}
                       </p>
                     </div>
                   </div>
                   <div class="w-1/2">
                     <div class="">
                       <p class="font-semibold">
                         Region Manager
                       </p>
                       <p>
                         {{ user.region ? user.region.regionManager.firstName + ' ' + user.region.regionManager.lastName :'-' }}
                       </p>
                     </div>
                   </div>
                   <div class="w-1/2">
                     <div class="mt-5">
                       <p class="font-semibold">
                         Type
                       </p>
                       <p>
                         {{ user.type ? user.type :'-' }}
                       </p>
                     </div>
                   </div>
                 </div>
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

      <vue-final-modal
          v-model="roleModal"
          classes="modal-container"
          content-class="modal-content"
      >
        <div class="pb-3 border-b border-gray">
          <h5 >Update Role</h5>
        </div>
        <form action=""
        >
          <div class="my-3">
            <label class="text-medium font-normal text-gray-base mb-2">Select role</label>
            <select v-model="roleId" class="focus:outline-none py-3 w-full border border-gray rounded-sm">
              <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.description }}</option>
            </select>
          </div>


          <hr class="border-t border-gray my-6">
          <div class="flex items-center justify-end">
            <button @click.prevent="roleModal = false" class="border border-blue-base py-2 px-8 text-medium rounded-md focus:outline-none mx-2">
              Cancel
            </button>
            <button @click.prevent="changeRole"  class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none ml-4">
              {{ roleUpdateMessage }}
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
          targets:{},
          showFilter:false,
          target:false,
          users:{},
          user:{},
          volume:'',
          period:'',
          periodView:'',
          value:'',
          roleId:'',
          roles:{},
          message:'Assign',
          roleUpdateMessage:'Update',
          errors:{},
          roleModal:false,
          targetState:false,
          profileState:true,
          userAchievement:{},
          userTargetState:false
        };
    },

    methods:{
      ...mapActions(['fetchRegion','fetchUserTarget','assignTarget','targetByPeriod','fetchSingleUser','updateRole','delist','deleteTarget','fetchRole']),
      ...mapMutations(['updateLoader','toggleUserModal','logout']),
      goBack(){
        this.$router.go(-1);
      },
      async singleUser(id){
        this.updateLoader(true);
        try {
          const res = await this.fetchSingleUser({id})
          this.roleId = res.data.role.id;
          this.updateLoader(false);
          this.user = res.data
        }catch(err) {
          this.updateLoader(false);
          this.$toast.error(err.response.data.error.message);
        }
      },
      async getRole(){
        try{
          const res = await this.fetchRole();
          this.roles = res.data
        } catch(err) {
          if(err.response.status === 400) {
            this.$toast.error(err.response.data.error.message);
          }
          if(err.response.status === 422) {
            this.errors = err.response.data.error.reasons;
            this.$toast.error(err.response.data.error.message);
          }
          this.message = '';
          // console.log(err.response)
        }
      },
      viewTarget(){
        this.targetState = true;
        this.userTargetState = false;
        this.periodView = '';
      },
      async filterByPeriod(){
       try {
         if(!this.periodView){
           this.$toast.warning('Please select a date');
         } else {
           this.updateLoader(true);
           const clock = new Date(this.periodView);
           const month = clock.getMonth() + 1;
           const year = clock.getFullYear();
           const period = `${clock.getFullYear() }-${month < 10 ? '0'+month : month}`;
           const params = {
             user_id: this.$route.params.id,
             period
           };
           const res = await this.targetByPeriod(params);
           this.userAchievement = res.data;
           this.userTargetState = true;
           this.targetState = false;
           this.updateLoader(false);
         }
       } catch (err) {
         this.$toast.error(err.response.data.error.message);
         this.updateLoader(false);
       }
      },
      showTarget(){
        this.targetState = true;
        this.profileState = false;
      },
      showProfile(){
        this.targetState = false;
        this.profileState = true;
      },
      // async getTarget(){
      //   try {
      //     const res = await this.fetchUserTarget({id:this.$route.params.id});
      //     // this.targets = res;
      //     console.log(res)
      //   }catch(err) {
      //     this.$toast.error(err.response.data.error.message);
      //   }
      // },
      async deleteSingleTarget(){
        try{
          const res = await this.deleteTarget({id:this.$route.params.id});
          this.$toast.success('Target deleted successfully');
          this.getTarget();
        }catch (err) {
          if(err.response.status === 401) {
            // console.log(err.response.status)
            this.$toast.error(`Your session has expired please sign in again.`);
            this.logout();
          }
          this.updateLoader(false);
          this.$toast.error(err.response.data.error.message);
        }
      },
      confirmDelist(id){
        this.$confirm('This will delist the user. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.deleteUser(id)
        }).catch(() => {
          this.$message({
            type: 'danlge',
            message: 'Delist canceled'
          });
        });
      },
      async deleteUser(id){
        try{
          const res = await this.delist({id});
          console.log(res)
          // if(res.status == 200){
          this.$toast.success('Delisting successful');
          window.location.reload();
          // }
          // console.log(res)
        }catch (e) {
          if(err.response.status === 401) {
            console.log(err.response.status)
            this.$toast.error(`Your session has expired please sign in again.`);
            this.logout();
          }
          this.updateLoader(false);
        }
      },
      async changeRole() {
        this.roleUpdateMessage = 'Updating ......'
        try{
          let params = {
            id: this.$route.params.id,
            roleId: this.roleId
          }
          const res = await this.updateRole(params);
          this.roleModal = false;
          this.roleUpdateMessage = "Updated";
          this.$toast.success('Operation Successful');
          this.roleUpdateMessage = "Update";
          this.singleUser(this.$route.params.id);
        } catch(err){
          if(err.response.status === 422) {
            this.$toast.error(err.response.data.error.message);
          }
          this.updateLoader(false)
        }
      },
      openModal(){
        this.target = true;
      },
      async assign(){
        const clock = new Date(this.period);
        const month = clock.getMonth() + 1;
        const year = clock.getFullYear();
        const period = `${clock.getFullYear() }-${month < 10 ? '0'+month : month}`;
        this.message = "Loading....";
        // this.updateLoader(true)
        try {
          if(this.value && this.volume){
            const params = {
              id:this.$route.params.id,
              period,
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
            this.target = false;
            // this.updateLoader(false)
            this.message = "Assign";
            this.$toast.success(`Target successfully assigned.`);
            this.getTarget();
          }

        }catch (err) {
          if(err.response.status === 401) {
            console.log(err.response.status)
            this.$toast.error(`Your session has expired please sign in again.`);
            this.logout();
          }
          if(err.response.status === 422) {
            this.$toast.error(err.response.data.error.message);
            this.errors = err.response.data.error.reasons;
          }
          // this.updateLoader(false)
        }
      }
    },
    async mounted(){
      // this.getTarget();
      this.singleUser(this.$route.params.id);
      this.getRole();
      // console.log(this.$route.params)
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
