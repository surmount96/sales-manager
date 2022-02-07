<template>
    <div>
        <vue-final-modal 
        v-model="$store.state.auth.userModal"
        classes="modal-container"
        content-class="modal-content"
        @closed="cancelUserModal">
            <div class="pb-3 border-b border-gray">
                <h5 >Profile User</h5>
            </div>
            <div class="" v-show="type">
              <p class="text-medium my-5">PLEASE SELECT TYPE OF USER TO PROFILE</p>
              <div class="my-3">
                <label class="text-medium font-normal text-gray-base mb-1">TYPE</label>
                <select @change="showType" v-model="type_status" placeholder="Enter your fullname" class="py-3 px-2 text-medium text-gray-base rounded-md focus:outline-none border border-gray w-full">
                  <option>Pick a type</option>
                  <option value="CDL">CDL</option>
                  <option value="CONTRACT">CONTRACT</option>
                </select>
              </div>
            </div>
            <form action=""
            v-show="contract">
                <div class="flex justify-end">
                  <button type="button" @click="() => {contract = false; cdl=false; type=true}" class="py-2 px-4 text-medium focus:outline-none border border-gray">Switch Type</button>
                </div>
                <div class="flex">
                  <div class="my-3">
                    <label class="text-medium font-normal text-gray-base mb-1">First Name</label>
                    <input v-model="user.firstName" @keydown="validateFirstname" type="text" placeholder="Enter your email" class="py-2 px-5  text-medium text-gray-base  rounded-md focus:outline-none border border-gray w-full">
                    <small class="text-red-dark text-small">{{ errors['firstName']}}</small>
                  </div>
                  <div class="my-3 ml-2">
                    <label class="text-medium font-normal text-gray-base mb-1">Last Name</label>
                    <input v-model="user.lastName" @keydown="validateLastname" type="text" placeholder="Enter your email" class="py-2 px-5  text-medium text-gray-base  rounded-md focus:outline-none border border-gray w-full">
                    <small class="text-red-dark text-small">{{ errors['lastName']}}</small>
                  </div>
                </div>
                <div class="my-3">
                    <label class="text-medium font-normal text-gray-base mb-1">Email</label>
                  <input v-model="user.email" @keydown="validateEmail" type="text" placeholder="Enter your email" class="py-2 px-5  text-medium text-gray-base  rounded-md focus:outline-none border border-gray w-full">
                  <small class="text-red-dark text-small">{{ errors['email']}}</small>
                </div>
                <div class="my-3">
                  <label for="" class="text-medium font-normal text-gray-base mb-1 w-full">Phone number</label>
                  <input type="text" v-model="user.phoneNumbers" placeholder="Phone number(s)" class="py-2 px-5  text-medium text-gray-base  rounded-md focus:outline-none border border-gray w-full">

<!--                  <el-select-->
<!--                      v-model="user.phoneNumbers"-->
<!--                      multiple-->
<!--                      allow-create-->
<!--                      filterable-->
<!--                      default-first-option-->
<!--                      @focus="saveData"-->
<!--                      placeholder="Enter staff phone number(s)">-->
<!--                  </el-select>-->
                </div>
                <div class="my-3 hidden">
                  <label class="text-medium font-normal text-gray-base mb-1">Type</label>
                  <select v-model="user.type" @keydown="validateRole" class="py-3 px-2  text-medium text-gray-base rounded-md focus:outline-none border border-gray w-full">
                    <option value="CONTRACT">CONTRACT</option>
                  </select>
                  <small class="text-red-dark">{{ errors['type']}}</small>
                </div>
                
                <hr class="border-t border-gray my-6">
                <div class="flex items-center justify-end">
                    <button @click.prevent="cancelUserModal" class="border border-blue-base py-2 px-8 text-medium rounded-md focus:outline-none mx-2">
                        Cancel
                    </button>
                    <button @click.prevent="createUser" :disabled="!activateButton" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none ml-4">
                        {{ message }}
                    </button>
                </div>
            </form>
          <form action=""
          v-show="cdl">
            <div class="flex justify-end">
              <button type="button" @click="() => {contract = false; cdl=false; type=true}" class="py-2 px-4 text-medium focus:outline-none border border-gray">Switch Type</button>
            </div>
            <div class="my-3">
              <label class="text-medium font-normal text-gray-base mb-1">Email</label>
              <input v-model="user.email" @keydown="validateEmail" type="text" placeholder="Enter your email" class="py-2 px-5  text-medium text-gray-base  rounded-md focus:outline-none border border-gray w-full">
<!--              <small class="text-red-dark text-small">{{ errors['email']}}</small>-->
            </div>
            <div class="my-3">
              <label class="text-medium font-normal text-gray-base mb-1">Select a Role</label>
              <select v-model="user.roleId" @keydown="validateRole" placeholder="Enter your fullname" class="py-3 px-2 text-medium text-gray-base rounded-md focus:outline-none border border-gray w-full">
                <option v-for="role in usersRole" :key="role.id" :value="role.id">{{ role.description }}</option>
              </select>
              <small class="text-red-dark">{{ errors['roleId']}}</small>
            </div>
            <div class="my-3">
              <label for="" class="text-medium font-normal text-gray-base mb-1 w-full">Phone number</label>
              <input type="text" v-model="user.phoneNumbers" placeholder="Phone number(s)" class="py-2 px-5  text-medium text-gray-base  rounded-md focus:outline-none border border-gray w-full">
<!--              <el-select-->
<!--                  v-model="user.phoneNumbers"-->
<!--                  multiple-->
<!--                  filterable-->
<!--                  default-first-option-->
<!--                  allow-create-->
<!--                  placeholder="Enter staff phone number(s)">-->
<!--              </el-select>-->

            </div>
            <div class="my-3 hidden">
              <label class="text-medium font-normal text-gray-base mb-1">Type</label>
              <select v-model="user.type" @keydown="validateRole" placeholder="Enter your fullname" class="py-3 px-2 text-medium text-gray-base hidden rounded-md focus:outline-none border border-gray w-full">
                <option value="CDL">CDL</option>
              </select>
              <small class="text-red-dark">{{ errors['type']}}</small>
            </div>

            <hr class="border-t border-gray my-6">
            <div class="flex items-center justify-end">
              <button @click.prevent="cancelUserModal" class="border border-blue-base py-2 px-8 text-medium rounded-md focus:outline-none mx-2">
                Cancel
              </button>
              <button @click.prevent="createUser" :disabled="!activateButton" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none ml-4">
                {{ message }}
              </button>
            </div>
          </form>
        </vue-final-modal>
        <success-modal />

    </div>
</template>

<script>
import SuccessModal from '@/components/ui/modal/SuccessModal.vue';
import { createNamespacedHelpers } from 'vuex';

const { mapMutations,mapActions } = createNamespacedHelpers('auth');

export default {
    data(){
        return {
            status:'',
            errors:[],
            type_status: '',
            message:'Create User Profile',
            user:{
                firstName:'',
                lastName:'',
                email:'',
                roleId:'',
                type:'',
                phoneNumbers:'',
            },
          options:[],
            roles:[],
          type: true,
          cdl:false,
          contract:false
        };
    },
    computed:{
        activateButton() {
            return ((this.user.email && this.user.roleId && this.user.type) || (this.user.type && this.user.email && this.user.firstName && this.user.lastName) );
        },
        usersRole() {
          return this.roles.filter(item => {
            return item.name != "SALES_REP";
          })
        }
    },
    async mounted() {
      this.getRole()
    },
  methods:{
        ...mapActions(['createSingleUser','fetchRole']),
        ...mapMutations(['updateResponseStatus','toggleUserModal','displayMessage']),
    saveData(e){
          console.log(e)
    },
      cancelUserModal(){
        this.toggleUserModal(false)
        this.type = true
        this.contract = ''
        this.cdl = ''
        this.type_status = '';
        this.user = {};
      },
      showType(e){
          this.user.type=e.target.value;
          if(e.target.value === 'CDL') {this.cdl = true; this.contract = false; this.type= false;}
          if(e.target.value === 'CONTRACT') {this.contract = true; this.cdl = false; this.type= false;}
        },
        validateEmail(){
          if(this.user.email){
            this.errors['email'] = '';
          } else {
            this.errors['email'] = 'Email can not be empty.';
          }
            // if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.user.email)){
            //     this.errors['email'] = '';
            // } else {
            //     this.errors['email'] = 'Invalid email entry';
            // }
        },
        validateRole(){
            if(this.user.role){
                this.errors['role'] = '';
            } else {
                this.errors['role'] = 'Role can not be empty.';
            }
        },
        validateFirstname(){
          if(this.user.firstname){
            this.errors['firstname'] = '';
          } else {
            this.errors['firstname'] = 'Firstname can not be empty.';
          }
        },
        validateLastname(){
          if(this.user.lastname){
            this.errors['lastname'] = '';
          } else {
            this.errors['lastname'] = 'Lastname can not be empty.';
          }
        },
        async getRole(){
          try{
            const res = await this.fetchRole();
            this.roles = res.data
            // console.log(res)
          } catch(err) {
            this.errorCatchy(err)
            this.message = '';
            // console.log(err.response)
          }
        },

        async createUser(){
            this.message = 'Creating...';

            let num = [];
            num.push(this.user.phoneNumbers);
            this.user.phoneNumbers = num;
            try {
                const res = await this.createSingleUser(this.user);
                // console.log(res)
                this.toggleUserModal(false)
                if(res.message === 'Operation Successful!') {
                    this.user = {};
                    this.message = 'Created';
                    this.$toast.success('Operation Successful!');
                    this.message = "Create User";
                    this.$emit('callback',true)
                }
            } catch(err) {
                this.errorCatchy(err)
                this.message = 'Create User Profile';
            }
        },
    },
    components:{
        SuccessModal,
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

<style>
.el-select{
  display: block;
}
</style>
