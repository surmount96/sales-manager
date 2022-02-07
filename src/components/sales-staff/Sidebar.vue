<template>
    <div class="flex flex-col justify-between " style="height:100%">
        <div class="">
            <div class="border-b-2 flex items-center justify-center border-gray mx-3 py-3">
                <img src="@/assets/img/sale-logo-2.png" alt="" class="h-24 w-24 mx-auto">
            </div>
            <div class=" mt-8">
                <router-link to="/user/dashboard" tag="a" class="flex flex-col text-medium" :class="{'text-yellow-dark border-l-4 border-yellow': $route.path == '/user/dashboard'}">
                    <span class="flex pl-6 items-center " >
                        <i class=" mr-3 ri-fw ri-dashboard-fill"></i>
<!--                        <img :src="i.img" alt="" class="mr-3 w-5" v-show="i.img">-->
                        Dashboard
                    </span>
                </router-link>
            </div>
            <div class=" mt-8">
              <router-link v-show="user || role === 'SUPER_ADMIN'" to="/user/users" tag="a" class="flex flex-col text-medium" :class="{'text-yellow-dark border-l-4 border-yellow': $route.path == '/user/users'}">
                <span class="flex pl-6 items-center " >
                    <i class=" mr-3 ri-fw ri-user-line"></i>
                    Users
                </span>
              </router-link>
            </div>
            <div class=" mt-8">
              <router-link v-show="agent || role === 'SUPER_ADMIN'" to="/user/agents" tag="a" class="flex flex-col text-medium" :class="{'text-yellow-dark border-l-4 border-yellow': $route.path == '/user/agents'}">
                <span class="flex pl-6 items-center " >
                    <i class=" mr-3 ri-fw ri-user-line"></i>
                    Agents
                </span>
              </router-link>
            </div>
            <div class=" mt-8">
              <router-link v-show="region || role === 'SUPER_ADMIN'" to="/user/regions" tag="a" class="flex flex-col text-medium" :class="{'text-yellow-dark border-l-4 border-yellow': $route.path == '/user/regions'}">
                <span class="flex pl-6 items-center " >
                    <i class=" mr-3 ri-fw ri-find-replace-line"></i>
                    Regions
                </span>
              </router-link>
            </div>
            <div class=" mt-8">
              <router-link v-show="budget || role === 'SUPER_ADMIN'" to="/user/budgets" tag="a" class="flex flex-col text-medium" :class="{'text-yellow-dark border-l-4 border-yellow': $route.path == '/user/budgets'}">
                <span class="flex pl-6 items-center " >
                    <i class=" mr-3 ri-fw ri-creative-commons-line"></i>
                    Budgets
                </span>
              </router-link>
            </div>
            <div class=" mt-8">
              <router-link v-show="budgetType || role === 'SUPER_ADMIN'" to="/user/budget-types" tag="a" class="flex flex-col text-medium" :class="{'text-yellow-dark border-l-4 border-yellow': $route.path == '/user/budget-types'}">
                <span class="flex pl-6 items-center " >
                    <i class=" mr-3 ri-fw ri-vip-diamond-line"></i>
                    Budget Types
                </span>
              </router-link>
            </div>
            <div class=" mt-8">
              <router-link v-show="role === 'SUPER_ADMIN'" to="/user/permission" tag="a" class="flex flex-col text-medium" :class="{'text-yellow-dark border-l-4 border-yellow': $route.path == '/user/permission'}">
                  <span class="flex pl-6 items-center " >
                      <i class=" mr-3 ri-fw ri-lock-line"></i>
                      Permission
                  </span>
              </router-link>
            </div>
            <div class=" mt-8">
              <router-link v-show="fileUploadPermission ||role === 'SUPER_ADMIN'" to="/user/files" tag="a" class="flex flex-col text-medium" :class="{'text-yellow-dark border-l-4 border-yellow': $route.path == '/user/files'}">
                    <span class="flex pl-6 items-center " >
                        <i class=" mr-3 ri-fw ri-file-line"></i>
                        Uploaded File
                    </span>
              </router-link>
            </div>
        </div>
        <div>

            <div class="my-5 ">
                <a href="#" @click.prevent="signOut" class="flex items-center justify-center flex-col w-full text-body-2 ">
                
                    <img src="/icons/logout.svg" alt="" class="w-8 mx-auto">
                
                    Logout
                </a>
            </div>
        </div>
    </div>
  
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import permissions from "@/permissions";

const { mapActions,mapGetters } = createNamespacedHelpers('auth');
const PR = permissions;

export default {
    name:'Sidebar',
    props:{
        item: Array,
        link: String
    },
    data(){
        return {
            show:false
        };
    },
    mounted() {
    },
    computed:{
      ...mapGetters(['role']),
      user(){
        return PR.userIndexPermission(this.$store.state.auth.user.role.permissions)
      },
      region(){
        return PR.regionIndexPermission(this.$store.state.auth.user.role.permissions)
      },
      budget(){
        return PR.budgetIndexPermission(this.$store.state.auth.user.role.permissions)
      },
      agent(){
        return PR.agentIndexPermission(this.$store.state.auth.user.role.permissions)
      },
      budgetType(){
        return PR.budgetTypeIndexPermission(this.$store.state.auth.user.role.permissions)
      },
      fileUploadPermission(){
        return PR.listUploadFilePermission(this.$store.state.auth.user.role.permissions)
      },
    },
    methods:{
        ...mapActions(["logout"]),
        async signOut(){
            try {
                const res = await this.logout();
                console.log(res);
                if(res) {
                    window.location.href = '/';
                    // this.$router.push({
                    //     name:'Login'
                    // });
                }
            } catch(err) {

            }
        }
    }
}
</script>

<style scoped>
.border-yellow{
    border-color: #F8B700;
}
</style>
