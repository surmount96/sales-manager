<template>
  <div class="bg-white shadow-sm rounded-sm p-5">
    <h4 class="font-semibold">Permission Management</h4>
    <div class=" w-1/2 my-5">
        <div class="">
          <label for="" class="text-body-2">Assign permission to roles</label>
          <el-select
              v-model="form.userId"
              filterable
              allow-create
              default-first-option
              @change="role"
              placeholder="Select states">
            <el-option
                v-for="item in roles"
                :key="item.id"
                :label="item.description"
                :value="item.id">
            </el-option>
          </el-select>
        </div>
    </div>
    <div class="text-medium" v-show="currentRole">
      <p>
        <span v-if="currentRole == 'HOS'">
          Tick all under Agent, Region and Region Target, Dashboard,Uploaded File and User, Territory and Territory Target, User Target
        </span>
        <span v-else-if="currentRole == 'ASS'">Tick the following</span>
        <span v-else-if="currentRole == 'SALES_REP'">Tick the following</span>
        <span v-else-if="currentRole == 'RSM'">
          Tick all under Agent, Dashboard, Territory and Territory Target, User Target
        </span>
        <span v-else-if="currentRole == 'TSO'">Tick all under Dashboard</span>
        <span v-else>Tick the following</span>
      </p>
<!--      {{permissionOptions}}-->
      <div class="flex flex-wrap">
        <div class="lg:w-1/3 md:w-1/3 w-full" v-for="n in permissionOptions" :key="n.id">
          <p class="flex items-center py-2">
            <img src="/img/verify.png" class="w-4 mr-2" alt="">
            {{ n }}
          </p>
        </div>
      </div>
    </div>
    <div class="border-b border-gray"></div>
    <div class="my-5">
        <div class="flex flex-wrap">
          <div class="lg:w-1/3 md:w-1/3 sm:w-1/2 w-full mb-4" v-for="permit in permissions" :key="permit.id">
            <h4 class="text-body-2 mb-3 font-semibold">{{ permit.name }}</h4>
            <div class="">
              <div class="flex cursor-pointer text-medium items-center mb-2" v-for="u in permit.permissions" :key="u.id">
                <input type="checkbox" v-model="form.permissions" class="py-3 px-4" :value="u.id" :id="u.id">
                <label :for="u.id" class="pl-3">{{ u.description }}</label>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div class="">
      <button @click="updatePermission" class="bg-blue-base py-3 px-10 text-medium text-white rounded-sm">Save</button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapMutations,mapActions } = createNamespacedHelpers('auth');

export default {
  name: "Permission",
  data(){
    return {
      test:'',
      actions:[
        {
          ADMIN: [
              'View Dashboard',
              'Create User roles and Users',
              'Create Regions, Territories',
              'Onboard Sales staff',
              'Onboard Agents',
              'Map/Unmap agents to Sales officers'
          ]
        },
        {
          HOS: [
            'Show Details of a single user (staff)',
            'List all area sales supervisor\'s targets',
            ' List all budget types',
            'Create a budget type',
            'List all budgets',
            'Create a budget',
            'Create a budget type',
            'Show details of a budget',
            'Update a budget',
            'Update a budget type',
            'List all regions\' targets',
            'List all Users (Staff)',
            'User bulk upload',
            'List all uploaded files',
            'Show a single uploaded file',
          ]
        },
        {
          RSM: [
            'List all area sales supervisor\'s targets',
            'List all budget types',
            'Create a budget type',
            'List all budgets',
            'Create a budget',
            'Show details of a budget',
            'Update a budget',
            'Update a budget type',
            'List all regions\' targets',
            'List all Users (Staff)',
            'User bulk upload',
            'List all uploaded files',
            'Show a single uploaded file',
            'Show Details of a single user (staff)'

          ]
        },
        {
          ASS: [
            'List all area sales supervisor\'s targets',
            'List all budget types',
            'List all budgets',
            'Show details of a budget',
            'List all regions\' targets',
            'List all Users (Staff)',
            'User bulk upload',
            'List all uploaded files',
            'Show a single uploaded file',
            'Show Details of a single user (staff)'
          ]
        },
        {
          TSO: [
            'Show details of a budget',
            'Show Details of a single region',
            'List all budget types',
            'Show Details of a single territories',
            'Show Details of a single user (staff)',
            'List all budget',
            'Show Details of a single user (staff)'
          ]
        },
        {
          SALES_REP: [
            'List all budget',
            'List all budget types',
            'Count of territories under a region',
            'Show Details of a single user (staff)'
          ]
        },
      ],
      permissionOptions:'',
      states:[],
      agent:{},
      currentRole:'',
      region:{},
      territory:{},
      user:{},
      roles:{},
      budget:{},
      budgetType:{},
      permissions:{},
      form:{
        userId:'',
        permissions:[]
      }
    };
  },
  methods:{
    ...mapActions(['fetchPermissionModules','showRole','fetchRole','assignPermissionToRole','logout']),
    ...mapMutations(['updateLoader']),
    async getPermissionModules(){
      this.updateLoader(true);
      try {
        const res = await this.fetchPermissionModules();
        this.permissions = res.data
        // this.budgetType = res
        // console.log(res.data.Budget)
        this.updateLoader(false);
      } catch (err) {
        this.$toast.error(err.response.data.error.message);
        if(err.response.status === 401) {
          // console.log(err.response.status)
          this.$toast.error(`Your session has expired please sign in again.`);
          this.logout();
        }
      }
    },
    async updatePermission(){
      // this.$toast.error(`You\'ve assigned any role`);
      if(this.form.permissions.length > 0 && this.form.userId){
        try {
          this.updateLoader(true);
          const params = {
            id: this.form.userId,
            permissionIds: this.form.permissions
          }
          const res = await this.assignPermissionToRole(params)
          this.$toast.success(`You\'ve successfully assigned permission to this role`);
          console.log(res)
          // this.form = {};
          this.updateLoader(false);
        } catch (e) {
          this.$toast.error(e.response.data.error.message);
          this.updateLoader(false);
        }
      } else {
        this.$toast.error(`You\'ve not assigned any role, Please check your fields`);
        return true
      }
    },
    async getRole(){
      try{
        const res = await this.fetchRole();
        this.roles = res.data
        // console.log(res)
      } catch(err) {
        if(err.response.status === 400) {
          this.$toast.error(err.response.data.error.message);
        }
        if(err.response.status === 422) {
          this.errors = err.response.data.error.reasons;
          this.$toast.error(err.response.data.error.message);
        }
        this.message = '';
        // console.log(err.response)
      }
    },
    async role(e){
      this.updateLoader(true);
      this.form.permissions = []
      try{
        const res = await this.showRole({id: this.form.userId});
        // this.form.permissions = ['426d15b1-131e-4cd4-b1b1-afe58c42b476','f7d99a41-55e5-4ed5-b131-5f332d361033']
        // console.log(res)
        this.currentRole = res.data.name;
        const saveKeys = Object.keys(res.data.permissions);
        const state = res.data.permissions
        this.updateLoader(false);
        let test = this.actions.map(item => {
          return item[this.currentRole]
        })
        let d = test.filter(item => {
          return item !== undefined
        })
        console.log(test)
        console.log(d)
        this.permissionOptions = d[0]
        saveKeys.forEach((item) => {
          if(state && state[item]){
            this.convertToArray(state[item])
          }
        })
      } catch(err) {
        if(err.response.status === 400) {
          this.$toast.error(err.response.data.error.message);
        }
        if(err.response.status === 422) {
          this.errors = err.response.data.error.reasons;
          this.$toast.error(err.response.data.error.message);
        }
        this.message = '';
        this.updateLoader(false);
        // console.log(err.response)
      }
    },
    convertToArray(item){
      // console.log(item)
      // console.log(item.length)
      let data = [];

      for(let i = 0;i < item.length; i++){
        this.form.permissions.push(item[i].id)
      }

      // console.log(this.form.permissions )
    }
  },
  mounted() {
    this.getPermissionModules()
    this.getRole()
  }
}
</script>

<style>
.el-select{
  display: block;
}
</style>
