<template>
    <div>
        <vue-final-modal 
        v-model="$store.state.auth.onboard"
        classes="modal-container"
        content-class="modal-content">  
            <div class="pb-3 border-b border-gray">
                <h5 >Onboard Agent</h5>
            </div>
            <form action=""
            class="flex flex-col justify-center"
            style="min-height:50vh">
                <!-- Success -->
                <!-- <div class="bg-green-light py-3 px-2 rounded-md flex items-center">
                    <div class="h-6 w-6 rounded-full bg-green-pale flex items-center justify-center mr-2">
                        <img src="/icons/check.svg" alt="">
                    </div>
                    <p class="text-medium">
                        The Sales staff details have been Uploaded.                    
                    </p>
                </div> -->
                <!-- Error -->
                <!-- <div class="bg-red-light py-3 px-2 my-2 rounded-md flex items-center">
                    <div class="h-6 w-6 rounded-full bg-red-dark flex items-center justify-center mr-2">
                        <img src="/icons/close.svg" alt="">
                    </div>
                    <p class="text-medium pl-20">
                        Error uploading file.                  
                    </p>
                </div> -->
                <!-- <p class="text-medium">File: </p> -->
                <label class="mt-5">
                    <div class="upload-container w-40 h-40 mx-auto rounded-md flex items-center justify-center cursor-pointer">
                        <img src="/icons/upload.svg" alt="" class="w-12 mx-auto">
                        <input type="file" @change="handleImage($event)">
                    </div>
                </label>
                <p class="text-medium text-center text-gray-base my-2">Please select a file of sales staff </p>
<!--                {{ $route.path }}-->
<!--                {{ $route.fullPath }}-->

                <a href="/sample_agent_file.csv" download class="text-medium text-blue-100 text-center text-blue-dark my-2">Download a sample data</a>
                <p class="text-medium text-center text-gray-base my-2">{{ image_name }}</p>
                <hr class="border-t border-gray mt-10 mb-4">
                <div class="flex items-center justify-end">
                    <button @click="onboardModal(false)" class="border border-blue-base py-2 px-8 text-medium rounded-md focus:outline-none mx-2">
                        Cancel
                    </button>
                    <button @click.prevent="uploadUsers" class="bg-blue-base py-3 px-5 text-white text-medium rounded-md focus:outline-none ml-4">
                        Onboard Agent
                    </button>
                </div>
            </form>
        </vue-final-modal>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapMutations,mapActions } = createNamespacedHelpers('auth');
    export default{
        props:{
            modalOn: Boolean,
            option: Object
        },
        data(){
            return{
              // sample:'',
              file:'',
              image:'',
              image_name:'',
            };
        },
        methods:{
          ...mapActions(["uploadAgents"]),
            ...mapMutations(["showModalDetails","onboardModal"]),
            open(){

            },
          handleImage(e) {
              const file = e.target.files[0];
              this.image_name = file.name
              // let test;
              const reader = new FileReader();
              reader.onload = (e) => {
                this.image = e.target.result;
                // this.uploadAgents();
              };
              reader.readAsDataURL(file);
            

            },
            fileUploading(){
                console.log(this.image)
            },
            async uploadUsers(){
              if(this.image){
                try{
                  const params = {
                    base64String : this.image
                  }
                  const res = await this.uploadAgents(params);
                  this.$toast.success(res.message)
                  this.onboardModal(false)
                  this.$emit('callback',true)
                  console.log(res);
                }catch (err) {
                  this.$toast.error(err.response.data.error.message);
                }
              } else {
                this.$toast.error('Please upload a file');
              }
            },
        }
    }
</script>

<style scoped>
    .upload-container{
        border:1px dashed #ccc;
    }
    .upload-container > input[type="file"] {
        display: none;
    }
</style>
