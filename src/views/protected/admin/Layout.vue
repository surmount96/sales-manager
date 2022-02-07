<template>
    <div class="flex flex-wrap relative">
        <aside class="lg:flex md:flex flex-col justify-between bg-dark-100 text-white hidden shadow-lg fixed z-10" style="height: 100vh;width:210px">
            <sale-side-bar :item="nav_item" :link="profile_link"/>
        </aside>
        <main class="lg:w-10/12 md:w-9/12 w-full absolute lg:ml-52 p-4 md:ml-56" style=" background:#f9f9f9; min-height:100vh">
            <div class="flex items-center justify-between py-4">
                <h4 class="text-h3 text-blue-light font-bold">Hello {{ $store.state.auth.user.firstName ? $store.state.auth.user.firstName : '-'}},</h4>

                <router-link :to="'/admin/profile'" tag="div" class="cursor-pointer">
                  <div class="flex items-center">
                    <div class="relative mr-3">
                      <img src="/icons/notification.svg" alt="" class="w-6">
                      <span class="flex h-2 w-2 rounded-full bg-red-dark absolute top-0 right-0 " style="margin-top:1px; margin-right:1px;"></span>
                    </div>
                    <div class="border-l border-gray pl-4 flex items-center">
                      <div class="h-8 w-8 rounded-full border flex items-center justify-center ">
                        <img :src="$store.state.auth.user.pictureUrl ? $store.state.auth.user.pictureUrl : 'null'" alt="">
                      </div>
                      <p class="text-medium ml-2">{{ $store.state.auth.user.firstName ? $store.state.auth.user.firstName + ' ' + $store.state.auth.user.lastName : '-'}}</p>
                    </div>
                  </div>
                </router-link>
            </div>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import Sidebar from '@/components/admin/Sidebar'
export default {
    data(){
        return {
            test:'working',
            nav_item:[
                {
                    route:'/admin/dashboard',
                    icon:'ri-dashboard-fill',
                    name:'Dashboard'
                },
                {
                    route:'/admin/users',
                    icon:'ri-group-line',
                    name:'Users'
                },
                {
                    route:'/admin/agent',
                    icon:'',
                    img:'/icons/groupusers.svg',
                    name:'Agents'
                },
                {
                    route:'/admin/region',
                    icon:'ri-find-replace-line',
                    name:'Regions'
                },
                {
                  route:'/admin/budgets',
                  icon:'ri-creative-commons-line',
                  name:'Budgets'
                },
                {
                  route:'/admin/budget-types',
                  icon:'ri-vip-diamond-line',
                  name:'Budget Types'
                },
                {
                  route:'/admin/permission',
                  icon:'ri-lock-line',
                  name:'Permission'
                },

                // {
                //     route:'/admin/territories',
                //     icon:'ri-profile-line',
                //     name:'Territories'
                // },
                // {
                //     route:'#',
                //     view:'/admin/target',
                //     create:'/admin/create-target',
                //     icon:'ri-focus-2-line',
                //     name:'Target',
                //     role:'HOS'
                // },
            ],
            profile_link: '/admin/profile'
        };
    },
    components: {
        SaleSideBar: Sidebar
    }
}
</script>
