
export default {
    methods:{
        errorCatchy(err) {
            const status = err.response.status;
            this.updateLoader(false);
            console.log(err.response)
            if(status === 400) {
                this.$toast.error(err.response.data.error.message);
                return
            }

            if(err.response.status === 422) {
                this.$toast.error(err.response.data.error.message);
                this.errors = err.response.data.error.reasons;
                return
            }

            if(status !== 403){
                this.$toast.error(err.response.data.error.message);
                return
            }
        }
    }
}
