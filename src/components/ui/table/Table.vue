<template>
    <div>
        <table class="w-full">
            <tr class="bg-gray-400 font-semibold">
                <td class="py-4 text-medium px-3 ">Name</td>
                <td class="py-4 text-medium px-3">Email</td>
                <!-- <td class="py-4 text-medium px-3">Phone number(s)</td> -->
                <td class="py-4 text-medium px-3">Status</td>
                <td class="py-4 text-medium px-3">Role</td>
                <td class="py-4 text-medium px-3">Action</td>
            
            </tr>
            <tr class="border-b border-gray text-gray-base" v-for="user in users" :key="user.id">
                <td class="py-4 text-medium px-3 ">{{ user.firstName ? user.firstName :'-' }} {{ user.lastName ? user.lastName :'' }}</td>
                <td class="py-4 text-medium px-3">{{ user.email }}</td>
                <td class="py-4 text-medium px-3">
                    <p class="py-1 w-20 rounded-md text-center " style="" :class="{'inactive': user.status === 'INACTIVE', 'active': user.status === 'ACTIVE'}">{{ user.status }}</p>
                </td>
                <td class="py-4 text-medium px-3">
                    {{ user.role.description }}
                </td>
                <td class="py-4 text-medium px-3 flex items-center">
                  <router-link :to="type+user.id" v-show="permission || role === 'SUPER_ADMIN'" tag="button" class="py-2 px-5 text-medium border border-blue rounded-md focus:outline-none">
                    View
                  </router-link>
                </td>
                
            </tr>
        </table>
      <pagination @pagePagination="tablePaginate" :meta="meta"/>
    </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { createNamespacedHelpers } from 'vuex';

const { mapMutations,mapActions,mapGetters } = createNamespacedHelpers('auth');
export default {
    props:{
        users: Array,
        type : String,
        meta : Object,
        permission: {
          type: Boolean,
          default: false
        }
    },
    computed:{
      ...mapGetters(['role'])
    },
    methods:{
        ...mapActions(['updateRole','delist']),
        ...mapMutations(["updateLoader"]),
        tablePaginate(page){
          this.$emit('paginate',page)
        }
    },
    components:{
      Pagination
    }
}
</script>

<style scoped>
    .active{
        background-color: #E4F3BA;
        color: #8EBA05;
        font-size: 12px;
        font-weight: 600;
    }

    .inactive{
        background-color: rgb(207, 32, 32);
        font-size: 12px;
        font-weight: 600;
        color: #fff;
    }
</style>
