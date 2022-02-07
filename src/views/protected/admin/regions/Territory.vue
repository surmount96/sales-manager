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
    <div class="flex justify-end">
      <button @click="assignTerritoryUserModal = true" class="py-2 px-3 text-medium focus:outline-none border border-gray bg-white rounded-md mx-2 flex items-center">
        <i class="ri-dashboard-line mr-2 ri-fw"></i>
        Assign Staff to territory
      </button>

      <button @click="assignAgentModal = true" class="py-2 px-3 text-medium focus:outline-none border border-gray bg-white rounded-md mx-2 flex items-center">
        <i class="ri-dashboard-line mr-2 ri-fw"></i>
        Assign Agent to this territory
      </button>
    </div>
    <div class="bg-white p-4">
      <div class=" py-3 mb-4">
        <h4 class="text-large mb-3">
           <span class="text-medium font-semibold">Territory Sales Officer: {{ name ? name.firstName +' '+ name.lastName : '-' }}</span>
        </h4>
        <h6 class="text-medium mb-3">
          {{ $store.state.auth.territory.name }}
        </h6>
      </div>
      <div class="">
        <h5 class="text-body-2 font-semibold mb-3"> Sales Representatives</h5>
        <table class="table-auto w-full shadow-sm">
          <tr class="bg-gray-400 font-semibold">
            <td class="py-4 text-medium px-3 ">
              First Name
            </td>
            <td class="py-4 text-medium px-3 ">
              Last Name
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
            <td class="py-4 text-medium px-3 ">
              Action
            </td>
          </tr>
          <tr class="border-b border-gray text-gray-base" v-for="user in users" :key="user.id">
            <td class="py-4 text-medium px-3">{{ user.firstName }}</td>
            <td class="py-4 text-medium px-3"> {{ user.lastName }}</td>
            <td class="py-4 text-medium px-3"> {{ user.email }}</td>
            <td class="py-4 text-medium px-3" v-if="user.phoneNumbers.length > 0">
               <span v-for="(phone, index) in user.phoneNumbers" :key="phone.id">
                 {{ phone ? phone : '-' }}{{ user.phoneNumbers.length != (index+1) ? ', ': '' }}
               </span>
            </td>
            <td class="py-4 text-medium px-3" v-else>
              -
            </td>
            <td class="py-4 text-medium px-3"> {{ user.type }}</td>
            <td class="py-4 text-medium px-3"> {{ user.role.description }}</td>
            <td>
              <button title="Assign Agents to staff" @click="assignAgents(user)" class="py-2 px-3 text-medium focus:outline-none  rounded-md mx-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-dark" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <!--    Map User to territory-->
    <vue-final-modal
        v-model="assignTerritoryUserModal"
        classes="modal-container"
        content-class="modal-content">
      <div class="">

        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1 w-full">Staffs</label>
          <el-select
              v-model="userToTerritory.userIds"
              multiple
              filterable
              allow-create
              placeholder="Choose a staff">
            <el-option
                v-for="item in unmappedTerritoryUser"
                :key="item.id"
                :label="item.email"
                :value="item.id">
            </el-option>
          </el-select>
          <small class="text-red-dark">{{ errors['user'] }}</small>
        </div>
      </div>
      <button @click.prevent="assignUserToTerritory" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none">
        <span >
            Assign Staff to territory
        </span>
      </button>
    </vue-final-modal>

    <!--    Map Agent to Staffs-->
    <vue-final-modal
        v-model="assignAgentUserModal"
        classes="modal-container"
        content-class="modal-content">
      <div class="">

        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1 w-full">Choose Agents </label>
          <el-select
              v-model="agentsToStaff.agentIds"
              multiple
              filterable
              allow-create
              placeholder="Choose a agents">
            <el-option
                v-for="item in agentUsers"
                :key="item.id"
                :label="item.email"
                :value="item.id">
            </el-option>
          </el-select>
          <small class="text-red-dark">{{ errors['user'] }}</small>
        </div>
      </div>
      <button @click.prevent="assignAgentToStaff" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none">
        <span >
            Assign Agents to Staff
        </span>
      </button>
    </vue-final-modal>

    <!--    Map Agent to Territory-->
    <vue-final-modal
        v-model="assignAgentModal"
        classes="modal-container"
        content-class="modal-content">
      <div class="">

        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1 w-full">Choose Agents </label>
          <el-select
              v-model="agentsToStaff.agentIds"
              multiple
              filterable
              allow-create
              placeholder="Choose a agents">
            <el-option
                v-for="item in agentUsers"
                :key="item.id"
                :label="item.email"
                :value="item.id">
            </el-option>
          </el-select>
          <small class="text-red-dark">{{ errors['user'] }}</small>
        </div>
      </div>
      <button @click.prevent="assignAgentToTerritory" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none">
        <span >
            Assign Agents to territory
        </span>
      </button>
    </vue-final-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapMutations,mapActions } = createNamespacedHelpers('auth');

export default {
  name: "Territory",
  data(){
    return{
      name: this.$store.state.auth.territory.territoryOfficer,
      users:{},
      agentUsers:{},
      unmappedeAgents:{},
      errors:[],
      assignTerritoryUserModal:false,
      assignAgentUserModal:false,
      assignAgentModal:false,
      unmappedTerritoryUser:{},
      userToTerritory:{
        userIds:''
      },
      agentsToStaff:{
        id:'',
        agentIds:''
      },
    }
  },
  methods:{
    ...mapActions(['mapAgentToTerritory','agentToStaffMapping','fetchAgents','fetchUsersInTerritory','mappingUserToTerritory','unMappedAgentsToTerritory']),
    ...mapMutations(['updateLoader', 'toggleUserModal','logout','showModalDetails']),
    goBack(){
      this.$router.go(-1);
    },
    async fetchUser(){
      try{
        const res = await this.fetchUsersInTerritory({id:this.$route.params.territoryId})
        this.users = res.data
        console.log(res)
      } catch (err) {
        this.$toast.error(err.response.data.error.message);
        console.log(err)
      }
    },
    async getAgentUsers(page = 1,data = '',){
      this.updateLoader(true);
      try {
        const res = await this.fetchAgents({roles:data,size:1000,page,partnerId:'', territoryId: this.$route.params.territoryId});
        this.agentUsers = res.data
        this.updateLoader(false);
      } catch (err) {
        if(err.response.status === 401) {
          console.log(err.response.status)
          this.$toast.error(`Your session has expired please sign in again.`);
          this.logout();
        }
        if(err.response.status === 400) {
          // console.log(err.response)
          this.$toast.error(err.response.data.error.message);
          this.updateLoader(false);
        }
      }
      // console.log(res)
    },
    async getUnmappedAgents(page = 1,data = '',){
      this.updateLoader(true);
      try {
        const res = await this.fetchAgents({roles:data,size:1000,page, territoryId: ''});
        this.unmappedeAgents = res.data
        this.updateLoader(false);
      } catch (err) {
        if(err.response.status === 401) {
          console.log(err.response.status)
          this.$toast.error(`Your session has expired please sign in again.`);
          this.logout();
        }
        if(err.response.status === 400) {
          // console.log(err.response)
          this.$toast.error(err.response.data.error.message);
          this.updateLoader(false);
        }
      }
      // console.log(res)
    },
    assignAgents(user){
      this.assignAgentUserModal = true
      if(user){
          this.agentsToStaff.id = user.id
        this.agentsToStaff.agentIds = []
      }
    },
    async fetchUnmappedTerritoryUser(){
      this.updateLoader(true);
      try{
        const res = await this.unMappedAgentsToTerritory({id:this.$route.params.id});
        console.log(res)
        this.updateLoader(false);
        this.unmappedTerritoryUser = res.data
      } catch (err) {
        this.$toast.error(err.response.error.message);
        this.updateLoader(false);
      }
    },
    async assignUserToTerritory(){
      // this.updateLoader(true);
      try {
        const params = {
          id:this.$route.params.territoryId,
          userIds: this.userToTerritory.userIds
        }
        const res = await this.mappingUserToTerritory(params);
        console.log(res)

        this.assignTerritoryUserModal = false;
        // this.updateLoader(false);
        this.$toast.success('Operation Successful!');
        this.userToTerritory.userIds = {}
        this.fetchUser()
        this.getAgentUsers()
      } catch (err) {
        this.$toast.error(err.response.data.error.message);
        // this.updateLoader(false);
      }
    },
    async assignAgentToStaff(){
      // this.updateLoader(true);
      try {
        const params = {
          id: this.agentsToStaff.id,
          agentIds: this.agentsToStaff.agentIds
        }
        const res = await this.agentToStaffMapping(params);
        // console.log(res)

        this.assignAgentUserModal = false;
        // this.updateLoader(false);
        this.$toast.success('Operation Successful!');
        this.agentsToStaff = {}
        this.fetchUser()
      } catch (err) {
        this.$toast.error(err.response.data.error.message);
        // this.updateLoader(false);
      }
    },
    async assignAgentToTerritory(){
      // this.updateLoader(true);
      try {
        const params = {
          id: this.$route.params.territoryId,
          agentIds: this.agentsToStaff.agentIds
        }
        this.agentsToStaff = {}
        this.assignAgentModal = false;
        const res = await this.mapAgentToTerritory(params);
        // console.log(res)
        // this.updateLoader(false);
        this.$toast.success('Operation Successful!');
        this.userToTerritory.userIds = {}
        this.fetchUser()
      } catch (err) {
        this.$toast.error(err.response.data.error.message);
        this.updateLoader(false);
      }
    },
  },
  async mounted(){
    this.fetchUser();
    this.getUnmappedAgents();
    this.fetchUnmappedTerritoryUser();
    this.getAgentUsers();
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
  width:530px;
}
</style>
<style>
.el-select{
  display: block;
}
</style>
