export default {
    data(){
        return {
            listUsers:[],
            unmappedRegionUser:[],
        };
    },
    computed:{
        listRsmUsers() {
            return this.unmappedRegionUser.filter((item) => {
                return item.role.name === 'RSM';
            })
        },
        listTsoUsers() {
            return this.listUsers.filter((item) => {
                return item.role.name === 'TSO';
            })
        }
    },
    methods:{
        async allState(){
            try{
                const res = await this.state();
                this.states = res.data;
            } catch(err) {
                this.errorCatchy(err)
            }
        },
        async fetchUnmappedUser(){
            try{
                const res = await this.unMappedRegionUser();
                this.unmappedRegionUser = res.data
            } catch (err) {
                // this.errorCatchy(err)
            }
        },

        async assignRegionUser() {
            try{
                const res = await this.fetchAllUsers({role:'',size:1000,email:'',page:1})
                this.listUsers = res.data;
                // console.log(res)
            } catch(err) {
                // this.errorCatchy(err)
            }
        },
    }
}
