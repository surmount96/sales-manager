<template>
    <div>
         <section class="bg-white border border-gray rounded-md" style="min-height:50vh">
            <div class="h-16 shadow p-3 flex items-center justify-between">
                <div>
                    <h4 class="font-semibold">Regions</h4>
                </div>
                <div class="flex items-center">
                  <button @click="open('Region')" class="py-2 px-3 text-medium focus:outline-none border border-gray bg-white rounded-md mx-2 flex items-center">
                    <i class="ri-dashboard-line mr-2 ri-fw"></i>
                    Create Region
                  </button>

<!--                  <button @click="open('Territory')" class="py-2 px-3 text-medium focus:outline-none border border-gray bg-white rounded-md mx-2 flex items-center">-->
<!--                    <i class="ri-dashboard-line mr-2 ri-fw"></i>-->
<!--                    Create Territories-->
<!--                  </button>-->
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
                          {{ region.regionManager ? region.regionManager.email : ' - '}}
                          <span v-if="region.regionManager">
                              {{ region.regionManager.firstName !== null ? '('+region.regionManager.firstName+' '+ region.regionManager.lastName+')' : ' ' }}
                          </span>
                        </td>
                      <td class="py-4 text-medium px-3 flex flex-wrap items-center">
                        <router-link :to="'/admin/region/'+region.id" class="text-blue-100">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                          </svg>
                        </router-link>
                        <button @click="regionManagement(region)" class="text-blue-dark ml-4">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                          </svg>
                        </button>
<!--                        <button class="text-red-default ml-4">-->
<!--                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">-->
<!--                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />-->
<!--                          </svg>-->
<!--                        </button>-->
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
            <label class="text-medium font-normal text-gray-base mb-1">Assign a user</label>
            <select v-model="region.userId" placeholder="Enter your fullname" class="py-3 px-2 text-medium text-gray-base rounded-md focus:outline-none border border-gray w-full">
              <option>select user to map</option>
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

      <general-modal :option="option" :formInput="form" :states="states" :regions="regions"/>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Multiselect from '@vueform/multiselect';
import GeneralModal from '@/components/ui/modal/GeneralModal.vue';
import Pagination from "@/components/Pagination";

const { mapMutations,mapActions } = createNamespacedHelpers('auth');
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
              regionManagerId:''
            },
            message:'Create bulk target',
            errors:[],
            editRegion: false,
            option:{
            },
            states:{},
            rsmUsers:{}
        };
    },
    components:{
      GeneralModal,
      Multiselect,
      Pagination
    },
    computed:{
      activateButton() {
        return (this.region.name && this.region.userId && this.region.stateCodes);
      }
    },
    methods:{
        ...mapActions(['fetchRegion','fetchTerritory','fetchAllUsers','logout','state','changeRegion','createBulkTarget']),
        ...mapMutations(['updateLoader','toggleUserModal','showModalDetails']),
        cancelModal(){
          this.region = {}
          this.editRegion= false
        },
        async getRegion(page = 1){
            this.updateLoader(true);
            try {
                const res = await this.fetchRegion({page, size:10});
                this.regions = res.data
                this.meta = res.meta
                this.updateLoader(false);
            } catch (err) {
                if(err.response.status === 401) {
                    console.log(err.response.status)
                    this.$toast.error(`Your session has expired please sign in again.`);
                    this.logout();
                }
            }
        },
        async territory(region){
          // console.log(region)
          this.updateLoader(true);
          try {
            const res = await this.fetchTerritory({id: region.id});
            // console.log(res)
            this.territories = res.data
            this.updateLoader(false);
            this.showModal = true
          } catch (err) {


          }
          // console.log(res)
        },
        async assignRegionUser() {
          try{
            const res = await this.fetchAllUsers({role:'RSM',email:'',size:100,page:1})
            this.rsmUsers = res.data;
            console.log(res)
          } catch(err) {
            this.errors = err.response.data.error.reasons;
          }
        },
        async allState(){
          try{
            const res = await this.state();
            this.states = res.data;
          } catch(err) {
            console.log(err.response)
            this.errors = err.response.data.error.reasons;
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
      regionManagement(user){
        this.editRegion = true;
        // console.log(user)
        if(user){
          this.region.id = user.id
          this.region.name = user.name
          this.region.userId = user.regionManager ? user.regionManager.id : ''
          this.region.stateCodes = user.states.map((state)=> {
            return state.code;
          })

          // this.region.stateCodes.push(saveObj)

          // console.log('========================')
          // console.log(this.region.stateCodes)
          // console.log(this.region)
          // console.log('========================')
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
          if(err.response.status === 422) {
            this.errors = err.response.data.error.reasons;
          }
          if(err.response.status === 400) {
            this.$toast.error(err.response.data.error.message);
          }
          this.message = 'Update Region';
          this.$toast.error(err.response.data.error.message);
        }
      },
        
    },
    async mounted(){
        this.getRegion();
        this.allState()
      this.assignRegionUser()
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
