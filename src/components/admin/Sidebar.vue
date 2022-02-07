<template>
    <div class="flex flex-col justify-between " style="height:100%">
        <div class="">
            <div class="border-b-2 flex items-center justify-center border-gray mx-3 py-3">
<!--                <div class="h-16 w-16 bg-white rounded"></div>-->
                <img src="@/assets/img/sale-logo-2.png" alt="" class="h-24 w-24 mx-auto">
<!--                <p class="font-semibold ml-3 text-medium">LOGO</p>-->
                <!--<img src="/logo.png" alt="logo" class="w-32 mx-auto h-12"> -->
            </div>
            <div class=" mt-8" v-for="i in item" :key="i.id">
                <router-link :to="i.route" tag="a" class="flex flex-col text-medium" :class="{'text-yellow-dark border-l-4 border-yellow': i.route == $route.path}">
                    <span class="flex pl-6 items-center " >
                        <i class=" mr-3 ri-fw" :class="i.icon" v-show="i.icon"></i>
                        <img :src="i.img" alt="" class="mr-3 w-5" v-show="i.img">
                        <span v-if="i.role != 'HOS'">
                            {{ i.name }}
                        </span>
                        <span v-else :style="[i.role == 'HOS' ? {'width':'100%'} : '']" @click="show = !show" >
                            {{ i.name }}
                        </span>
                    </span>

                    <span v-if="i.role == 'HOS'" class="flex flex-col" v-show="show">
                    
                        <router-link :to="i.view" class="pl-16 text-medium mt-2 mb-3" :class="{'text-yellow-dark': i.view == $route.path}">
                            View Target
                        </router-link>
                        <router-link :to="i.create" class="pl-16 text-medium mb-3" :class="{'text-yellow-dark': i.create == $route.path}">
                            Create Target
                        </router-link>
                    </span>
                
                    
                </router-link>
            </div>
            
        </div>
        <div>

            <div class="my-5 t">
                <a href="/admin/mapping" @click.prevent="signOut" class="flex items-center justify-center flex-col w-full text-body-2 ">
                
                    <img src="/icons/logout.svg" alt="" class="w-8 mx-auto">
                
                    Logout
                </a>
            </div>
        </div>
    </div>
  
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import permissions from "../../permissions";

const { mapActions } = createNamespacedHelpers('auth');
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
      user(){
        return PR.userIndexPermission(this.$store.state.auth.user.role.permissions)
      },
      region(){
        return PR.userIndexPermission(this.$store.state.auth.user.role.permissions)
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
