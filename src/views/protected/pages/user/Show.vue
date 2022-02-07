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
      </div>
      <div class="flex justify-between items-center px-10 py-3">
        <h4 class="text-large">
          {{ user.firstName != null ? user.firstName :'-' }} {{ user.lastName != null ? user.lastName :'' }}
        </h4>
        <div class="flex flex-wrap">
          <button @click="roleModal = true" v-show="updatePermission || role === 'SUPER_ADMIN'" class="flex items-center py-2 px-3 text-medium border border-gray rounded mr-3 focus:outline-none">
            <img src="/icons/download.svg" alt="">
            <span class="ml-2">Update role</span>
          </button>
          <button @click="confirmDelist(user.id)" v-show="!user.deletedAt && (delistPermission || role === 'SUPER_ADMIN')" class="py-2 px-3 text-medium focus:outline-none border border-red-default text-red-default bg-white rounded-md mx-2 flex items-center">
            <i class="ri-delete-bin-2-line mr-2 ri-fw"></i>
            Delist
          </button>
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
                <p v-if="user.region !== null">
                  {{ user.region.regionManager !== null ? user.region.regionManager.firstName !== null || user.region.regionManager.lastName !== null ? user.region.regionManager.firstName + ' ' + user.region.regionManager.lastName: ''  :'-' }}
                </p>
              </div>
            </div>
            <div class="w-1/2">
              <div class="mt-5">
                <p class="font-semibold">
                  Territory
                </p>
                <p>
                  {{ user.territory != null ? user.territory.name :'-' }}
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
            <div class="w-1/2">
              <div class="mt-5">
                <p class="font-semibold">
                  Created Date
                </p>
                <p>
                  {{ $filters.convertDate(user.createdAt) }}
                </p>
              </div>
            </div>
            <div class="w-1/2" v-show="user.deletedAt">
              <div class="mt-5">
                <p class="font-semibold">
                  Delisted Date
                </p>
                <p>
                  {{ $filters.convertDate(user.deletedAt) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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
            <option v-for="role in userRoles" :key="role.id" :value="role.id">{{ role.description }}</option>
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
import permissions from "../../../../permissions";
import reusableState from "@/mixins/reusableState";

const { mapMutations,mapActions,mapGetters } = createNamespacedHelpers('auth');
const PR = permissions;
export default {
  data(){
    return {
      targets:{},
      showFilter:false,
      target:false,
      users:{},
      user:{
        region: null
      },
      volume:'',
      period:'',
      periodView:'',
      value:'',
      roleId:'',
      roles:[],
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
  computed:{
    ...mapGetters(['role']),
    delistPermission(){
      return PR.userDelistPermission(this.$store.state.auth.user.role.permissions)
    },
    updatePermission(){
      return PR.userUpdatePermission(this.$store.state.auth.user.role.permissions)
    },
    userRoles(){
      return this.roles.filter((item) => {
        if(this.user.type === 'CDL'){
          return item.name !== 'SALES_REP';
        } else {
          return item.name === 'SALES_REP';
        }
      });
    }
  },
  mixins:[
    reusableState
  ],
  methods:{
    ...mapActions(['logout','fetchRegion','fetchUserTarget','assignTarget','targetByPeriod','fetchSingleUser','updateRole','delist','deleteTarget','fetchRole']),
    ...mapMutations(['updateLoader','toggleUserModal']),
    goBack(){
      this.$router.go(-1);
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
    async singleUser(id){
      this.updateLoader(true);
      try {
        const res = await this.fetchSingleUser({id})
        this.roleId = res.data.role.id;
        this.updateLoader(false);
        this.user = res.data
      }catch(err) {
        this.errorCatchy(err)
      }
    },
    async getRole(){
      try{
        const res = await this.fetchRole();
        this.roles = res.data
      } catch(err) {
        this.errorCatchy(err)
      }
    },
    showProfile(){
      this.targetState = false;
      this.profileState = true;
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
      }catch (err) {
        this.errorCatchy(err)
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
        this.errorCatchy(err)
      }
    },
    openModal(){
      this.target = true;
    },
  },
  async mounted(){
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
