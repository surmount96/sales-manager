<template>
  <div>
    <div class="flex flex-wrap items-center">
      <button @click="toggleUserModal(true)" v-show="userPermissionChecker || role === 'SUPER_ADMIN'" class="py-2 px-3 text-medium focus:outline-none border border-gray bg-white rounded-md flex items-center">
        <i class="ri-dashboard-line mr-2 ri-fw"></i>
        Profile a User
      </button>
      <button @click="open('Region')" v-show="regionPermissionChecker || role === 'SUPER_ADMIN'" class="py-2 px-3 text-medium focus:outline-none border border-gray bg-white rounded-md mx-2 flex items-center">
        <i class="ri-dashboard-line mr-2 ri-fw"></i>
        Create Region
      </button>
      <button @click="open('Territory')" v-show="territoryPermissionChecker || role === 'SUPER_ADMIN'" class="py-2 px-3 text-medium focus:outline-none border border-gray bg-white rounded-md mx-2 flex items-center">
        <i class="ri-dashboard-line mr-2 ri-fw"></i>
        Create Territories
      </button>
    </div>
    <div class="flex flex-wrap my-4">
      <div class="lg:w-1/3 md:w-1/3 sm:w-1/2 w-full mb-4" v-show="dashboardPermission || role === 'SUPER_ADMIN'">
        <div class="bg-white mx-2 shadow-sm rounded-md p-3">
          <div class="flex justify-between">
            <div class="">
              <img src="/icons/users.svg" alt="">
            </div>
          </div>
          <p class="text-small text-gray my-3">All Users</p>
          <h4 class="text-h4 text-blue-light">{{ summary.user }}</h4>
          <hr class="border-4 my-2 border-blue-deep rounded-md">
        </div>
      </div>
      <div class="lg:w-1/3 md:w-1/3 sm:w-1/2 w-full mb-4" v-show="dashboardPermission || role === 'SUPER_ADMIN'">
        <div class="bg-white mx-2 shadow-sm rounded-md p-3">
          <div class="flex justify-between">
            <div class="">
              <img src="/icons/brazil.svg" alt="">
            </div>
            <select @change="territorySummary" class="focus:outline-none border border-gray text-small h-8 w-32 rounded-md py-2">
              <option :value="region.id" v-for="region in regions" :key="region.id">{{ region.name }}</option>
            </select>
          </div>
          <p class="text-small text-gray my-3">Territories</p>
          <h4 class="text-h4 text-blue-light">{{ summary.territory}}</h4>
          <hr class="border-4 my-2 border-blue-deep rounded-md">
        </div>
      </div>
      <div class="lg:w-1/3 md:w-1/3 sm:w-1/2 w-full mb-4" v-show="dashboardPermission || role === 'SUPER_ADMIN'">
        <div class="bg-white ml-4 shadow-sm rounded-md p-3">
          <div class="flex justify-between">
            <div class="">
              <img src="/icons/img.png" alt="" class="w-10">
            </div>
          </div>
          <p class="text-small text-gray my-3">Total Regions</p>
          <h4 class="text-h4 text-blue-light">{{ summary.region }}</h4>
          <hr class="border-4 my-2 border-blue-deep rounded-md">
        </div>
      </div>
      <div class="lg:w-1/3 md:w-1/3 sm:w-1/2 w-full mb-4" v-show="dashboardPermission || role === 'SUPER_ADMIN'">
        <div class="bg-white mr-4 shadow-sm rounded-md p-3">
          <div class="flex justify-between">
            <div class="">
              <img src="/icons/help-desk.png" alt="" class="w-10">
            </div>
          </div>
          <p class="text-small text-gray my-3">Total Agents</p>
          <h4 class="text-h4 text-blue-light">{{ summary.agent }}</h4>
          <hr class="border-4 my-2 border-blue-deep rounded-md">
        </div>
      </div>

      <div class="lg:w-1/3 md:w-1/3 sm:w-1/2 w-full mb-4" v-show="role !== 'SUPER_ADMIN'">
        <div class="bg-white shadow-sm rounded-md p-3">
          <div class="flex justify-between">
            <div class="">
              <img src="/icons/target.svg" alt="">
            </div>
            <div class="">
              <p class="text-medium">
                {{ $filters.convertFullMonth(month) }} {{ year }}
              </p>
            </div>
          </div>
          <p class="text-small text-gray my-3">Target</p>
          <p class="text-large text-blue-light">
            {{ target.value ? numeralFormat(target.value) : 0 }}({{ target.percentage ? target.percentage : 0  }}%)
          </p>
          <hr class="border-4 my-2 border-blue-deep rounded-md">
        </div>
      </div>

      <div class="lg:w-1/3 md:w-1/3 sm:w-1/2 w-full mb-4" v-show="role !== 'SUPER_ADMIN'">
        <div class="bg-white shadow-sm rounded-md p-3 ml-3">
          <div class="flex justify-between">
            <div class="">
              <img src="/icons/trophy.png" alt="" class="w-10">
            </div>
            <div class="">
              <p class="text-medium">
<!--                <span class="font-semibold">{{ $filters.convertMonth(target.budgetPeriod.month) }}</span>-->
              </p>
            </div>
          </div>
          <p class="text-small text-gray my-3">Achievement</p>
          <p class="text-large text-blue-light">
            {{ target.achievement ? numeralFormat(target.achievement.value) : 0 }}({{ target.achievement ? target.achievement.percentage : 0  }}%)
          </p>
          <hr class="border-4 my-2 border-blue-deep rounded-md">
        </div>
      </div>
    </div>
    <div class="bg-white p-4" v-show="role !== 'SUPER_ADMIN'">
      <h3 class="mb-2">My Targets</h3>
      <table class="w-full">
        <tr class="bg-gray-400 font-semibold">
          <td class="py-4 text-medium px-3 ">Period</td>
          <td class="py-4 text-medium px-3">Type</td>
          <td class="py-4 text-medium px-3">Target value </td>
          <td class="py-4 text-medium px-3">Achievement</td>
        </tr>
        <tr class="border-b border-gray text-gray-base" v-for="target in targets" :key="target.id">
          <td class="py-4 text-medium px-3 ">{{ target.budgetPeriod.year +'-'+$filters.convertMonth(target.budgetPeriod.month) }}</td>
          <td class="py-4 text-medium px-3">{{ target.budgetPeriod.type }}</td>
          <td class="py-4 text-medium px-3">{{  numeralFormat(target.value)+' ('+target.percentage+'%)' }}</td>
          <td class="py-4 text-medium px-3">{{  numeralFormat(target.achievement.value)+' ('+target.achievement.percentage+'%)' }}</td>
        </tr>
      </table>
    </div>

    <user-modal />
    <general-modal :option="option" :formInput="form" :states="states" :regions="regions" :regionUsers="unmappedRegionUser" :rsmUsers="unmappedRegionUser"/>
  </div>
</template>

<script>
import GeneralModal from '@/components/ui/modal/GeneralModal.vue';
import OnboardModal from '@/components/ui/modal/OnboardModal.vue';
import Table from '@/components/ui/table/TransactionalTable.vue';
import UserModal from '@/components/ui/modal/UserModal';
import { createNamespacedHelpers } from 'vuex';
import months from "@/months";
import permissions from "@/permissions";
import reusableState from "@/mixins/reusableState"

const { mapMutations,mapActions,mapGetters } = createNamespacedHelpers('auth');

const PR = permissions;

export default {
  name: 'admin-dashboard',
  data(){
    return {
      test:new Date(),
      showModal:false,
      option:{
      },
      month:'',
      year:'',
      months:'',
      states:{},
      regions:{},
      territories:{},
      errors:[],
      user:{
        name:'',
        email:'',
        role:'',
        region:'',
        territory:''
      },
      form:{},
      territoryCount:{},
      summary:{},
      targets:{},
      target:{},
    };
  },
  mixins:[
    reusableState
  ],
  computed:{
    ...mapGetters(['role']),
    userPermissionChecker(){
      return PR.userCreatePermission(this.$store.state.auth.user.role.permissions)
    },
    dashboardPermission(){
      return PR.countPermission(this.$store.state.auth.user.role.permissions)
    },
    regionPermissionChecker(){
      return PR.regionCreatePermission(this.$store.state.auth.user.role.permissions);
    },
    territoryPermissionChecker(){
      return PR.territoryCreatePermission(this.$store.state.auth.user.role.permissions);
    },
    agentPermissionIndex(){
      return PR.agentIndexPermission(this.$store.state.auth.user.role.permissions);
    },
    regionPermissionIndex(){
      return PR.regionIndexPermission(this.$store.state.auth.user.role.permissions);
    },
    regionUnmappeduser(){
      return PR.regionUserMapPermission(this.$store.state.auth.user.role.permissions);
    },
    territoryPermissionIndex(){
      return PR.territoryIndexPermission(this.$store.state.auth.user.role.permissions);
    },
    userPermissionIndex(){
      return PR.userIndexPermission(this.$store.state.auth.user.role.permissions);
    },
  },
  methods:{
    ...mapMutations(["updateLoader","updateResponseStatus","showModalDetails","onboardModal","toggleUserModal"]),
    ...mapActions(['currentTarget','unMappedRegionUser','fetchAllUsers','myTarget','countAgent','countingTerritory','userInRegion','fetchRegion','state','logout','createSingleUser','territory']),
    updateStatus(){
      this.updateResponseStatus(true);
    },
    closeModal(){
      this.updateResponseStatus(false);
    },
    open(data){
      this.showModalDetails(true)
      this.option.title = data;
      if(data === 'Territory'){
        this.form = {
          name:'',
        }
      } else {

        this.form = {
          name:'',
          stateCodes:[],
        }
      }
    },
    async getTerritory(data) {
      try {
        // console.log(this.user.region)
        const res = await this.territory(this.user.region);
        this.territories = res.data
        // console.log(res);
      } catch (err) {
        this.errorCatchy(err)
      }
    },
    async fetchTarget() {
      try {
       if(this.role !== 'SUPER_ADMIN'){
         this.updateLoader(true)
         const res = await this.myTarget();
         this.targets = res.data
       }
      } catch (err) {
        if(err.response.status === 401) {
          // console.log(err.response.status)
          this.$toast.error(`Your session has expired please sign in again.`);
          this.logout();
          return
        }
        this.errorCatchy(err)
        this.updateLoader(false)
      }
    },
    async fetchMyCurrentTarget() {
     try{
       if(this.role !== 'SUPER_ADMIN'){
         this.updateLoader(true)
         const res = await this.currentTarget();
         this.target = res.data
         this.updateLoader(false)
       }

     } catch (err) {
       this.errorCatchy(err)
       this.updateLoader(false)
     }
    },
    async territorySummary(e) {
      this.updateLoader(true)
      try {
        const res = await this.countingTerritory({id:e.target.value});
        // console.log(res)
        this.summary.territory = res.data.territoryCount
        this.updateLoader(false)
      }catch(err) {
        if(err.response.status !== 403){
          this.$toast.error(err.response.data.error.message);
        }
        this.updateLoader(false)
      }
    },
    async agentsCount() {
      try {
        if(this.dashboardPermission || this.role === 'SUPER_ADMIN'){
          const res = await this.countAgent();
          this.summary =res.data.count
        }

      }catch(err) {
        if(err.response.status === 401) {
          // console.log(err.response.status)
          this.$toast.error(`Your session has expired please sign in again.`);
          this.logout();
          return
        }
        this.errorCatchy(err)
        this.updateLoader(false)
      }
    },
    async getRegions(page =1) {
      try {
        if(this.regionPermissionIndex || this.role === 'SUPER_ADMIN'){
          const res = await this.fetchRegion({size:1000,page});
          this.regions = res.data;
        }
        // console.log(localStorage.getItem(''))
      } catch(err) {
        this.errorCatchy(err)
        this.updateLoader(false)
      }
    }

  },
  async mounted() {
    this.allState()
    this.months = months;
    this.agentsCount()
    this.fetchTarget()
    if(this.role === 'SUPER_ADMIN' || this.regionPermissionIndex){
      this.assignRegionUser()
    }
    if(this.role === 'SUPER_ADMIN' || this.regionUnmappeduser){
      this.fetchUnmappedUser()
    }
    this.fetchMyCurrentTarget()
    // setTimeout(() => {
      this.getRegions()
    // },1000)
    let date = new Date();
    this.month = date.getMonth();
    this.year = date.getFullYear();
  },
  components:{
    GeneralModal,
    OnboardModal,
    SleTable: Table,
    UserModal,
  },
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
