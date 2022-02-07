<template>
  <div>
    <section class="bg-white border border-gray rounded-md" style="min-height:50vh">
      <div class="h-16 shadow p-3 flex items-center justify-between">
        <div>
          <h4 class="font-semibold">All Users</h4>
        </div>
        <div class="">
          <input type="search" v-model="search" @keyup.enter="getUsers('')" placeholder="search" class="py-2 px-3 text-medium border border-gray rounded-md focus:outline-none w-64">
        </div>
        <div class=" flex">

          <div class="relative">
            <button @click="showFilter = !showFilter" :class="{'text-white bg-yellow-dark' :showFilter}" class="flex items-center py-2 px-3 text-medium border border-gray rounded mx-3 focus:outline-none">
              <img src="/icons/black-filter.svg" alt="">
              <span class="ml-2">Filter by</span>

            </button>
            <div v-show="showFilter" class=" absolute top-0 right-0 mt-10 w-48 mr-3 bg-white shadow rounded-md z-40">
              <p class="border-b border-gray text-medium text-center text-gray-light pt-2 pb-1 cursor-pointer " @click="getUsers('')">All Staff</p>
              <p class="border-b border-gray text-medium text-center text-gray-light pt-2 pb-1 cursor-pointer " @click="getUsers('HOS')">Head Of Sales</p>
              <p class="border-b border-gray text-medium text-center text-gray-light pt-2 pb-1 cursor-pointer " @click="getUsers('RSM')">Regional Sales Manager</p>
              <p class="border-b border-gray text-medium text-center text-gray-light py-2 cursor-pointer " @click="getUsers('TSO')">	Territory Sales Officer</p>
              <p class="border-b border-gray text-medium text-center text-gray-light py-2 cursor-pointer " @click="getUsers('ASS')">Area Sales Officer</p>
              <p class="border-b border-gray text-medium text-center text-gray-light py-2 cursor-pointer " @click="getUsers('SALES_REP')">	Sales Representative</p>
            </div>
          </div>
          <button @click="toggleUserModal(true)" v-show="createPermission || role === 'SUPER_ADMIN'" class="flex items-center py-2 px-3 text-medium border border-gray rounded mx-3">
            <img src="/icons/download.svg" alt="">
            <span class="ml-2">Add user</span>
          </button>
          <button @click="onboardStaff = true" v-show="uploadPermission || role === 'SUPER_ADMIN'" class="flex items-center py-2 px-3 text-medium border border-gray rounded mx-3">
            <img src="/icons/download.svg" alt="">
            <span class="ml-2">Bulk user upload</span>
          </button>
        </div>
      </div>
      <sle-table :type="type" :users="users" :meta="meta" :permission="showPermission"/>
    </section>
    <user-modal @callback="getUsers('',1)"/>
    <vue-final-modal
        v-model="onboardStaff"
        classes="modal-container"
        content-class="modal-content">
      <div class="pb-3 border-b border-gray">
        <h5 >Onboard Staff</h5>
      </div>
      <form action=""
            class="flex flex-col justify-center"
            style="min-height:50vh">
        <label class="mt-5">
          <div class="upload-container w-40 h-40 mx-auto rounded-md flex items-center justify-center cursor-pointer">
            <img src="/icons/upload.svg" alt="" class="w-12 mx-auto">
            <input type="file" @change="handleImage($event)">
          </div>
        </label>
        <p class="text-medium text-center text-gray-base my-2">Please select a file of sales staff </p>
        <a href="/sample_user_file.csv" download class="text-medium text-blue-100 text-center text-blue-dark my-2">Download a sample data</a>
        <p class="text-medium text-center text-gray-base my-2">{{ image_name }}</p>
        <hr class="border-t border-gray mt-10 mb-4">
        <div class="flex items-center justify-end">
          <button @click="onboardStaff = false" class="border border-blue-base py-2 px-8 text-medium rounded-md focus:outline-none mx-2">
            Cancel
          </button>
          <button @click.prevent="uploadUsers" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none ml-4">
            Onboard Staff
          </button>
        </div>
      </form>
    </vue-final-modal>
  </div>
</template>

<script>
import UserModal from '@/components/ui/modal/UserModal';
import Table from '@/components/ui/table/Table'
import { createNamespacedHelpers } from 'vuex';
import Multiselect from "@vueform/multiselect";
import permissions from "../../../permissions";
// import sample from "assets/sample-data.csv";
import catcher from "@/mixins/catcher";

const PR = permissions;
const { mapMutations,mapActions,mapGetters } = createNamespacedHelpers('auth');

export default {
  data(){
    return {
      // sample:'data:text/csv;base64,77u/Uy9OLFVzZXJuYW1lLEFnZW50IElkLEZpcnN0IE5hbWUsTGFzdCBOYW1lLEVtYWlsLFBob25lIE51bWJlcnMsUGFydG5lciBUeXBlLFN0YXR1cyxMR0ENCjEsdmljdG9yLmF5b2RlaGksMjMxNDJBU0RGQSxWaWN0b3IsQXlvZGVqaSx2aWN0b3IuYXlvZGVqaUBleGFtcGxlLmNvbSwiMDgxMzkwOTc5NDUsIDA5MDQ5MDAwMDAiLExpdGUsRW5hYmxlZCxVZ2hlbGxpIE5vcnRo',
      sampleData:'',
      test:new Date(),
      showFilter:false,
      onboardStaff:false,
      image_name:'',
      form:{
        user_id:'',
        period:'',
        role:'',
        value:'',
        volume:''
      },
      meta: {},
      users:{},
      type:'/user/user/',
      showModal:false,
      search:''
    };
  },
  mixins:[
      catcher
  ],
  computed:{
    ...mapGetters(['role']),
    createPermission(){
      return PR.userCreatePermission(this.$store.state.auth.user.role.permissions);
    },
    uploadPermission(){
      return PR.userBulkUploadPermission(this.$store.state.auth.user.role.permissions);
    },
    showPermission(){
      return PR.userSinglePermission(this.$store.state.auth.user.role.permissions);
    },
  },
  mounted(){
    // this.sampleData = sample;
    // console.log(sample)
    this.getUsers()
    // console.log(this.$store.state.auth.callbackurl)
    // if(this.$store.state.auth.callbackurl){
    //   this.getUsers()
    // }
  },
  methods:{
    ...mapActions(['fetchAllUsers','logout','delist','createBulkTarget','uploadStaffs']),
    ...mapMutations(['updateLoader','toggleUserModal']),
    async getUsers(data = '',page = 1){
      this.updateLoader(true);
      try {
        const res = await this.fetchAllUsers({email:this.search,role:data,size:30,page});
        this.users = res.data
        this.meta = res.meta
        this.showFilter = false;
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
      // console.log(res)
    },
    handleImage(e) {
      const file = e.target.files[0];
      this.image_name = file.name
      // let test;
      const reader = new FileReader();
      reader.onload = (e) => {

          let blob = new Blob([reader.result], {type: file.type});
          let url = URL.createObjectURL(blob);
          // console.log(url)
          // console.log(reader.readAsArrayBuffer(file));
        this.image = e.target.result;
        // this.uploadAgents();
      };
      reader.readAsDataURL(file);

    },
    fileUploading(){
      console.log(this.image)
    },
    async uploadUsers(){
      console.log(this.image)
      if(this.image){
        try{
          const params = {
            base64String : this.image
          }
          const res = await this.uploadStaffs(params);
          this.$toast.success(res.message)
          this.onboardStaff = false
          console.log(res);
        }catch (err) {
          this.errorCatchy(err)
        }
      } else {
        this.$toast.error('Please upload a file');
      }
    },

  },
  components:{
    SleTable: Table,
    Multiselect,
    UserModal
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>
.upload-container{
  border:1px dashed #ccc;
}
.upload-container > input[type="file"] {
  display: none;
}
</style>

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
