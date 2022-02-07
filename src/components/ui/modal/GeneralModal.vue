<template>
    <div>
        <vue-final-modal 
        v-model="$store.state.auth.modal"
        classes="modal-container"
        content-class="modal-content"
        @closed="cancelRegionModal">
            <div class="pb-3 border-b border-gray">
                <h5 >Create {{ option.title }}</h5>
            </div>
            <form action=""
            class="flex flex-col justify-between"
            style="min-height:30vh">
                <div>
                    <div class="my-3" v-show="option.title == 'Territory'">
                        <div class="my-3">
                            <label class="text-medium font-normal text-gray-base mb-1">{{ option.title }} name</label>
                            <input v-model="territory.name" type="text" placeholder="Enter a region" class="py-2 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">
                            <small class="text-red-dark">{{ errors['name'] }}</small>
                        </div>
                        <div class="my-3" v-show="!show">
                            <label class="text-medium font-normal text-gray-base mb-1">Assign to a region </label>
                            <select @change="assignTerritoryUser('')" v-model="territory.region_id" placeholder="Enter your fullname" class="py-3 px-2 text-medium text-gray-base rounded-md focus:outline-none border border-gray w-full">
                                <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.name }}</option>
                            </select>
                        </div>
                        <div class="my-3" v-show="unmappedTSO.length > 0 && !show">
                          <label class="text-medium font-normal text-gray-base mb-1">Territory sales officer (TSO)</label>
                          <select v-model="territory.userId" placeholder="Enter your fullname" class="py-3 px-2 text-medium text-gray-base rounded-md focus:outline-none border border-gray w-full">
                            <option v-for="tso in unmappedTSO" :key="tso.id" :value="tso.id">{{ tso.email }} <span v-if="tso.firstName || tso.lastName">({{ tso.firstName + ' ' + tso.lastName }})</span></option>
                          </select>
                        </div>
                        <div class="my-3" v-show="unmappedTSO.length > 0 && show">
                          <label class="text-medium font-normal text-gray-base mb-1">Territory sales officer (TSO)</label>
                          <select v-model="territory.userId" placeholder="Enter your fullname" class="py-3 px-2 text-medium text-gray-base rounded-md focus:outline-none border border-gray w-full">
                            <option v-for="tso in unmappedTSO" :key="tso.id" :value="tso.id">{{ tso.email }} <span v-if="tso.firstName || tso.lastName">({{ tso.firstName + ' ' + tso.lastName }})</span></option>
                          </select>
                        </div>
<!--                        <div class="" v-show="unmappedTSO.length == 0">-->
<!--                          <p class="text-medium text-center" :class="{'text-red-dark': !territoryMessage.status }">{{ territoryMessage.message }}</p>-->
<!--                        </div>-->
                        
                    </div>
                    <div class=""  v-show="option.title == 'Region'">
                        <div class="my-3">
                            <label class="text-medium font-normal text-gray-base mb-1">{{ option.title }} name</label>
                            <input v-model="form.name" type="text" placeholder="Enter a region" class="py-2 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">
                            <small class="text-red-dark">{{ errors['name'] }}</small>
                        </div>
                        <div class="my-3">
                            <label class="text-medium font-normal text-gray-base mb-1">Assign a Regional Manager</label>
                            <select v-model="form.userId" placeholder="Enter your fullname" class="py-3 px-2 text-medium text-gray-base rounded-md focus:outline-none border border-gray w-full">
                              <option value="">Select a user</option>
                              <option v-for="rsm in rsmUsers" :key="rsm.id" :value="rsm.id">{{ rsm.email }} <span v-if="rsm.firstName || rsm.lastName">({{ rsm.firstName + ' ' + rsm.lastName }})</span></option>
                            </select>
                            <small class="text-red-dark">{{ errors['user'] }}</small>
                        </div>
                        <div class="my-3">
                            <label class="text-medium font-normal text-gray-base mb-1">Pick state</label>
                            <el-select
                                v-model="form.stateCodes"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                placeholder="Select states">
                              <el-option
                                  v-for="item in states"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.code">
                              </el-option>
                            </el-select>
                            <small class="text-red-dark">{{ errors['stateCodes'] }}</small>
                        </div>
                    </div>
              
                </div>
                <div class="flex items-center justify-end">
                    <button @click.prevent="cancelRegionModal" class="border border-blue-base py-2 px-8 text-medium rounded-md focus:outline-none mx-2">
                        Cancel
                    </button>
                    <div v-show="option.title === 'Region'">
                        <button @click.prevent="handleRegion" :disabled="!activateButton" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none ml-4">
                            <span v-show="!message">
                                Create {{ option.title }}
                            </span>
                            <span v-show="message">
                                {{ message }}
                            </span>
                        </button>
                    </div>
                    <div v-show="option.title === 'Territory'">
                        <button @click.prevent="handleTerritory" :disabled="!activateButton" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none ml-4">
                            <span v-show="!message">
                                Create {{ option.title }}
                            </span>
                            <span v-show="message">
                                {{ message }}
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        </vue-final-modal>
        <success-modal />
    </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import { createNamespacedHelpers } from 'vuex';
import SuccessModal from '@/components/ui/modal/SuccessModal'
import catcher from "../../../mixins/catcher";

const { mapActions,mapMutations } = createNamespacedHelpers('auth');

    export default{
        props:{
            modalOn: Boolean,
            option: Object,
            formInput: Object,
            states: Array,
            regions: Array,
            rsmUsers: Array,
            regionUsers: {type: Array, default: []},
            editRegion: {type: Boolean, default: false},
            region:Object,
            regionTso:{type: Array, default: []},
            show: { type: String, default: ''}
        },
        components:{
            Multiselect,
            SuccessModal
        },
        mixins:[
            catcher
        ],
        data(){
            return{
                value: null,
                status:{},
                message:'',
                options: [
                    'Batman',
                    'Robin',
                    'Joker',
                ],
                datatest:[],
                errors:[],
                territoryMessage: {
                  status: true,
                  message: 'Kindly select region.'
                },
                tsoUsers:[],
                form:{
                    name: '',
                    userId:'',
                    stateCodes: []
                },
                territory:{
                    name:'',
                    userId:'',
                    region_id:''
                }
            };
        },
        computed:{
            activateButton() {
                return (this.form.name && this.form.userId && this.form.stateCodes) || (this.territory.name && (this.territory.region_id || this.show )) ;
            },
            tsoList(){
              if(this.regionUsers.length > 0){
                return this.regionUsers.filter((item) => {
                  return item.role.name === 'TSO'
                });
              }
              return [];
            },
          unmappedTSO(){
            if(this.tsoUsers.length > 0){
              return this.tsoUsers.filter((item) => {
                return item.role.name === 'TSO'
              });
            }
            return [];
          }
        },
        methods:{
            ...mapMutations(["updateResponseStatus","updateLoader","displayMessage","showModalDetails"]),
            ...mapActions(['logRegion','unMappedAgentsToTerritory','createTerritory','userInRegion']),
            cancelRegionModal(){
              this.showModalDetails(false)
              this.form = {};
              this.territory = {};
            },
            validateName(){
                if(this.form.name){
                    this.errors['name'] = '';
                } else {
                    this.errors['name'] = 'Name can not be empty.';
                }
            },
            validateUserId(){
                if(this.form.name){
                    this.errors['user'] = '';
                } else {
                    this.errors['user'] = 'Mapping a user can not be empty.';
                }
            },
            validateState(){
                if(this.form.name){
                    this.errors['stateCodes'] = '';
                } else {
                    this.errors['stateCodes'] = 'As can not be empty.';
                }
            },
            async handleRegion(){
                this.message = "Creating region....";
                try{
                  this.form.regionManagerId = this.form.userId;
                    const res = await this.logRegion(this.form);
                    this.form = {};
                    this.showModalDetails(false)
                    this.$toast.success('Operation Successful!');
                    this.displayMessage({
                        type: 'Region',
                        success:true,
                    });
                    this.message = "Region created";
                    this.updateResponseStatus(true)
                    // console.log(res)
                } catch(err) {
                    this.errorCatchy(err)
                    this.message = 'Create region';
                }
            },
            async handleTerritory(){
                this.message = "Creating territory....";
                try{
                    if(this.show){
                      this.territory.region_id = this.show
                    }
                    this.territory.territoryOfficerId = this.territory.userId;
                    const res = await this.createTerritory(this.territory);
                    this.$toast.success('Operation Successful!');

                    this.message = "Territory created!";
                    this.showModalDetails(false)
                    // this.updateResponseStatus(true)
                    this.$router.push({path: '/user/region/'+this.territory.region_id})
                    this.territory = {};
                } catch(err) {
                    if(err.response.status === 422) {
                        this.errors = err.response.data.error.reasons;
                        this.$toast.error(err.response.data.error.reasons.lgas);
                    }
                    this.errorCatchy(err)
                    this.message = 'Create Territory';
                }
            },
            async assignTerritoryUser(data = '') {
              this.territoryMessage = {
                status: true,
                message: "Please wait while fetching users..."
              }
                try{
                    const res = await this.unMappedAgentsToTerritory({role:'TSO',id:data ? data: this.territory.region_id})
                    this.tsoUsers = res.data;
                    this.territory.userId = '';
                    if(res.data.length == 0) {
                      this.territoryMessage = {
                      status: false,
                      message: "There is no user for this territory" };
                    }
                    else {
                      const data = res.data.filter((item) => {
                        return item.role.name === 'TSO'
                      })
                      if(data.length == 0){
                        this.territoryMessage = {
                          status: false,
                          message: "There is no user for this territory" };
                      } else {
                        this.territoryMessage = '';
                      }
                    }
                } catch(err) {
                  this.errorCatchy(err)
                  this.territoryMessage = {
                    status: false,
                    message: "There is no user for this region" };
                }
            },
            closeModal(){
                this.updateResponseStatus(false)
            },
        },
        async created(){
          if(this.show) {
            // this.tsoUsers = this.regionTso;
            this.assignTerritoryUser(this.show)
          }
        },
        async mounted(){
          //
        },
    }
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style>
.el-select{
  display: block;
}
el-range-editor.is-active, .el-range-editor.is-active:hover, .el-select .el-input.is-focus .el-input__inner {
  border-color: #DEDEDE;
}
</style>
