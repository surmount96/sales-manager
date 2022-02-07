<template>
    <div>
        <div class="flex flex-wrap items-center">
            <button @click="toggleUserModal(true)" class="py-2 px-3 text-medium focus:outline-none border border-gray bg-white rounded-md flex items-center">
                <i class="ri-dashboard-line mr-2 ri-fw"></i>
                Profile a User
            </button>
            <button @click="open('Region')" class="py-2 px-3 text-medium focus:outline-none border border-gray bg-white rounded-md mx-2 flex items-center">
                <i class="ri-dashboard-line mr-2 ri-fw"></i>
                Create Region
            </button>
            <button @click="open('Territory')" class="py-2 px-3 text-medium focus:outline-none border border-gray bg-white rounded-md mx-2 flex items-center">
                <i class="ri-dashboard-line mr-2 ri-fw"></i>
                Create Territories
            </button>
<!--            <button @click="onboardModal(true)" class="py-2 px-3 text-medium focus:outline-none border border-gray bg-white rounded-md mx-2 flex items-center">-->
<!--                <i class="ri-user-line mr-2 ri-fw"></i>-->
<!--                Onboard Agent-->
<!--            </button>-->
        </div>
        <div class="flex flex-wrap my-4">
            <div class="lg:w-1/3 md:w-1/3 sm:w-1/2 w-full mb-4">
                <div class="bg-white mx-2 shadow-sm rounded-md p-3">
                    <div class="flex justify-between">
                        <div class="">
                            <img src="/icons/target.svg" alt="">
                        </div>
<!--                        <select class="focus:outline-none border border-gray text-small h-8 w-32 rounded-md py-2">-->
<!--                            <option v-for="month in months" :value="month.value">{{ month.name }}</option>-->
<!--                        </select>-->
                    </div>
                    <p class="text-small text-gray my-3">All Users</p>
                    <h4 class="text-h4 text-blue-light">{{ summary.user }}</h4>
                    <hr class="border-4 my-2 border-blue-deep rounded-md">
                </div>
            </div>
            <div class="lg:w-1/3 md:w-1/3 sm:w-1/2 w-full mb-4">
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
            <div class="lg:w-1/3 md:w-1/3 sm:w-1/2 w-full mb-4">
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
            <div class="lg:w-1/3 md:w-1/3 sm:w-1/2 w-full mb-4">
                <div class="bg-white  shadow-sm rounded-md p-3">
                    <div class="flex justify-between">
                        <div class="">
                            <img src="/icons/users.svg" alt="">
                        </div>
<!--                        <select class="focus:outline-none border border-gray text-small h-8 w-32 rounded-md py-2">-->
<!--                            <option v-for="state in states" :value="state.code" :key="state.id">{{ state.name }}</option>-->
<!--                        </select>-->
                    </div>
                    <p class="text-small text-gray my-3">Total Agents</p>
                    <h4 class="text-h4 text-blue-light">{{ summary.agent }}</h4>
                    <hr class="border-4 my-2 border-blue-deep rounded-md">
                </div>
            </div>
        </div>

<!--        <section class="bg-white border border-gray rounded-md" style="min-height:50vh">-->
<!--            <div class="h-16 shadow p-3 flex items-center justify-between">-->
<!--                <div>-->
<!--                    <h4 class="font-semibold">Transaction Summary</h4>-->
<!--                </div>-->
<!--                <div class=" flex">-->
<!--                    <div class="flex items-center">-->
<!--                        <datepicker v-model="test" class="focus:outline-none border border-gray py-2 px-3 text-medium rounded-md"></datepicker>-->
<!--                        <datepicker v-model="test" class="focus:outline-none border border-gray py-2 px-3 text-medium rounded-md"></datepicker>-->
<!--                        <button class="py-2 px-3 bg-gray-500 rounded ml-2">-->
<!--                            <img src="/icons/black-filter.svg" alt="">-->
<!--                        </button>-->
<!--                    </div>-->
<!--                    <button class="flex items-center py-2 px-3 text-medium border border-gray rounded mx-3">    -->
<!--                        <img src="/icons/black-filter.svg" alt="">-->
<!--                        <span class="ml-2">Filter by</span>-->
<!--                    </button>-->
<!--                    <button class="flex items-center py-2 px-3 text-medium border border-gray rounded mx-3">-->
<!--                        <img src="/icons/download.svg" alt="">-->
<!--                        <span class="ml-2">Download</span>-->
<!--                    </button>-->
<!--                </div>-->
<!--            </div>-->
<!--&lt;!&ndash;            <sle-table />&ndash;&gt;-->
<!--        </section>-->
        <user-modal />
        <general-modal :option="option" :formInput="form" :states="states" :regions="regions"/>  
        <onboard-modal />
    </div>
</template>

<script>
import GeneralModal from '@/components/ui/modal/GeneralModal.vue';
import OnboardModal from '@/components/ui/modal/OnboardModal.vue';
import Table from '@/components/ui/table/TransactionalTable.vue';
import UserModal from '@/components/ui/modal/UserModal';
import { createNamespacedHelpers } from 'vuex';

const { mapMutations,mapActions } = createNamespacedHelpers('auth');
import months from "../../../months";
export default {
    name: 'admin-dashboard',
    data(){
        return {
            test:new Date(),
            showModal:false,
            option:{
            },
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
          summary:{}
        };
    },
    methods:{
        ...mapMutations(["updateLoader","updateResponseStatus","showModalDetails","onboardModal","toggleUserModal"]),
        ...mapActions(['fetchAllUsers','countAgent','countingTerritory','fetchRegion','state','logout','createSingleUser','territory']),
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
            // console.log(this.user.region)
            const res = await this.territory(this.user.region);
            this.territories = res.data
            // console.log(res);
        },
        async territorySummary(e) {
          this.updateLoader(true)
          try {
            const res = await this.countingTerritory({id:e.target.value});
            // console.log(res)
            this.summary.territory = res.data.territoryCount
            this.updateLoader(false)
          }catch(err) {
              this.$toast.error(err.response.data.error.message);
            this.updateLoader(false)
          }
        },
        async agentsCount() {
          try {
            const res = await this.countAgent();
            this.summary =res.data.count

          }catch(err) {
            this.$toast.error(err.response.data.error.message);
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
        async getRegions(page =1) {
            try {
                const res = await this.fetchRegion({size:1000,page});
                this.regions = res.data;
                console.log(localStorage.getItem(''))
            } catch(err) {
                if(err.response.status === 401) {
                    // console.log(err.response.status)
                    this.$toast.error(`Your session has expired please sign in again.`);
                    this.logout();
                }
            }
        }

    },
    async mounted() {
        this.allState()
      this.months = months;
      this.agentsCount()
        // setTimeout(() => {
      this.getRegions()
        // },1000)
    },
    components:{
        GeneralModal,
        OnboardModal,
        SleTable: Table,
        UserModal
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
