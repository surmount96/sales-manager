<template>
  <div class="">
    <section class="bg-white border border-gray rounded-md" style="min-height:50vh">
      <div class="h-16 shadow p-3 flex items-center justify-between">
        <div>
          <h4 class="font-semibold">Uploaded Files</h4>
          <a ref="downloadFile" :href="downloadUrl" download="file.xls"></a>
        </div>
      </div>
      <table class="table-auto w-full">
        <tr class="bg-gray-400 font-semibold">
          <td class="py-4 text-medium px-3 ">Content</td>
          <td class="py-4 text-medium px-3 ">Extension</td>
          <td class="py-4 text-medium px-3 ">Status</td>
          <td class="py-4 text-medium px-3 ">Total Failed</td>
          <td class="py-4 text-medium px-3 ">Total Inserted</td>
          <td class="py-4 text-medium px-3 ">Total Record</td>
          <td class="py-4 text-medium px-3">
            <span v-show="role === 'SUPER_ADMIN'">Action</span>
          </td>
        </tr>
        <tr class="border-b border-gray text-gray-base" v-for="type in data" :key="type.id">
          <td class="py-4 text-medium px-3">{{ type.contents }}</td>
          <td class="py-4 text-medium px-3">{{ type.fileExtension }}</td>
          <td class="py-4 text-medium px-3">{{ type.status }}</td>
          <td class="py-4 text-medium px-3">{{ type.totalFailed }}</td>
          <td class="py-4 text-medium px-3">{{ type.totalInserted }}</td>
          <td class="py-4 text-medium px-3">{{ type.totalRecord }}</td>
          <td class="py-4 text-medium px-3">
            <button title="Download File" v-show="showUploadPermission || role === 'SUPER_ADMIN'" @click="downloadUploadedFiles(type.id)" class="focus:outline-none text-blue-dark ml-4">
              <i class="ri-download-line text-green-dark"></i>
            </button>
            <button title="Edit File" v-show="role === 'SUPER_ADMIN'" @click="openException(type)" class="focus:outline-none text-blue-dark ml-4">
              <i class="ri-edit-line"></i>
            </button>
            <button title="Delete File" v-show="deleteUploadPermission || role === 'SUPER_ADMIN'" @click="confirmDelete(type.id)" class="focus:outline-none ml-4 text-red-dark">
              <i class="ri-delete-bin-7-line"></i>
            </button>
          </td>
        </tr>
      </table>
      <pagination @pagePagination="getUploadedFiles" :meta="meta"/>

    </section>

    <vue-final-modal
        v-model="modal"
        classes="modal-container"
        content-class="modal-content"
        @closed="cancelModal">
      <div class="">
        <div class="my-3">
          <h5 class="text-body-2 mb-2 font-semibold">Reason(s)</h5>
          <p class="text-medium" v-for="e in exceptions" :key="e.id" v-if="exceptions.length > 0">
            {{ e }}
          </p>
          <p class="text-medium" v-else>
            None
          </p>
        </div>
        <button @click="cancelModal" class="border border-blue-base py-2 px-8 text-medium rounded-md focus:outline-none">
          Cancel
        </button>
      </div>

    </vue-final-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapMutations,mapActions,mapGetters } = createNamespacedHelpers('auth');
import permissions from "@/permissions";
import Pagination from "@/components/Pagination";
import catcher from "@/mixins/catcher";

const PR = permissions;
export default {
  name: "Files",
  data(){
    return {
      data:[],
      downloadUrl:'',
      exceptions:[],
      modal:false,
      meta:{}
    };
  },
  mixins:[
    catcher
  ],
  components:{
    Pagination
  },
  computed:{
    ...mapGetters(['role']),
    deleteUploadPermission(){
      return PR.deleteUploadFilePermission(this.$store.state.auth.user.role.permissions)
    },
    showUploadPermission(){
      return PR.showUploadFilePermission(this.$store.state.auth.user.role.permissions)
    },
  },
  methods:{
    ...mapActions(['fetchUploadedFiles','singleUploadedFiles','deleteUploadedFiles']),
    ...mapMutations(['updateLoader']),
    cancelModal(){
      this.modal = false;
    },
    openException(data){
      this.modal = true;
      this.exceptions = data.exceptions;
    },
    async getUploadedFiles(page = 1){
      this.updateLoader(true)
      try {
        const res = await this.fetchUploadedFiles({sort:'',page,size:10});
        this.data = res.data
        this.meta = res.meta
        this.updateLoader(false)
        // console.log(res)
      } catch (err) {
        this.errorCatchy(err)
      }
    },
    async downloadUploadedFiles(id){
      this.updateLoader(true)
      try {
        const res = await this.singleUploadedFiles({id});
        this.downloadUrl = res.data.base64String;
        this.$refs.downloadFile.click();
        this.updateLoader(false)
      } catch (err) {
        this.errorCatchy(err)
        this.updateLoader(false)
      }
    },
    confirmDelete(id){
      this.$confirm('This will delete the uploaded file. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.deleteFiles(id)
      }).catch(() => {
        this.$message({
          type: 'danger',
          message: 'Delete canceled'
        });
      });
    },
    async deleteFiles(id){
      this.updateLoader(true)
      try {
        const res = await this.deleteUploadedFiles({id});
        this.getUploadedFiles()
        this.updateLoader(false)
      } catch (err) {
        this.errorCatchy(err)
        this.updateLoader(false)
      }
    },
  },
  mounted() {
   this.getUploadedFiles();
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
