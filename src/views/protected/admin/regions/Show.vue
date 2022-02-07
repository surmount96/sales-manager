<template>
  <div class="">
    <div class="my-3">
      <button @click="goBack" class="flex items-center py-2 justify-center w-24 text-medium border border-gray bg-white  rounded-md focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        <span class="mx-2">Back</span>
      </button>
    </div>
    <h2 class="ml-4 ">Region Name: <span class="font-semibold">{{ region.name }}</span></h2>
    <div class="my-3 p-5">
      <div class="flex items-center justify-end mb-3">

        <div class="flex">
          <button @click="open('Territory')" class="py-2 px-3 text-medium focus:outline-none border border-gray bg-white rounded-md mx-2 flex items-center">
            <i class="ri-dashboard-line mr-2 ri-fw"></i>
            Create Territories
          </button>
<!--          <button @click="showModal = true" class="flex items-center focus:outline-none py-3 px-4 justify-center text-medium bg-white border border-gray rounded mx-3">-->
<!--            <img src="/icons/download.svg" alt="">-->
<!--            <span class="ml-2">Bulk target</span>-->
<!--          </button>-->
          <button @click="assignUserModal = true" class="py-2 px-3 text-medium focus:outline-none border border-gray bg-white rounded-md mx-2 flex items-center">
            <i class="ri-dashboard-line mr-2 ri-fw"></i>
            Assign User to this region
          </button>
          <button @click="assignASSModal = true" class="py-2 px-3 text-medium focus:outline-none border border-gray bg-white rounded-md mx-2 flex items-center">
            <i class="ri-dashboard-line mr-2 ri-fw"></i>
            Assign ASS to territories
          </button>
        </div>
      </div>
      <div class="bg-white p-4 rounded-md">
        <div class="">
          <div class="flex justify-between items-center py-3 mb-4">
            <h4 class="text-large">
              {{ region.name }} Region
            </h4>
          </div>
          <div class="text-body-2 flex flex-wrap mb-6">
            <div class="w-1/3">
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
            <div class="w-1/3">
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
            <div class="w-1/3 flex items-center">
              <router-link :to="'/admin/region/'+$route.params.id+'/user'" tag="button" title="view region">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-dark" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
              </router-link>
              <button @click="showEditRegionModal" class="text-blue-dark mx-4" title="edit region">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
<!--      <div class="bg-white p-4">-->
<!--        <div class="">-->
<!--          <h5 class="text-medium font-semibold">States</h5>-->
<!--          <table class="table-auto w-full shadow-sm">-->
<!--            <tr class="bg-gray-400 font-semibold">-->
<!--              <td class="py-4 text-medium px-3 ">-->
<!--                Name-->
<!--              </td>-->
<!--            </tr>-->
<!--            <tr class="border-b border-gray text-gray-base" v-for="state in region.states" :key="state.id">-->
<!--              <td class="py-4 text-medium px-3">-->
<!--                {{ state.name }},-->
<!--              </td>-->
<!--            </tr>-->
<!--          </table>-->
<!--        </div>-->
<!--      </div>-->
      <div class="flex flex-wrap bg-white p-4">
        <div class="mb-4 w-full">
          <h5 class="text-body-2 font-semibold mb-3">Territories</h5>
          <table class="table-auto w-full shadow-sm">
            <tr class="bg-gray-400 font-semibold">
              <td class="py-4 text-medium px-3 ">
                Name
              </td>
              <td class="py-4 text-medium px-3 ">TSO Name</td>
              <td class="py-4 text-medium px-3 ">Email</td>
              <td class="py-4 text-medium px-3 ">Phone</td>
              <td class="py-4 text-medium px-3 ">Action</td>
            </tr>
            <tr class="border-b border-gray text-gray-base" v-for="te in territories" :key="te.id">
              <td class="py-4 text-medium px-3">{{ te.name }}</td>
              <td class="py-4 text-medium px-3"> {{ te.territoryOfficer ? te.territoryOfficer.firstName  : '-'}}</td>
              <td class="py-4 text-medium px-3"> {{ te.territoryOfficer ? te.territoryOfficer.email : ''}}</td>
              <td class="py-4 text-medium px-3" v-if="te.territoryOfficer">
                <span v-for="phone in te.territoryOfficer.phoneNumbers" :key="phone.id">{{ phone }}</span>
              </td>
              <td class="py-4 text-medium px-3" v-else>-</td>
              <td class="py-4 text-medium px-3 flex items-center">
                <button @click="showSingleTerritory($route.params.id,te)" title="view territory">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-100" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button @click="edit(te)" title="edit territory" class="text-blue-dark ml-4 text-large focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button @click="showMapModal(te)" class="text-success mx-4 text-large focus:outline-none" title="Assign territory to LGA">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </button>
                <button @click="showMoveModal(te)" class="text-warning text-large focus:outline-none" title="Move territory to another region">
                  <i class="ri-drag-move-line"></i>
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <general-modal :option="option" :formInput="form" :states="states" :regions="regions" :show="$route.params.id"/>
    <vue-final-modal
        v-model="editTerritory"
        classes="modal-container"
        content-class="modal-content">
      <div class="">
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1"> Name</label>
          <input v-model="input.name" type="text" placeholder="Enter a region" class="py-2 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">
          <small class="text-red-dark">{{ errors['name'] }}</small>
        </div>
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">Assign a user</label>
          <select v-model="input.userId" class="py-3 px-2 text-medium text-gray-base rounded-md focus:outline-none border border-gray w-full">
<!--            <option>select user to assign</option>-->
            <option v-for="tso in tsoUsers" :key="tso.id" :value="tso.id">{{ tso.email }} <span v-if="tso.firstName || tso.lastName">({{ tso.firstName + ' ' + tso.lastName }})</span></option>
          </select>
          <small class="text-red-dark">{{ errors['user'] }}</small>
        </div>
        </div>
        <button @click.prevent="updateTerritory" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none">
            <span >
                Update Territory
            </span>

        </button>

    </vue-final-modal>
    <vue-final-modal
        v-model="moveTerritoryState"
        classes="modal-container"
        content-class="modal-content">
      <div class="">
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">Select new region</label>
          <select v-model="move.regionId" class="py-3 px-2 text-medium text-gray-base rounded-md focus:outline-none border border-gray w-full">
<!--            <option>select user to assign</option>-->
            <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.name }}</option>
          </select>
          <small class="text-red-dark">{{ errors['user'] }}</small>
        </div>


      </div>
      <button @click.prevent="moveTerritory" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none">
            <span >
                Move Territory
            </span>

      </button>
    </vue-final-modal>

<!--    Map territory -->
    <vue-final-modal
        v-model="mapTerritoryState"
        classes="modal-container"
        content-class="modal-content">
      <div class="">
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">Lga</label>
          <el-select
              v-model="mapL.lgas"
              multiple
              filterable
              allow-create
              placeholder="Select lga">
            <el-option
                v-for="item in lgas"
                :key="item.id"
                :label="item.name"
                :value="item.code">
            </el-option>
          </el-select>
          <small class="text-red-dark">{{ errors['user'] }}</small>
        </div>
      </div>
      <button @click.prevent="mapTerritory" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none">
            <span >
                Assign Territory to Lga
            </span>

      </button>
    </vue-final-modal>

<!--    Bulk target-->
    <vue-final-modal
        v-model="showModal"
        classes="modal-container"
        content-class="modal-content">
      <div class="pb-3 border-b border-gray">
        <h5 >Create Bulk Targets</h5>
      </div>
      <form action=""
      >
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">Period</label>
          <datepicker v-model="bulk.period" class="focus:outline-none border border-gray py-2 px-3 text-medium rounded-md w-full"></datepicker>
        </div>
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">Locations</label>
            <el-select
                v-model="bulk.user"
                multiple
                filterable
                allow-create
                placeholder="Choose a state">
              <el-option
                  v-for="item in territories"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
        </div>
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">Type</label>
          <select v-model="bulk.role" class="focus:outline-none py-2 w-full border border-gray rounded-sm">
            <option value="TSO">TSO</option>
          </select>
        </div>
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">Transaction Volume</label>
          <input v-model="bulk.volume" type="text" placeholder="Enter your volume" class="py-2 px-5  text-medium text-gray-base  rounded-md focus:outline-none border border-gray w-full">
          <!--          <small class="text-red-dark text-small">{{ errors['email']}}</small>-->
        </div>
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">Transaction Value</label>
          <input v-model="bulk.value" type="text" placeholder="Enter your value" class="py-2 px-5  text-medium text-gray-base  rounded-md focus:outline-none border border-gray w-full">
          <!--          <small class="text-red-dark">{{ errors['role']}}</small>-->
        </div>
        <hr class="border-t border-gray my-6">
        <div class="flex items-center justify-end">
          <button @click="showModal= false" class="border border-blue-base py-2 px-8 text-medium rounded-md focus:outline-none mx-2">
            Cancel
          </button>
          <button @click.prevent="bulkTarget" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none ml-4">
            {{ message }}
          </button>
        </div>
      </form>
    </vue-final-modal>

<!--    Show region-->
    <vue-final-modal
        v-model="editRegion"
        classes="modal-container"
        content-class="modal-content">
      <div class="">
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1"> Region name</label>
          <input v-model="region.name" type="text" placeholder="Enter a region" class="py-2 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">
          <small class="text-red-dark">{{ errors['name'] }}</small>
        </div>
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">Assign a user</label>
          <select v-model="region.userId" placeholder="Enter your fullname" class="py-3 px-2 text-medium text-gray-base rounded-md focus:outline-none border border-gray w-full">
<!--            <option>select user to map</option>-->
            <option v-for="rsm in rsmUsers" :key="rsm.id" :value="rsm.id">{{ rsm.email }} <span v-if="rsm.firstName || rsm.lastName">({{ rsm.firstName + ' ' + rsm.lastName }})</span></option>
          </select>
          <small class="text-red-dark">{{ errors['user'] }}</small>
        </div>
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">
            States:
          </label>
          <el-select
              v-model="region.stateCodes"
              multiple
              filterable
              allow-create
              placeholder="Choose a state">
            <el-option
                v-for="item in states"
                :key="item.id"
                :label="item.name"
                :value="item.code">
            </el-option>
          </el-select>
          <small class="text-red-dark">{{ errors['stateCodes'] }}</small>
        </div>
        <button @click="editRegion= false" class="border border-blue-base py-2 px-8 text-medium rounded-md focus:outline-none mx-2">
          Cancel
        </button>
        <button @click.prevent="updateRegion" :disabled="!activateButton" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none ml-4">
            <span >
                Update Region
            </span>

        </button>
      </div>

    </vue-final-modal>

<!--    Mapping agents-->
    <vue-final-modal
        v-model="assignUserModal"
        classes="modal-container"
        content-class="modal-content">
      <div class="">
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">Users</label>
          <el-select
              v-model="mappingRegionUser.userIds"
              multiple
              filterable
              allow-create
              placeholder="Select users">
            <el-option
                v-for="item in unmappedRegionUser"
                :key="item.id"
                :label="item.email"
                :value="item.id">
            </el-option>
          </el-select>
          <small class="text-red-dark">{{ errors['user'] }}</small>
        </div>
      </div>
      <button @click.prevent="mapUserToRegion" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none">
            <span >
                Assign User to this Region
            </span>
      </button>
    </vue-final-modal>

    <!--    Map ASS to territory-->
    <vue-final-modal
        v-model="assignASSModal"
        classes="modal-container"
        content-class="modal-content">
      <div class="">

        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">Area sales officer</label>
          <select v-model="formAssT.areaOfficerId" placeholder="Enter your fullname" class="py-3 px-2 text-medium text-gray-base rounded-md focus:outline-none border border-gray w-full">
            <option>select</option>
            <option v-for="ass in assUsers" :key="ass.id" :value="ass.id">{{ ass.email }} <span v-if="ass.firstName || ass.lastName">({{ ass.firstName + ' ' + ass.lastName }})</span></option>
          </select>
          <small class="text-red-dark">{{ errors['user'] }}</small>
        </div>
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">Territory</label>
          <el-select
              v-model="formAssT.territoryIds"
              multiple
              filterable
              allow-create
              placeholder="Choose a territory">
            <el-option
                v-for="item in territories"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
          <small class="text-red-dark">{{ errors['user'] }}</small>
        </div>
      </div>
      <button @click.prevent="mapASSToTerritory" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none">
        <span >
            Assign ASS to territory
        </span>
      </button>
    </vue-final-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import GeneralModal from '@/components/ui/modal/GeneralModal.vue';

const { mapMutations,mapActions } = createNamespacedHelpers('auth');
export default {
name: "Show",
  data(){
   return{
     territories: {},
     form:{},
     showModal:false,
     editRegion:false,
     region:{
       regionManagerId:''
     },
     regions:{},
     lgas:{},
     input:{
       id:'',
       name:'',
       userId:''
     },
     formAssT:{
       areaOfficerId:'',
       territoryIds:''
     },
     errors:[],
     editTerritory: false,
     mapTerritoryState: false,
     moveTerritoryState: false,
     move:{
       id:'',
       regionId:''
     },
     mapL:{
       id:'',
       lgas:[]
     },
     option:{},
     states:{},
     rsmUsers:{},
     tsoUsers:{},
     assUsers:{},
     bulk:{
       user_id:'',
       period:'',
       role:'',
       value:'',
       volume:''
     },
     message:'Create bulk target',
     assignUserModal: false,
     assignTerritoryUserModal: false,
     showRegionModal: false,
     assignASSModal: false,
     unmappedRegionUser:{},
     unmappedTerritoryUser:{},
     mappingRegionUser:{
       userIds:[]
     },
     mappingTerritoryUser:{
       userIds:'',
       territoryIds:[]
     },
     budgets:{},
     budgetId:''
   }
  },
  computed:{
    activateButton() {
      return (this.region.name && this.region.userId && this.region.stateCodes);
    }
  },
  methods: {
    ...mapActions(['fetchBudget','assignAssUserToTerritory','mappingUserToTerritory','mappingUserToRegion','unMappedAgentsToTerritory','mappingUserToTerritory','fetchLgas','fetchTerritory','unMappedAgents','createBulkTarget','changeRegion', 'fetchIndividualRegion','fetchRegion','fetchAllUsers','state','changeTerritory','territoryMove','territoryMap','logout']),
    ...mapMutations(['updateLoader', 'toggleUserModal','showModalDetails','updateRegionValue','updateTerritoryValue']),
    goBack(){
      this.$router.go(-1);
    },
    // redirectToRegion(){
    //   if(!this.budgetId){
    //     this.$toast.error('Please select a budget');
    //     return true;
    //   }
    //   this.$router.push({path: `/admin/budgets/${this.budgetId}/regions/targets`})
    // },
    // async getBudgets(){
    //   try {
    //     const res = await this.fetchBudget();
    //     this.budgets = res.data
    //     console.log(res)
    //   } catch (err) {
    //     this.$toast.error(err.response.data.error.message);
    //   }
    // },
    async getLgas(){
      try{
        const res = await this.fetchLgas({id:this.$route.params.id});
        // console.log(res)
        this.lgas = res.data
      } catch (err) {
        this.$toast.error(err.response.error.message);
      }
    },
    async fetchUnmappedUser(){
      try{
        const res = await this.unMappedAgents();
        this.unmappedRegionUser = res.data
      } catch (err) {
        this.$toast.error(err.response.error.message);
      }
    },
    async fetchUnmappedTerritoryUser(){
      try{
        const res = await this.unMappedAgentsToTerritory({id:this.$route.params.id});
        console.log(res)
        this.unmappedTerritoryUser = res.data
      } catch (err) {
        this.$toast.error(err.response.error.message);
      }
    },
    showEditRegionModal(){
      this.editRegion =true;
      this.region.userId = this.region.regionManager ? this.region.regionManager.id : ''
      this.region.stateCodes = this.region.states.map((state)=> {
        return state.code;
      })
    },
    async getRegion(page = 1){
      this.updateLoader(true);
      try {
        const res = await this.fetchRegion({page,size:100});
        console.log(res)
        this.regions = res.data
        this.updateLoader(false);
      } catch (err) {
        if(err.response.status === 401) {
          console.log(err.response.status)
          this.$toast.error(`Your session has expired please sign in again.`);
          this.logout();
        }
      }
    },
    showSingleTerritory(regionId,data){
      this.updateTerritoryValue(data)
      this.$router.push({path:`/admin/region/${regionId}/territory/${data.id}`})
    },
    async territory(){
      // console.log(region)
      this.updateLoader(true);
      try {
        const res = await this.fetchTerritory({id: this.$route.params.id});
        // console.log(res)
        this.territories = res.data
        this.updateLoader(false);
        // this.showModal = true
      } catch (err) {
        // if(err.response.status === 401) {
          console.log(err.response.status)
          this.$toast.error(err.response.error.message);
          // this.logout();
        // }
      }
    },
    async updateRegion(){
      this.message = "Updating region....";
      try{
        this.region.regionManagerId = this.region.userId;
        const res = await this.changeRegion(this.region);
        this.region = {};
        this.editRegion = false;
        this.$toast.success('Operation Successful!');
        this.message = "Region updated";
        this.singleRegion();
      } catch(err) {
        if(err.response.status === 422) {
          this.errors = err.response.data.error.reasons;
        }
        if(err.response.status === 400) {
          this.$toast.error(err.response.data.error.message);
        }
        this.message = '';
        this.$toast.error(err.response.data.error.message);
      }
    },
    async mapUserToRegion(){
      // this.updateLoader(true);
      try {
        const res = await this.mappingUserToRegion({id:this.$route.params.id,userIds: this.mappingRegionUser.userIds});
        console.log(res)
        this.assignUserModal = false;
        this.mappingRegionUser = {}
        // this.updateLoader(false);
        this.$toast.success('Success! Users mapped to region.');
      } catch (err) {
        this.$toast.error(err.response.data.error.message);
        // this.updateLoader(false);
      }
    },
    async mapASSToTerritory(){
      // this.updateLoader(true);
      try {
        const res = await this.assignAssUserToTerritory({id:this.$route.params.id, areaOfficerId: this.formAssT.areaOfficerId, territoryIds: this.formAssT.territoryIds});
        console.log(res)
        this.assignASSModal = false;
        // this.updateLoader(false);
        this.$toast.success('Operation Successful!');
      } catch (err) {
        this.$toast.error(err.response.data.error.message);
        // this.updateLoader(false);
      }
    },
    async bulkTarget(){
      const clock = new Date(this.bulk.period);
      const month = clock.getMonth() + 1;
      const year = clock.getFullYear();
      const period = `${clock.getFullYear() }-${month < 10 ? '0'+month : month}`;
      this.message = "Loading....";
      // this.updateLoader(true)
      try {
        if(this.bulk.value && this.bulk.volume){
          const params = {
            period,
            role:this.bulk.role,
            locations:this.bulk.user,
            targets: [
              {
                type: 'TRANSACTION_VOLUME',
                value: this.bulk.volume
              },
              {
                type: 'TRANSACTION_VALUE',
                value: this.bulk.value
              }
            ]
          };
          // console.log(params)
          const res = await this.createBulkTarget(params);
          this.bulk = {};
          this.showModal = false
          this.message = "Create bulk target";
          this.$toast.success(`Target successfully configured.`);
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
        this.$toast.error(err.response.data.error.message);
        this.message = "Create bulk target";
        // this.updateLoader(false)
      }
    },
    async allState(){
      try{
        const res = await this.state();
        this.states = res.data;
      } catch(err) {
        console.log(err.response)
      }
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
    async singleRegion(){
      this.updateLoader(true);
      try {
        const res = await this.fetchIndividualRegion({id: this.$route.params.id});
        // console.log(res)
        this.region = res.data
        this.updateRegionValue(res.data)
        this.updateLoader(false);
        // this.showModal = true
      } catch (err) {
        if(err.response.status === 401) {
          // console.log(err.response.status)
          this.$toast.error(`Your session has expired please sign in again.`);
          this.logout();
        }
      }
    },
    edit(user){
      this.editTerritory = true;
      if(user){
        this.input.id = user.id
        this.input.name = user.name
        this.input.userId = user.territoryOfficer.id
        // console.log(user.territoryOfficer)
      }
    },
    showMoveModal(data){
      this.moveTerritoryState = true;
      if(data){
        this.move.id = data.id
        this.move.regionId = this.$route.params.id
      }
    },
    showMapModal(user){
      // this.$toast.warning('This operation is not available yet.');
      this.mapTerritoryState = true;
      if(user){
        this.mapL.id = user.id;
      }
    },
    async updateTerritory(){
      this.message = "Updating territory....";
      try{
        this.input.territoryOfficerId = this.input.userId;
        const res = await this.changeTerritory(this.input);
        // console.log(res)
        this.editTerritory = false;
        this.$toast.success('Operation Successful!');
        this.message = "Territory updated";
        this.territory();
      } catch(err) {
        if(err.response.status === 422) {
          this.errors = err.response.data.error.reasons;
        }
        if(err.response.status === 400) {
          this.$toast.error(err.response.data.error.message);
        }
        this.message = '';
        this.$toast.error(err.response.data.error.message);
      }
    },
    async moveTerritory(){
      try{
        const res = await this.territoryMove(this.move);
        this.moveTerritoryState = false;
        this.$toast.success('Territory Successfully Moved!');
        this.message = "Territory updated";
        this.territory();
      } catch(err) {
        if(err.response.status === 422) {
          this.errors = err.response.data.error.reasons;
        }
        if(err.response.status === 400) {
          this.$toast.error(err.response.data.error.message);
        }
        this.message = '';
        this.$toast.error(err.response.data.error.message);
      }
    },
    async mapTerritory(){
      this.message = "Updating territory....";
      try{

        const res = await this.territoryMap(this.mapL);
        // console.log(res)
        this.mapTerritoryState = false;
        this.$toast.success('Territory Successfully assigned to LGAs!');
        this.territory();
      } catch(err) {
        if(err.response.status === 422) {
          this.errors = err.response.data.error.reasons;
        }
        if(err.response.status === 400) {
          this.$toast.error(err.response.data.error.message);
        }
        this.message = '';
        this.$toast.error(err.response.data.error.message);
      }
    },
    async assignRegionUser() {
      try{
        const res = await this.fetchAllUsers({role:'RSM',email:'',size:100,page:1})
        this.rsmUsers = res.data;
      } catch(err) {
        this.$toast.error(err.response.data.error.message);
      }
    },
    async fetchTsoStaffs() {
      try{
        const res = await this.fetchAllUsers({role:'TSO',email:'',size:100,page:1})
        this.tsoUsers = res.data;
      } catch(err) {
        this.$toast.error(err.response.data.error.message);
      }
    },
    async fetchASSUsers() {
      try{
        const res = await this.fetchAllUsers({role:'ASS',email:'',size:100,page:1})
        this.assUsers = res.data;
      } catch(err) {
        this.$toast.error(err.response.data.error.message);
      }
    },
  },
  components:{
    GeneralModal,
  },
  async mounted(){
    this.territory();
    this.singleRegion();
    this.assignRegionUser();
    this.getRegion();
    this.fetchTsoStaffs();
    // this.getBudgets();
    this.allState();
    this.fetchUnmappedUser();
    this.fetchASSUsers();
    this.fetchUnmappedTerritoryUser();
    this.getLgas();
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
<style scoped>

</style>
