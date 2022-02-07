<template>
  <div class="">
    <button @click="goBack" class="flex items-center py-2 justify-center w-24 text-medium border border-gray rounded-md focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
      <span class="mx-2">Back</span>
    </button>
    <div class="flex justify-between items-center px-8 mt-4">
      <h3 class="font-semibold">Regions target</h3>
     <div class="flex items-center ">
<!--       <button @click="showTerritoryModal = true" class="py-2 px-4 mr-2 text-medium border border-gray rounded-md focus:outline-none">-->
<!--         View territory target-->
<!--       </button>-->
       <button @click="cleanForm" class="py-2 px-4 text-medium border border-gray rounded-md focus:outline-none">
         Create regional target
       </button>
     </div>
    </div>
    <div class="py-3 px-6">
      <div class="py-3 px-4">
        <div class="text-body-2 flex flex-wrap mb-6">
          <div class="w-1/2">
            <h6 class="mb-6 font-semibold">Achievement</h6>
            <div class="text-medium">
              <p>
                {{ numeralFormat(achievement.value)+' ('+achievement.percentage+'%)' }}
              </p>
            </div>
          </div>
          <div class="w-1/2">
            <div class="py-3 px-4">
<!--              <h6 class=" mt-4 mb-6 font-semibold">Allocated Summary</h6>-->
              <div class="flex flex-wrap">
                <div class="lg:w-1/2 md:w-1/2 w-full">
                  <h6 class="mb-6 font-semibold text-body-2">Allocated</h6>
                  <div class="text-body-2 flex flex-wrap mb-6">
                    <div class="">
                      <div class="text-medium">
                        <p>
                          {{ numeralFormat(allocated.value)+' ('+allocated.percentage+'%)' }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="lg:w-1/2 md:w-1/2 w-full">
                  <h6 class="mb-6 font-semibold text-body-2">Unallocated</h6>
                  <div class="text-body-2 flex flex-wrap mb-6">
                    <div class="">
                      <div class="text-medium">
                        <p>
                          {{ numeralFormat(unallocated.value)+' ('+unallocated.percentage+'%)' }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="px-4 bg-white rounded-sm py-5">
        <h6 class="mb-6 font-semibold text-body-2">Targets</h6>
        <table class="table w-full">
          <tr class="bg-gray-400 font-semibold">
            <td class="py-4 text-medium px-3 ">Regional Manager</td>
            <td class="py-4 text-medium px-3 ">Name</td>
            <td class="py-4 text-medium px-3">Achievement</td>
            <td class="py-4 text-medium px-3">Allocated</td>
            <td class="py-4 text-medium px-3">Action</td>
          </tr>
          <tr class="border-b border-gray text-gray-base" v-for="target in targets" :key="target.id">
            <td class="py-4 text-medium px-3">{{ target.owner.regionManager ? target.owner.regionManager.firstName + ' ' + target.owner.regionManager.lastName +'('+target.owner.regionManager.email+')' : '-'  }}</td>
            <td class="py-4 text-medium px-3">{{ target.owner.name }}</td>
            <td class="py-4 text-medium px-3">{{ numeralFormat(target.achievement.value) +' ('+target.achievement.percentage+'%)'  }}</td>
            <td class="py-4 text-medium px-3">{{ numeralFormat(target.value) +' ('+target.percentage+'%)'  }}</td>
            <td class="py-4 text-medium px-3 flex items-center" >
              <router-link v-show="target.owner" :to="'/admin/budgets/'+$route.params.id+'/regions/'+target.owner.id +'/territories/targets'" tag="button">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-100" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
              </router-link>
              <button @click="edit(target)" class="text-blue-dark ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                </svg>
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <vue-final-modal
        v-model="modal"
        classes="modal-container"
        content-class="modal-content"
    >
      <div class="pb-3 border-b border-gray">
        <h5 >Create region target</h5>
      </div>
      <form action=""
      >
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">Choose a region</label>
          <select v-model="form.ownerId" class="py-2 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">
            <option v-for="type in regions" :key="type.id" :value="type.id">{{ type.name }}</option>
          </select>
          <small class="text-red-dark">{{ errors['value'] }}</small>
        </div>
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-2">Percentage</label>
          <input v-model="form.percentage" type="text" class="focus:outline-none py-2 text-medium px-4 w-full border border-gray rounded-md">
        </div>


        <hr class="border-t border-gray my-6">
        <div class="flex items-center justify-end">
          <button @click.prevent="modal = false" class="border border-blue-base py-2 px-8 text-medium rounded-md focus:outline-none mx-2">
            Cancel
          </button>
          <button @click.prevent="regionState ? handleUpdate() : handleCreate()" :disabled="!activateButton" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none ml-4">
            <span v-show="!regionState">
              Create
            </span>
            <span v-show="regionState">
              Update
            </span>
          </button>
        </div>
      </form>
    </vue-final-modal>

    <!--    Select region for terriory targets-->
    <vue-final-modal
        v-model="showTerritoryModal"
        classes="modal-container"
        content-class="modal-content">
      <div class="">
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1">Choose a region</label>
          <select v-model="region.id" class="py-2 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">
            <option v-for="type in regions" :key="type.id" :value="type.id">{{ type.name }}</option>
          </select>
          <small class="text-red-dark">{{ errors['value'] }}</small>
        </div>
        <button @click="showTerritoryModal= false" class="border border-blue-base py-2 px-8 text-medium rounded-md focus:outline-none mx-2">
          Cancel
        </button>
        <button @click.prevent="redirectToTerritory" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none ml-4">
          Confirm
        </button>
      </div>

    </vue-final-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapMutations,mapActions } = createNamespacedHelpers('auth');

export default {
name: "RegionTarget",
  data(){
    return {
      allocated:{},
      unallocated:{},
      regions:{},
      budgets:{},
      targets:{},
      region:{
        budgetId:'',
        id:'',
        territoryId: ''
      },
      achievement:{},
      users:{},
      modal:false,
      regionState:false,
      showTerritoryModal:false,
      errors:[],
      form:{
        id:'',
        ownerId:'',
        percentage:''
      }
    };
  },
  computed:{
    activateButton(){
      return (this.form.ownerId && this.form.percentage);
    }
  },
  methods:{
    ...mapActions(['fetchBudget','fetchRegion','getRegionTargets','createTargetForRegion','updateTargetForRegion','fetchAllUsers']),
    ...mapMutations(['updateLoader']),
    goBack(){
      this.$router.go(-1);
    },
    cleanForm(){
      this.form = {}
      this.modal = true;
      this.regionState = false;
    },
    redirectToTerritory(){
      if(!this.$route.params.id && !this.region.id){
        this.$toast.error('Make sure all inputs are ticked');
        return true;
      }
      this.$router.push({path: `/admin/budgets/${this.$route.params.id}/regions/${this.region.id}/territories/targets`})
    },
    async getBudgets(){
      try {
        const res = await this.fetchBudget();
        this.budgets = res.data
        console.log(res)
      } catch (err) {
        this.$toast.error(err.response.data.error.message);
      }
    },
    edit(target){
      this.regionState = true;
      this.modal = true;
      if(target){
        this.form.id = target.id;
        this.form.percentage = target.percentage;
        this.form.ownerId = target.owner.id;
      }
    },
    async getRegion(page = 1){
      this.updateLoader(true);
      try {
        const res = await this.fetchRegion({page});
        this.regions = res.data
        this.updateLoader(false);
      } catch (err) {
        if(err.response.status === 401) {
          // console.log(err.response.status)
          this.$toast.error(`Your session has expired please sign in again.`);
          this.logout();
        }
      }
    },
    async handleCreate(){
      if(this.form.percentage > 100){
        this.$toast.error('You cannot assign more than the available percentage.');
        return true
      }
      this.updateLoader(true)
      try {
        this.modal = false;
        this.form.id = this.$route.params.id;
        const res = await this.createTargetForRegion(this.form);
        console.log(res)
        this.$toast.success('Successfully created');
        this.fetchTargets();
        this.updateLoader(false)
      } catch (err) {
        this.$toast.error(err.response.data.error.message);
        this.updateLoader(false)
      }
    },
    async handleUpdate(){
      if(this.form.percentage > 100){
        this.$toast.error('You cannot assign more than the available percentage.');
        return true
      }
      this.updateLoader(true)
      try {
        this.modal = false;
        const res = await this.updateTargetForRegion(this.form);
        console.log(res)
        this.$toast.success('Successfully created');
        this.fetchTargets();
        this.updateLoader(false)
      } catch (err) {
        this.$toast.error(err.response.data.error.message);
        this.updateLoader(false)
      }
    },
    async fetchTargets(){
      this.updateLoader(true)
      try {
        const res = await this.getRegionTargets({id: this.$route.params.id})
        this.allocated = res.data.allocationSummary.allocated;
        this.unallocated = res.data.allocationSummary.unallocated;
        this.achievement = res.data.achievement;
        this.targets = res.data.targets;
        // console.log(res.data)
        this.updateLoader(false)
        // console.log(res)
      } catch (err) {
        this.$toast.error(err.response.data.error.message);
        this.updateLoader(false)
      }
    },
    async getUsers(data = '',page = 1){
      this.updateLoader(true);
      try {
        const res = await this.fetchAllUsers({email:this.search,role:'rsm',page});
        this.users = res.data
        this.showFilter = false;
        this.updateLoader(false);
      } catch (err) {
        if(err.response.status === 401) {
          console.log(err.response.status)
          this.$toast.error(`Your session has expired please sign in again.`);
          this.logout();
        }
        this.updateLoader(false);
      }
      // console.log(res)
    },
  },
  async mounted() {
    this.fetchTargets();
    this.getUsers();
    this.getRegion();
    this.getBudgets();
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
