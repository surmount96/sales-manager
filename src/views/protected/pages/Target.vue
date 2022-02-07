<template>
    <div>
         <section class="bg-white border border-gray rounded-md" style="min-height:50vh">
            <div class="h-16 shadow p-3 flex items-center justify-between">
                <div>
                    <h4 class="font-semibold">Target</h4>
                </div>
                <div class=" flex">
                    
                    <div class="relative">
                        <button @click="showFilter = !showFilter" :class="{'text-white bg-yellow-dark' :showFilter}" class="flex items-center py-2 px-3 text-medium border border-gray rounded mx-3 focus:outline-none">    
                            <img src="/icons/black-filter.svg" alt="">
                            <span class="ml-2">Filter by</span>
                            
                        </button>
                        <div v-show="showFilter" class=" absolute top-0 right-0 mt-10 w-24 mr-3 bg-white shadow rounded-md">
                            <p class="border-b border-gray text-medium text-center text-gray-light pt-2 pb-1 cursor-pointer " @click="getUsers('RSM')">RSM</p>
                            <p class="border-b border-gray text-medium text-center text-gray-light py-2 cursor-pointer " @click="getUsers('TSO')">TSO</p>
                            <p class="border-b border-gray text-medium text-center text-gray-light py-2 cursor-pointer " @click="getUsers('ASS')">ASS</p>
                        </div>
                    </div>
                    <button class="flex items-center py-2 px-3 text-medium border border-gray rounded mx-3">
                        <img src="/icons/download.svg" alt="">
                        <span class="ml-2">Upload user</span>
                    </button>
                    <button class="flex items-center py-2 px-3 text-medium border border-gray rounded mx-3">
                        <img src="/icons/download.svg" alt="">
                        <span class="ml-2">Download</span>
                    </button>
                </div>
            </div>
                <table class="w-full">
                    <tr class="bg-gray-400 font-semibold">
                        <td class="py-4 text-medium px-3 ">Period</td>
                        <td class="py-4 text-medium px-3">Transaction Volume</td> 
                        <td class="py-4 text-medium px-3">Transaction Value</td>
                    </tr>
                    <tr class="border-b border-gray text-gray-base">
                        <td class="py-4 text-medium px-3">Feb 2021</td>
                        <td class="py-4 text-medium px-3">
                            <p>
                                <span class="text-green-100">Expected:</span>
                                500
                            </p>
                            <p>
                                <span class="text-red-dark">Actual: </span>
                                300
                            </p>
                        </td>
                        <td class="py-4 text-medium px-3">
                            <p>
                                <span class="text-green-100">Expected:</span>
                                300000.0
                            </p>
                            <p>
                                <span class="text-red-dark">Actual: </span>
                                300000.0
                            </p>
                        </td>
                    </tr>
                    <tr class="border-b border-gray text-gray-base">
                        <td class="py-4 text-medium px-3">Feb 2021</td>
                        <td class="py-4 text-medium px-3">
                            <p>
                                <span class="text-green-100">Expected:</span>
                                500
                            </p>
                            <p>
                                <span class="text-red-dark">Actual: </span>
                                300
                            </p>
                        </td>
                        <td class="py-4 text-medium px-3">
                            <p>
                                <span class="text-green-100">Expected:</span>
                                300000.0
                            </p>
                            <p>
                                <span class="text-red-dark">Actual: </span>
                                300000.0
                            </p>
                        </td>
                    </tr>
                    <tr class="border-b border-gray text-gray-base">
                        <td class="py-4 text-medium px-3">Feb 2021</td>
                        <td class="py-4 text-medium px-3">
                            <p>
                                <span class="text-green-100">Expected:</span>
                                500
                            </p>
                            <p>
                                <span class="text-red-dark">Actual: </span>
                                300
                            </p>
                        </td>
                        <td class="py-4 text-medium px-3">
                            <p>
                                <span class="text-green-100">Expected:</span>
                                300000.0
                            </p>
                            <p>
                                <span class="text-red-dark">Actual: </span>
                                300000.0
                            </p>
                        </td>
                    </tr>
                    <tr class="border-b border-gray text-gray-base">
                        <td class="py-4 text-medium px-3">Feb 2021</td>
                        <td class="py-4 text-medium px-3">
                            <p>
                                <span class="text-green-100">Expected:</span>
                                500
                            </p>
                            <p>
                                <span class="text-red-dark">Actual: </span>
                                300
                            </p>
                        </td>
                        <td class="py-4 text-medium px-3">
                            <p>
                                <span class="text-green-100">Expected:</span>
                                300000.0
                            </p>
                            <p>
                                <span class="text-red-dark">Actual: </span>
                                300000.0
                            </p>
                        </td>
                    </tr>
                    <tr class="border-b border-gray text-gray-base">
                        <td class="py-4 text-medium px-3">Feb 2021</td>
                        <td class="py-4 text-medium px-3">
                            <p>
                                <span class="text-green-100">Expected:</span>
                                500
                            </p>
                            <p>
                                <span class="text-red-dark">Actual: </span>
                                300
                            </p>
                        </td>
                        <td class="py-4 text-medium px-3">
                            <p>
                                <span class="text-green-100">Expected:</span>
                                300000.0
                            </p>
                            <p>
                                <span class="text-red-dark">Actual: </span>
                                300000.0
                            </p>
                        </td>
                    </tr>
                </table>
                <div class="flex justify-between items-center py-4 px-3">
                    <div class="text-medium text-black font-semibold">
                        <p>PAGE 1 of 24</p>
                    </div>
                    <div class="text-medium">
                        <button class="focus:outline-none border border-gray px-10 text-gray-base py-2 rounded-tl-full rounded-bl-full opacity-30">Previous</button>
                        <button class="focus:outline-none border border-gray px-10 text-gray-base py-2 rounded-tr-full rounded-br-full">Next</button>
                    </div>
                </div>
         </section>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapMutations,mapActions } = createNamespacedHelpers('auth');
export default {
    data(){
        return {
            regions:{},
            showFilter:false
        };
    },

    methods:{
        ...mapActions(['fetchRegion','logout','fetchAllUserTarget']),
        ...mapMutations(['updateLoader','toggleUserModal']),
        async listTargets(){
            try {
                const res = this.fetchAllUserTarget();
                console.log(res)
            }catch(err) {
                console.log(err)
            }
        }
    },
    async mounted(){
       this.listTargets()
    }
}
</script>