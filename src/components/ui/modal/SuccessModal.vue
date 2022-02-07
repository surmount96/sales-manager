<template>
    <div>
        <vue-final-modal 
        v-model="$store.state.auth.status"
        classes="modal-container"
        content-class="modal-content">   
            <div v-if="$store.state.auth.success">
                <div class="pt-12 pb-5">    
                    <img src="/icons/success.svg" alt="" class="w-40 mx-auto" >
                </div>
                <p class="text-center">A new {{ $store.state.auth.success.type }} has been created</p>
            </div>
            <div v-else>
                <div class="pt-12 pb-5">    
                    <img src="/icons/error.svg" alt="" class="w-40 mx-auto">
                </div>
                <p class="text-center">Error creating {{ $store.state.auth.success.type }}.</p>
            </div>
            <div v-show="$store.state.auth.onboard">
                <div class="pt-12 pb-5"> 
                    <img src="/icons/onboard.svg" alt="" class="w-40 mx-auto">
                </div>
                <p class="text-center">Sales agents has Successfully onboarded.</p>
            </div>
            <div class="flex items-center justify-end mt-4">
                <button @click="closeModal" class="bg-blue-base py-4 px-5 text-white text-medium rounded-md focus:outline-none w-full">
                    Back to dashboard
                </button>
            </div>
           
        </vue-final-modal>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapMutations } = createNamespacedHelpers('auth');
    export default{
        props:{
            status: Object
        },
        data(){
            return{
                showModal:true
            };
        },
        methods:{
            ...mapMutations(["updateResponseStatus"]),
            closeModal(){
                this.updateResponseStatus(false)
            }
        },
        mounted(){
            // console.log(this.status.type)
        }
    }
</script>