<template>
    <div class="flex">
        <div class=" lg:w-7/12 md:w-7/12 w-full mb-4 flex items-center justify-center flex-col" 
            style="min-height:100vh;" >
            <img src="@/assets/img/login.svg" alt="" class="w" style="width:70%">
        </div>
        <div class="bg-white lg:w-5/12 md:w-5/12 w-full mb-4 pt-16 ">
            <div class="w-64 mx-auto text-center">
              <img src="@/assets/img/sale-logo.png" alt="" class="h-24 w-24 mx-auto">
            </div>

            <div class="py-20 px-10">
                <div class="mt-4 mb-8">
                    <button :disabled="!googleButton" @click="googleAuth" class="border border-indigo flex justify-center items-center w-full py-3 px-5 rounded-md text-medium focus:outline-none">
                        <img src="@/assets/img/google.svg" alt="" class="w-8">
                        <span class="ml-4">
                            Login with Google
                        </span>
                    </button>
                </div>
                <form>
                    <div class="mb-4"> 
                        <label for="" >Email</label>
                        <input type="email" @keydown="validateEmail" v-model="form.email" class="w-full plc text-green-dark py-4 px-4 text-medium border border-indigo focus:outline-none" placeholder="example@mail.com">
                        <small class="text-red-dark">{{ errors['email'] }}</small>
                    </div>
                    <div class="mb-4">
                        <label for="">Password</label>
                        <input type="password" v-model="form.password" @keydown="validatePassword" class="w-full plc py-4 px-4 text-medium border border-indigo focus:outline-none" placeholder="*********">
                        <small class="text-red-dark">{{ errors['password'] }}</small>
                    </div>
                    <div>
                        <button @click.prevent="signIn" :disabled="!activateButton" class="py-5 text-white w-full text-large bg-dark-100 rounded-md">{{ message }}</button>
                    </div>
                </form>
            </div>
        </div>
        
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import axios from "axios";
const { mapActions,mapMutations } = createNamespacedHelpers('auth');
//admin@capricorndigi.com
export default {
    data() {
        return {
            message:'Login',
            googleButton:false,
            errors:[],
            form: {
                email: '',
                password:''
            }
        };
    },
    computed:{
        activateButton() {
            return (this.form.email && this.form.password);
        }
    },
    created(){
        setTimeout(() => {
            this.googleButton = true
        },2000)

      localStorage.clear();
    },
    methods: {
        ...mapActions(["login","profileUser","gAuths"]),
        ...mapMutations(["updateToken","profiledUser","updateLoader"]),
        validateEmail(){
            if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.form.email)){
                this.errors['email'] = '';
            } else {
                this.errors['email'] = 'Invalid email entry';
            }
        },
        validatePassword(){
            if(this.form.email){
                this.errors['password'] = '';
            } else {
                this.errors['password'] = 'Password can not be empty.';
            }
        },
        async signIn(){
            this.message = 'Logging in ....';
            this.updateLoader(true)
            try {
                const res = await this.login(this.form);

                if(res) {

                    this.$toast.success(`Login successful`);
                    setTimeout(() => {
                        window.location.href = '/user/dashboard';
                        // this.updateLoader(false)
                    },2000)
                    
                }
            } catch(err) {
                if(err.response.status === 400) {
                    this.$toast.error(err.response.data.error.message);
                    this.message = 'Login';
                }
                if(err.response.status === 422) {
                    this.$toast.error(err.response.data.error.message);
                    this.errors = err.response.data.error.reasons;
                    this.message = 'Login';
                }
                this.updateLoader(false)
            }
        },
        async googleAuth(){
            try{
                this.updateLoader(true)
                const authCode = await this.$gAuth.signIn();
                // console.log(authCode.getAuthResponse())
              this.updateToken(authCode.getAuthResponse());
                this.verifyToken();
            } catch(err) {
                if(!err){
                  this.$toast.error('Cookies are not enabled in current environment')
                }
                this.updateLoader(false)
            }
        },
        async verifyToken() {
            const token = this.$store.state.auth.token;
            if(token){
              try {
                  const res = await axios.get(`${process.env.VUE_APP_URL}core/user-profile`,{
                    headers: {
                      Authorization: `Bearer ${token}`
                    },
                  });
                // console.log(token)

                // console.log(res)
                if(res && res.message == 'Operation Successful!') {
                  this.updateLoader(false)
                  this.profiledUser(res.data);
                  this.$toast.success(`Login successful`);
                  this.message = 'Logging in ....';
                  const role = res.data.role.name;

                  if(role == 'TSO' || role == 'ASS' || role == 'RSM' || role == 'HOS' || role == 'SALES_REP' ){
                    window.location.href = '/user/dashboard';
                    // this.$router.push('/user/dashboard')
                  }
                }

              }catch (err) {
                this.$toast.error(err.response.data.error.message);
                localStorage.clear();
                this.updateLoader(false)
              }
            }
            // const res = await this.profileUser();
            // console.log(res)
        }
    }
}
</script>
<style scoped>

</style>
