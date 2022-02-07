<template>
  <div>
    <section class="bg-white border border-gray rounded-md" style="min-height:50vh">
      <div class="h-16 shadow p-3 flex items-center justify-between">
        <div>
          <h4 class="font-semibold">Agents</h4>
        </div>
        <div class="">
          <input type="search" v-model="search" @keyup.enter="getUsers('')" placeholder="saerch using partner ID" class="py-2 px-3 text-medium border border-gray rounded-md focus:outline-none w-64">
        </div>
        <button @click="onboardModal(true)" v-show="agentPermission || role === 'SUPER_ADMIN'" class="py-2 px-3 text-medium focus:outline-none border border-gray bg-white rounded-md mx-2 flex items-center">
          <i class="ri-user-line mr-2 ri-fw"></i>
          Onboard Agent
        </button>

      </div>
      <table class="table-auto w-full">
        <tr class="bg-gray-400 font-semibold">
          <!--          <td class="py-4 text-medium px-3 "></td>-->
          <td class="py-4 text-medium px-3">Name</td>
          <td class="py-4 text-medium px-3">Username</td>
          <td class="py-4 text-medium px-3">Partner ID</td>
          <td class="py-4 text-medium px-3">Phone numbers</td>
<!--          <td class="py-4 text-medium px-3">Address</td>-->
          <td class="py-4 text-medium px-3">Territory</td>
          <td class="py-4 text-medium px-3">Territory Officer</td>
          <td class="py-4 text-medium px-3" v-show="agentUpdatePermission || role === 'SUPER_ADMIN'">Action</td>
        </tr>
        <tr class="border-b border-gray text-gray-base" v-for="user in users" :key="user.id">
          <td class="py-4 text-medium px-3">{{ user.firstName }} {{ user.lastName }}</td>
          <td class="py-4 text-medium px-3">{{ user.username }}</td>
          <td class="py-4 text-medium px-3">{{ user.partnerId }}</td>
          <td class="py-4 text-medium px-3"><span v-for="phone in user.phoneNumbers" :key="phone.id">{{ phone }}</span></td>
<!--          <td class="py-4 text-medium px-3">{{ user.address }}</td>-->
          <td class="py-4 text-medium px-3">{{ user.territory ? user.territory.name : '-' }}</td>
          <td class="py-4 text-medium px-3">
            {{ user.territory.territoryOfficer ? user.territory.territoryOfficer.firstName + ' ' + user.territory.territoryOfficer.lastName : '-'}}
          </td>
          <td class="py-4 text-medium px-3">
            <svg v-show="agentUpdatePermission || role === 'SUPER_ADMIN'" @click="edit(user)" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-dark cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
            </svg>
          </td>
        </tr>
      </table>
      <pagination @pagePagination="getUsers" :meta="meta"/>
    </section>

    <onboard-modal @callback="getUsers"/>

    <vue-final-modal
        v-model="editAgent"
        classes="modal-container"
        content-class="modal-content">
      <div class="">
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">Agent</label>
          <input :value="agent.name" readonly  class="py-3 px-2 text-medium bg-whiter text-gray-base rounded-md focus:outline-none border border-gray w-full">
        </div>
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">Select a region</label>
          <select v-model="agent.regionId" @change="territory" placeholder="Enter your fullname" class="py-3 px-2 text-medium text-gray-base rounded-md focus:outline-none border border-gray w-full">
            <option>select user to map</option>
            <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.name }}</option>
          </select>
          <small class="text-red-dark">{{ errors['user'] }}</small>
        </div>

        <p class="text-medium text-center text-success font-semibold">{{ fetch }}</p>
        <div class="my-3" v-show="territories.length > 0">
          <label class="text-medium font-normal text-gray-base mb-1">Select a Territory</label>
          <select v-model="agent.territoryId" placeholder="Enter your fullname" class="py-3 px-2 text-medium text-gray-base rounded-md focus:outline-none border border-gray w-full">
            <option>select user to map</option>
            <option v-for="region in territories" :key="region.id" :value="region.id">{{ region.name }}</option>
          </select>
          <small class="text-red-dark">{{ errors['user'] }}</small>
        </div>
        <button @click="editAgent= false" class="border border-blue-base py-2 px-8 text-medium rounded-md focus:outline-none mx-2">
          Cancel
        </button>
        <button @click.prevent="handleAgentUpdate" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none ml-4">
            <span >
               {{ message }}
            </span>

        </button>
      </div>

    </vue-final-modal>
  </div>
</template>

<script>
import OnboardModal from '@/components/ui/modal/OnboardModal.vue';
import { createNamespacedHelpers } from 'vuex';
import permissions from "../../../permissions";
import Pagination from "@/components/Pagination";
import catcher from "@/mixins/catcher";

const { mapMutations,mapActions,mapGetters } = createNamespacedHelpers('auth');
const PR = permissions;

export default {
  data(){
    return {
      test:new Date(),
      showFilter:false,
      editAgent:false,
      users:{},
      regions:{},
      search:'',
      territories:[],
      message:'Update Agent',
      fetch:'',
      agent:{
        id:'',
        regionId:'',
        name:'',
        territoryId:''
      },
      errors:[],
      meta:{},
      showModal:false
    };
  },
  mounted(){
    this.getUsers()
    if(this.role === 'SUPER_ADMIN' || this.regionPermissionIndex){
      this.getRegion()
    }
  },
  mixins:[
      catcher
  ],
  computed:{
    ...mapGetters(['role']),
    agentPermission(){
      return PR.agentUploadPermission(this.$store.state.auth.user.role.permissions);
    },
    agentUpdatePermission(){
      return PR.agentUpdatePermission(this.$store.state.auth.user.role.permissions);
    },
    regionPermissionIndex(){
      return PR.regionIndexPermission(this.$store.state.auth.user.role.permissions);
    },
  },
  components:{
    OnboardModal,
    Pagination
  },
  methods:{
    ...mapMutations(['updateLoader','toggleUserModal',"onboardModal"]),
    ...mapActions(['fetchAgents','logout','updateAgent','fetchTerritory','fetchRegion']),
    async showOnboardModal(){
      this.onboardModal(true)
    },
    edit(user){
      this.editAgent = true;
      if(user){
        this.agent.id = user.id
        if(user.territory) {
          this.agent.territoryId = user.territory.id
          this.territories.push(user.territory)
        }
        this.agent.name = user.firstName + ' ' + user.lastName
      }
    },
    async handleAgentUpdate(){
      this.message = "Updating agent....";
      this.agent.regionId = '';
      try{
        const res = await this.updateAgent(this.agent);
        this.editAgent = false;
        this.$toast.success('Operation Successful!');
        this.message = "Agent territory updated";
        this.agent = {};
        this.getUsers();
      } catch(err) {
        this.errorCatchy(err)
        this.message = 'Update Agent';
      }
    },
    async getUsers(page = 1,data = '',){
      this.updateLoader(true);
      try {
        const res = await this.fetchAgents({roles:data,size:30,page,partnerId:this.search,territoryId:''});
        this.users = res.data
        this.meta = res.meta
        // console.log(res)
        this.showFilter = false;
        this.updateLoader(false);
      } catch (err) {
        if(err.response.status === 401) {
          // console.log(err.response.status)
          this.$toast.error(`Your session has expired please sign in again.`);
          this.logout();
          return
        }
        this.errorCatchy(err)
        this.updateLoader(false);
      }
    },
    async getRegion(page = 1){
      this.updateLoader(true);
      try {
        const res = await this.fetchRegion({page, size:1000});
        this.regions = res.data
        this.meta = res.meta
        this.updateLoader(false);
      } catch (err) {
        this.errorCatchy(err)
        this.updateLoader(false);
      }
    },
    async territory(){
      this.fetch = "Please wait, fetching list of Territories";
      try {
        const res = await this.fetchTerritory({id: this.agent.regionId});
        this.fetch = "Territory Successfully fetched";
        // console.log(res)
        this.territories = res.data
        this.updateLoader(false);
        this.fetch = "";
        // this.editAgent = true
      } catch (err) {
        this.errorCatchy(err)
        this.fetch = "Something went wrong, couldn\'t fetch Territories"
      }
    },

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

.bg-whiter{
  background-color: #ccc;
}
</style>
