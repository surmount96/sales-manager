<template>
    <div class="flex flex-wrap relative">
        <aside class="lg:flex md:flex flex-col justify-between bg-dark-100 text-white hidden shadow-lg fixed z-10" style="height: 100vh;width:210px">
            <sale-side-bar :item="nav_item" :link="profile_link"/>
        </aside>
        <main class="lg:w-10/12 md:w-9/12 w-full absolute lg:ml-52 p-4 md:ml-56" style=" background:#f9f9f9; min-height:100vh">
            <div class="flex items-center justify-between py-4">
                <h4 class="text-large text-blue-light font-bold">{{ $store.state.auth.user ? $store.state.auth.user.role.description : '-'}},</h4>
                <div class="flex items-center">
<!--                    <div class="relative mr-3">-->
<!--                        <img src="/icons/notification.svg" alt="" class="w-6">-->
<!--                        <span class="flex h-2 w-2 rounded-full bg-red-dark absolute top-0 right-0 " style="margin-top:1px; margin-right:1px;"></span>-->
<!--                    </div>-->
                  <router-link :to="'/user/profile'" tag="div" class="cursor-pointer">
                    <div class="border-l border-gray pl-4 flex items-center">
                      <div class="h-8 w-8 rounded-full border flex items-center justify-center overflow-hidden">
                        <img :src="$store.state.auth.user.pictureUrl ? $store.state.auth.user.pictureUrl : 'null'" alt="">
                      </div>
                      <p class="text-medium ml-2">{{ $store.state.auth.user.firstName ? $store.state.auth.user.firstName + ' ' + $store.state.auth.user.lastName : '-'}}</p>
                    </div>
                  </router-link>
                </div>
            </div>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import Sidebar from '@/components/sales-staff/Sidebar'
export default {
    data(){
        return {
            nav_item:[
                {
                    route:'/hos/dashboard',
                    icon:'ri-dashboard-fill',
                    name:'Dashboard'
                },
                {
                    route:'/hos/users',
                    icon:'ri-user-line',
                    name:'Users'
                },
                {
                  route:'/hos/agents',
                  icon:'ri-user-line',
                  name:'Agents'
                },
                {
                  route:'/hos/regions',
                  icon:'ri-find-replace-line',
                  name:'Regions'
                },
                {
                  route:'/hos/budgets',
                  icon:'ri-creative-commons-line',
                  name:'Budgets'
                },
                {
                  route:'/hos/budget-types',
                  icon:'ri-vip-diamond-line',
                  name:'Budget Types'
                },
                // {
                //     route:'#',
                //     view:'/hos/target',
                //     create:'/hos/create-target',
                //     icon:'ri-focus-2-line',
                //     name:'Target',
                //     role:'HOS'
                // },
            ],
            profile_link: '/hos/profile'
        };
    },
    components: {
        SaleSideBar: Sidebar
    }
}
</script>
