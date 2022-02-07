<template>
  <div class="">
    <section class="bg-white border border-gray rounded-md" style="min-height:50vh">
      <div class="h-16 shadow p-3 flex items-center justify-between">
        <div>
          <h4 class="font-semibold">Budgets type</h4>
        </div>
        <div class="">
          <div class="flex">
            <button v-show="create || role === 'SUPER_ADMIN'" @click="createBudgetModal = true" class="flex items-center py-2 px-3 text-medium border border-gray rounded mx-3 focus:outline-none">
              <i class=""></i>
              <span class="ml-2">Create budget type</span>
            </button>

          </div>
        </div>
      </div>
      <table class="table-auto w-full">
        <tr class="bg-gray-400 font-semibold">
          <td class="py-4 text-medium px-3 ">Name</td>
          <td class="py-4 text-medium px-3">
            <span v-show="update || role === 'SUPER_ADMIN'">Action</span>
          </td>
        </tr>
        <tr class="border-b border-gray text-gray-base" v-for="type in types" :key="type.id">
          <td class="py-4 text-medium px-3">{{ type.name }}</td>
          <td class="py-4 text-medium px-3">
            <button v-show="update || role === 'SUPER_ADMIN'" @click="edit(type)" class="text-blue-dark ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
              </svg>
            </button>
            <button v-show="deleteB || role === 'SUPER_ADMIN'" @click="confirmDelete(type.id)" class="focus:outline-none ml-4">
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
          <label class="text-medium font-normal text-gray-base mb-1"> Budget Type</label>
          <input v-model="form.name" type="text" placeholder="Enter budget value" class="py-2 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">
          <small class="text-red-dark">{{ errors['name'] }}</small>
        </div>
        <button @click="cancelModal" class="border border-blue-base py-2 px-8 text-medium rounded-md focus:outline-none mx-2">
          Cancel
        </button>
        <button @click.prevent="budgetState ? handleBudgetUpdate() : handleBudgetCreation()" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none ml-4">
            <span v-if="!budgetState">
                Create Budget type
            </span>
          <span v-else>
            Update Budget type
          </span>
        </button>
      </div>

    </vue-final-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapMutations,mapActions,mapGetters } = createNamespacedHelpers('auth');
import permissions from "@/permissions";
import catcher from "@/mixins/catcher";

const PR = permissions;
export default {
  name: "Permission",
  data(){
    return{
      types:{},
      budgetState:false,
      createBudgetModal:false,
      errors:{},
      form:{
        id:'',
        name:''
      }
    };
  },
  computed:{
    ...mapGetters(['role']),
    create(){
      return PR.budgetTypeCreatePermission(this.$store.state.auth.user.role.permissions)
    },
    update(){
      return PR.budgetTypeUpdatePermission(this.$store.state.auth.user.role.permissions)
    },
    deleteB(){
      return PR.budgetTypeDeletePermission(this.$store.state.auth.user.role.permissions)
    },
  },
  mixins:[
    catcher
  ],
  methods:{
    ...mapActions(['logout','deleteSingleBudgetTypes','updateSingleBudgetTypes','storeBudgetTypes','fetchPermission','fetchBudgetTypes','storeBudgetTypes']),
    ...mapMutations(['updateLoader']),
    cancelModal(){
      this.createBudgetModal = false
      this.form = {};
    },
    async getBudgetTypes(){
      this.updateLoader(true)
      try {
        const res = await this.fetchBudgetTypes();
        this.types = res.data
        this.updateLoader(false)
        console.log(res)
      } catch (err) {
        this.updateLoader(false)
        if(err.response.status === 401) {
          // console.log(err.response.status)
          this.$toast.error(`Your session has expired please sign in again.`);
          this.logout();
          return
        }
        this.errorCatchy(err)
      }
    },
    edit(budget){
      this.budgetState = true;
      this.createBudgetModal = true;
      this.form.id = budget.id;
      this.form.name= budget.name;
    },
    async handleBudgetCreation(){
      try {
        const res = await this.storeBudgetTypes({name: this.form.name})
        this.form = {};
        this.$toast.success('Operation Successful!');
        this.createBudgetModal = false
        this.getBudgetTypes()
      } catch (err) {
        this.errorCatchy(err)
      }
    },
    async handleBudgetUpdate(){
      try {
        const res = await this.updateSingleBudgetTypes(this.form)
        this.form = {};
        this.$toast.success('Budget  Successfully updated!');
        this.budgetState = false
        this.createBudgetModal = false
        this.getBudgetTypes()
      } catch (err) {
        this.errorCatchy(err)
      }
    },
    confirmDelete(id){
      this.$confirm('This will delete the budget type. Continue?', 'Warning', {
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
        const res = await this.deleteSingleBudgetTypes({id})
        this.$toast.success('Budget Successfully deleted!');
        this.getBudgetTypes()
      } catch (err) {
        this.errorCatchy(err)
      }
    },
  },
  mounted() {
    this.getBudgetTypes()
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
