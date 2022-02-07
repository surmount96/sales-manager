<template>
  <div>
    <section class="bg-white border border-gray rounded-md" style="min-height:50vh">
      <div class="h-16 shadow p-3 flex items-center justify-between">
        <div>
          <h4 class="font-semibold">Regions</h4>
        </div>
        <div class="flex items-center">
          <button @click="open('Region')" v-show="createPermission || role === 'SUPER_ADMIN'" class="py-2 px-3 text-medium focus:outline-none border border-gray bg-white rounded-md mx-2 flex items-center">
            <i class="ri-dashboard-line mr-2 ri-fw"></i>
            Create Region
          </button>
        </div>
      </div>
      <table class="table-auto w-full">
        <tr class="bg-gray-400 font-semibold">
          <td class="py-4 text-medium px-3 ">Name</td>
          <td class="py-4 text-medium px-3">RSM</td>
          <td class="py-4 text-medium px-3">Action</td>
        </tr>
        <tr class="border-b border-gray text-gray-base" v-for="region in regions" :key="region.id">
          <td class="py-4 text-medium px-3">{{ region.name }}</td>
          <td class="py-4 text-medium px-3 " >
<!--            <router-link :to="'/user/user/'+ (region.regionManager !== null ? region.regionManager.id : '')" class="hover:text-blue-100 hover:underline">-->
              {{ region.regionManager ? region.regionManager.email : ' - '}}
              <span v-if="region.regionManager">
                {{ region.regionManager.firstName !== null ? '('+region.regionManager.firstName+' '+ region.regionManager.lastName+')' : ' ' }}
              </span>
<!--            </router-link>-->
          </td>
          <td class="py-4 text-medium px-3 flex flex-wrap items-center">
            <router-link :to="'/user/region/'+region.id" class="text-blue-100" v-show="showPermission || role === 'SUPER_ADMIN'">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
              </svg>
            </router-link>
            <button @click="edit(region)" v-show="updatePermission || role === 'SUPER_ADMIN'" class="text-blue-dark ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
              </svg>
            </button>
          </td>
        </tr>
      </table>
      <pagination @pagePagination="getRegion" :meta="meta"/>
    </section>
    <vue-final-modal
        v-model="editRegion"
        classes="modal-container"
        content-class="modal-content"
    @closed="cancelModal">
      <div class="">
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1"> Region name</label>
          <input v-model="region.name" type="text" placeholder="Enter a region" class="py-2 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">
          <small class="text-red-dark">{{ errors['name'] }}</small>
        </div>
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">Assign a regional manager</label>
          <select v-model="region.userId" placeholder="Enter your fullname" class="py-3 px-2 text-medium text-gray-base rounded-md focus:outline-none border border-gray w-full">
            <option v-for="rsm in listRsmUsers" :key="rsm.id" :value="rsm.id">{{ rsm.email }} <span v-if="rsm.firstName || rsm.lastName">({{ rsm.firstName + ' ' + rsm.lastName }})</span></option>
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
        <button @click="cancelModal" class="border border-blue-base py-2 px-8 text-medium rounded-md focus:outline-none mx-2">
          Cancel
        </button>
        <button @click.prevent="updateRegion" :disabled="!activateButton" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none ml-4">
            <span >
                Update Region
            </span>

        </button>
      </div>

    </vue-final-modal>

    <general-modal :option="option" :formInput="form" :states="states" :regions="regions" :rsmUsers="listRsmUsers"/>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Multiselect from '@vueform/multiselect';
import GeneralModal from '@/components/ui/modal/GeneralModal.vue';
import permissions from "@/permissions";
import Pagination from "@/components/Pagination";
import reusableState from "@/mixins/reusableState"

const { mapMutations,mapActions,mapGetters } = createNamespacedHelpers('auth');
const PR = permissions;

export default {
  data(){
    return {
      regions:{},
      showModal:false,
      territories:{},
      form:{},
      meta:{},
      region:{
        name:'',
        stateCodes:[],
        regionManager: null
      },
      message:'Create bulk target',
      errors:[],
      editRegion: false,
      option:{
      },
      states:{},
    };
  },
  mixins:[
    reusableState
  ],
  components:{
    GeneralModal,
    Multiselect,
    Pagination
  },
  computed:{
    ...mapGetters(['role']),
    activateButton() {
      return (this.region.name && this.region.userId && this.region.stateCodes);
    },
    showPermission(){
      return PR.userSinglePermission(this.$store.state.auth.user.role.permissions);
    },
    createPermission(){
      return PR.regionCreatePermission(this.$store.state.auth.user.role.permissions);
    },
    updatePermission(){
      return PR.regionUpdatePermission(this.$store.state.auth.user.role.permissions);
    },
    regionPermissionIndex(){
      return PR.regionIndexPermission(this.$store.state.auth.user.role.permissions);
    },
    regionUnmappeduser(){
      return PR.regionUserMapPermission(this.$store.state.auth.user.role.permissions);
    },
  },
  methods:{
    ...mapActions(['fetchRegion','fetchTerritory','fetchAllUsers','logout','state','unMappedRegionUser','changeRegion','createBulkTarget']),
    ...mapMutations(['updateLoader','toggleUserModal','showModalDetails']),
    cancelModal(){
      this.region = {}
      this.editRegion= false
    },
    async getRegion(page = 1){
      this.updateLoader(true);
      try {
        const res = await this.fetchRegion({page,size:10});
        this.regions = res.data
        this.meta = res.meta
        this.updateLoader(false);
      } catch (err) {
        if(err.response.status === 401) {
          // console.log(err.response.status)
          this.$toast.error(`Your session has expired please sign in again.`);
          this.logout();
          return
        }
        this.errorCatchy(err)
      }
    },
    async territory(region){
      this.updateLoader(true);
      try {
        const res = await this.fetchTerritory({id: region.id});
        this.territories = res.data
        this.updateLoader(false);
        this.showModal = true
      } catch (err) {
        this.errorCatchy(err)
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
    edit(user){
      this.editRegion = true;
      if(user){
        this.region.id = user.id
        this.region.name = user.name
        if(user.regionManager) {
          this.region.userId = user.regionManager ? user.regionManager.id : ''
          let checkDuplicate = this.listRsmUsers.map((item) => {
            return item.id;
          });
          if(checkDuplicate.indexOf(user.regionManager.id) === -1){
            this.listRsmUsers.push(user.regionManager)
          }
        }
        this.region.stateCodes = user.states.map((state)=> {
          return state.code;
        })
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
        this.getRegion();
      } catch(err) {
        this.errorCatchy(err)
        this.message = 'Update Region';
      }
    },

  },
  async mounted(){
    this.getRegion();
    if(this.role === 'SUPER_ADMIN' || this.regionUnmappeduser){
      this.fetchUnmappedUser()
    }
    this.allState()
    if(this.role === 'SUPER_ADMIN' || this.regionPermissionIndex){
      this.assignRegionUser()
    }
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
