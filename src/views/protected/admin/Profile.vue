<template>
    <div>
        <h3 class="text-h4 text-blue-light mb-4">My Profile</h3>
        <div class="bg-white rounded-md flex flex-wrap" style="min-height:100vh">
            <div class="py-6 pl-6 border-r border-gray lg:w-3/12 md:w-3/12 w-full mb-4">
                <p class="text-large flex items-start mb-8 text-blue-light">
                    <i class="ri-edit-line"></i>
                    <span class="flex items-center w-full text-body-2 ml-5 border-b border-gray pb-3">
                        Edit Profile
                        <i class="ri-arrow-right-s-line ml-2"></i>
                    </span>
                </p>
                <p class="text-large flex items-start mb-8 text-gray-300">
                    <i class="ri-notification-4-fill bg-gray"></i>
                    <span class="flex items-center w-full text-body-2 ml-5 border-b border-gray pb-3">
                        Notification
                    </span>
                </p>
                <p class="text-large flex items-start mb-8 text-gray-300">
                    <i class="ri-lock-line"></i>
                    <span class="flex items-center w-full text-body-2 ml-5 border-b border-gray pb-3">
                        Password & Security
                    </span>
                </p>
            </div>
            <div class="lg:w-9/12 md:w-9/12 w-full py-6 pl-6">
                <h3 class="text-h5 text-blue-light mb-4 font-bold">Edit Profile</h3>
                <div class="w-8/12">
                     <div class="flex items-center justify-center h-16 w-16 mx-auto bg-white border-2 border-yellow rounded-full">
                        <i class="ri-user-line text-h3 ri-fw text-black"></i>
                    </div>
                    <div class="flex flex-wrap">
                        <div class="w-1/2 mb-4">
                            <div class="my-3 mr-2">
                                <label class="text-medium font-normal text-gray-base mb-1">First name</label>
                                <input type="text" v-model="user.firstName" placeholder="Enter a region" class="py-3 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">
                            </div>
                        </div>
                        <div class="w-1/2 mb-4">
                            <div class="my-3 ml-2">
                                <label class="text-medium font-normal text-gray-base mb-1">Last name</label>
                                <input type="text" v-model="user.lastName" placeholder="Enter a region" class="py-3 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">
                            </div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="text-medium font-normal text-gray-base mb-1">Email</label>
                        <input type="email" v-model="user.email" placeholder="Enter a region" class="py-3 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">
                    </div>
                    <div class="my-3">
                      <label class="text-medium font-normal text-gray-base mb-1">Phone number</label>
                      <el-select
                          v-model="user.phoneNumbers"
                          multiple
                          allow-create
                          filterable
                          default-first-option
                          placeholder="Enter staff phone number(s)">
                      </el-select>
                    </div>
                    <!--div class="mb-4">
                        <label class="text-medium font-normal text-gray-base mb-1">Address</label>
                        <input type="text" placeholder="Enter a region" class="py-3 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">
                    </div>
                    <div class="flex flex-wrap">
                        <div class="w-1/2 mb-4">
                            <div class="my-3 mr-2">
                                <label class="text-medium font-normal text-gray-base mb-1">City</label>
                                <input type="text" placeholder="Enter a region" class="py-3 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">
                            </div>
                        </div>
                        <div class="w-1/2 mb-4">
                            <div class="my-3 ml-2">
                                <label class="text-medium font-normal text-gray-base mb-1">State</label>
                                <input type="text" placeholder="Enter a region" class="py-3 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap">
                        <div class="w-1/2 mb-4">
                            <div class="my-3 mr-2">
                                <label class="text-medium font-normal text-gray-base mb-1">Zip Code</label>
                                <input type="text" placeholder="Enter a region" class="py-3 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">
                            </div>
                        </div>
                        <div class="w-1/2 mb-4">
                            <div class="my-3 ml-2">
                                <label class="text-medium font-normal text-gray-base mb-1">Country</label>
                                <input type="text" placeholder="Enter a region" class="py-3 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">
                            </div>
                        </div>
                    </div-->
<!--                    <div class="mb-4">-->
<!--                        <label class="text-medium font-normal text-gray-base mb-1">Password</label>-->
<!--                        <input type="password" v-model="user.password" placeholder="*******" class="py-3 px-5  text-medium rounded-md focus:outline-none border border-gray w-full">-->
<!--                    </div>-->
                    <button @click="submit" class="text-white bg-blue-base py-3 px-16 rounded-md text-medium">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapMutations,mapActions } = createNamespacedHelpers('auth');
export default {
    data(){
        return{
            user:{
                email:'',
                firstName:'',
                lastName:'',
                phoneNumbers:[],
                password:''
            }
        }
    },
    methods:{
        ...mapActions(['fetchSingleUser','updateProfile']),
        ...mapMutations(['updateLoader']),
        async getProfile() {
            this.updateLoader(true);
            try {
                const res = await this.fetchSingleUser({id: this.$store.state.auth.user.id});
                this.user = res.data
                this.updateLoader(false);
            } catch (err) {
                if(err.response.status === 401) {
                    console.log(err.response.status)
                    this.$toast.error(`Your session has expired please sign in again.`);
                    this.logout();
                }
            }
        },
        async submit() {
            this.updateLoader(true);
            try {
                const res = await this.updateProfile(this.user);
                this.user = res.data
                this.$toast.success('Operation Successful!');
                this.updateLoader(false);
            } catch (err) {
                if(err.response.status === 401) {
                    console.log(err.response.status)
                    this.$toast.error(`Your session has expired please sign in again.`);
                    this.logout();
                }
                this.updateLoader(false);
            }
        },
    },
    async mounted() {
        this.getProfile()
    }
}
</script>