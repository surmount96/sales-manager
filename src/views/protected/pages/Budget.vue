<template>
  <div>
    <section class="bg-white border border-gray rounded-md" style="min-height:50vh">
      <div class="h-16 shadow p-3 flex items-center justify-between">
        <div>
          <h4 class="font-semibold">Budgets</h4>
        </div>
        <div class=" flex">

          <div class="relative" v-show="createPermission || role === 'SUPER_ADMIN'">
            <button @click="createBudgetModal = true" class="flex items-center py-2 px-3 text-medium border border-gray rounded mx-3 focus:outline-none">
              <i class=""></i>
              <span class="ml-2">Create Budget</span>
            </button>

          </div>
        </div>
      </div>

      <table class="table-auto w-full">
        <tr class="bg-gray-400 font-semibold">
          <td class="py-4 text-medium px-3 ">Period</td>
          <td class="py-4 text-medium px-3">Value</td>
          <td class="py-4 text-medium px-3">Type</td>
          <td class="py-4 text-medium px-3">Action</td>
        </tr>
        <tr class="border-b border-gray text-gray-base" v-for="budget in budgets" :key="budget.id">
          <td class="py-4 text-medium px-3">{{ budget.year }}-{{ $filters.convertMonth(budget.month) }}</td>
          <td class="py-4 text-medium px-3">{{ numeralFormat(budget.value) }}</td>
          <td class="py-4 text-medium px-3">{{ budget.type.name }}</td>
          <td class="py-4 text-medium px-3 flex flex-wrap">
            <router-link :to="`/user/budgets/${budget.id}/regions/targets`">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-100" viewBox="0 0 20 20" fill="currentColor">-->
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
              </svg>
            </router-link>
            <button v-show="showPermission || role === 'SUPER_ADMIN'" @click="edit(budget)" class="text-blue-dark ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" v-show="updatePermission || role === 'SUPER_ADMIN'" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
              </svg>
            </button>
            <button @click="confirmDelete(budget.id)" v-show="deletePermission || role === 'SUPER_ADMIN'" class="focus:outline-none ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </td>
        </tr>
      </table>
    </section>
    <vue-final-modal
        v-model="createBudgetModal"
        classes="modal-container"
        content-class="modal-content"
    @closed="cancelModal">
      <div class="">
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1"> Budget Value</label>
          <input @input="formatValue" v-model="form.value" type="text" placeholder="Enter budget value" class="py-2 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">
          <small class="text-red-dark">{{ errors['value'] }}</small>
        </div>
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1"> Month</label>
          <select v-model="form.month" class="py-2 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">
            <option v-for="month in months" :key="month.id" :value="month.value">{{ month.name }}</option>
          </select>
          <small class="text-red-dark">{{ errors['month'] }}</small>
        </div>
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1"> Year</label>
          <select v-model="form.year" class="py-2 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">
            <option :value="years">{{ years }}</option>
            <option :value="years+1">{{ years+1 }}</option>
          </select>
          <small class="text-red-dark">{{ errors['year'] }}</small>
        </div>
        <div class="my-3">
          <label class="text-medium font-normal text-gray-base mb-1"> Budget types</label>
          <select v-model="form.budgetTypeId" class="py-2 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">
            <option v-for="type in budgetTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
          </select>
          <small class="text-red-dark">{{ errors['value'] }}</small>
        </div>
        <button @click="cancelModal" class="border border-blue-base py-2 px-8 text-medium rounded-md focus:outline-none mx-2">
          Cancel
        </button>
        <button @click.prevent="budgetState ? handleBudgetUpdate() : handleBudgetCreation()" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none ml-4">
            <span v-if="!budgetState">
                Create Budget
            </span>
          <span v-else>
            Update budget
          </span>
        </button>
      </div>

    </vue-final-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import permissions from "../../../permissions";
import catcher from "@/mixins/catcher";

const PR = permissions;
const { mapMutations,mapActions,mapGetters } = createNamespacedHelpers('auth');
import months from "../../../months";


export default {
name: "Budget",
  data(){
    return {
      showFilter:false,
      createBudgetModal:false,
      budgetState:false,
      errors:{},
      budgetTypes:{},
      budgets:{},
      months:'',
      years:'',
      form:{
        id:'',
        month:'',
        year:'',
        value:0,
        budgetTypeId:''
      },
    };
  },
  mixins:[
    catcher
  ],
  async mounted(){
    this.getBudgets();
    this.getBudgetTypes();
    this.months = months;
    let date = new Date();
    this.years = date.getFullYear();

    // const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    //   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    //
    // console.log(months[6]);
  },
  computed:{
    ...mapGetters(['role']),
    updatePermission(){
      return PR.budgetUpdatePermission(this.$store.state.auth.user.role.permissions);
    },
    indexPermission(){
      return PR.budgetIndexPermission(this.$store.state.auth.user.role.permissions);
    },
    createPermission(){
      return PR.budgetCreatePermission(this.$store.state.auth.user.role.permissions);
    },
    deletePermission(){
      return PR.budgetDeletePermission(this.$store.state.auth.user.role.permissions);
    },
    showPermission(){
      return PR.budgetShowPermission(this.$store.state.auth.user.role.permissions);
    },
  },
  methods:{
    ...mapActions(['logout','fetchBudget','fetchBudgetTypes','deleteSingleBudgets','storeBudget','updateSingleBudgets']),
    ...mapMutations(['updateLoader']),
    cancelModal(){
      this.createBudgetModal = false
      this.form = {};
    },
    formatValue(){
      this.form.value = this.changeValue(this.form.value.replace(',',''));
    },
    changeValue(value){
      return this.numeralFormat(value)
    },
    convertValue(value){
      return value ?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "")
    },
    async getBudgets(page =1){
      this.updateLoader(true)
      try {
        const res = await this.fetchBudget({page,size:10});
        this.budgets = res.data
        this.updateLoader(false)
        console.log(res)
      } catch (err) {
        if(err.response.status === 401) {
          // console.log(err.response.status)
          this.$toast.error(`Your session has expired please sign in again.`);
          this.logout();
          return
        }
        this.updateLoader(false)
        this.errorCatchy(err)
      }
    },
    async getBudgetTypes(){
      try {
        const res = await this.fetchBudgetTypes();
        this.budgetTypes = res.data
        // console.log(res)
      } catch (err) {
        this.errorCatchy(err)
      }
    },
    edit(budget){
      this.budgetState = true;
      this.createBudgetModal = true;
      if(budget){
        this.form.id = budget.id;
        this.form.value= budget.value;
        this.form.month= budget.month;
        this.form.year= budget.year;
        this.form.budgetTypeId= budget.type.id;
      }
    },
    async handleBudgetCreation(){
      try {
        const params={
          month:this.form.month,
          year:this.form.year,
          value:this.form.value.replace(/,/g, ""),
          budgetTypeId:this.form.budgetTypeId,
        };
        const res = await this.storeBudget(params)
        this.form = {};
        this.$toast.success('Operation Successful!');
        this.getBudgets()
        this.createBudgetModal = false
      } catch (err) {
        this.$toast.error(err.response.data.error.message);
      }
    },
    async handleBudgetUpdate(){
      try {
        const res = await this.updateSingleBudgets(this.form)
        this.form = {};
        this.$toast.success('Budget  Successfully updated!');
        this.budgetState = false
        this.createBudgetModal = false
        this.getBudgets()
      } catch (err) {
        this.$toast.error(err.response.data.error.message);
      }
    },
    confirmDelete(id){
      this.$confirm('This will delete the budget. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.handleBudgetDelete(id)
      }).catch(() => {
        this.$message({
          type: 'danger',
          message: 'Delete canceled'
        });
      });
    },
    async handleBudgetDelete(id){
      try {
        const params = {
          id: id
        }
        const res = await this.deleteSingleBudgets(params)
        this.$toast.success('Budget Successfully deleted!');
        this.getBudgets()
      } catch (err) {
        this.$toast.error(err.response.data.error.message);
      }
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
