import { RepositoryFactory as Repo } from "@/repository/RepositoryFactory";
import axios from "axios"
const PR = Repo.get('request')

const state = {
    status: false,
    modal:false,
    callbackurl:false,
    userModal:false,
    onboard:false,
    roles:[],
    admin:false,
    user: JSON.parse(localStorage.getItem('SEF_user')),
    token: JSON.parse(localStorage.getItem('SEF_token')),
    loader:false,
    regions:{},
    territory:{},
    success:{}
};

const getters = {
    users(state) {
        return state.user;
    },
    role(state) {
        return state.user.role.name;
    }
}

const mutations = {
    updateResponseStatus(state,data){
        state.status = data;
    },
    updateRegionValue(state,data){
        state.regions = data;
    },
    updateCallbackUrl(state,data){
        state.callbackurl = data
    },
    updateTerritoryValue(state,data){
        state.territory = data;
    },
    displayMessage(state,data){
        state.success = data
    },
    showModalDetails(state,data){
        state.modal = data;
    },
    onboardModal(state,data){
        state.onboard = data
    },
    toggleUserModal(state,data){
        state.userModal = data;
    },
    updateUserRoles(state,data){
        state.roles = data;
    },
    updateToken(state,data) {
        state.token = data.id_token;
        localStorage.setItem('SEF_token',JSON.stringify(data.id_token));
    },
    profiledUser(state,data) {
        state.user = data
        localStorage.setItem('SEF_user',JSON.stringify(data));
    },
    setAdminstatus(state){
        state.admin = true;
    },
    updateLoader(state,data){
        state.loader = data
    }

};

const actions = {
    async login({commit},credentials){
        const res = await PR.login(credentials);
        axios.get(`${process.env.VUE_APP_URL}core/user-profile`,{
            headers: {
                Authorization: `Bearer ${res.token}`
            }}).then(response => {
                if(response && response.message == 'Operation Successful!') {
                    // localStorage.setItem('SEF_user',JSON.stringify(response.data));
                    commit('profiledUser',response.data)
                    localStorage.setItem('SEF_token',JSON.stringify(res.token));
                }
            }).catch(err => {console.log(err)})

            return true;
    },
    async fetchAllUsers({commit},payload){
        const res = await PR.allUsers(payload);
        return res;
    },
    async uploadStaffs({commit},payload){
        const res = await PR.userBulkUpload(payload);
        return res;
    },
    async createSingleUser({commit},payload){
        const res = await PR.createUser(payload);
        return res;
    },
    async fetchSingleUser({commit},payload){
        const res = await PR.singleUser(payload);
        return res;
    },
    async profileUser({commit},payload){
        const res = await PR.profileUser();
        return res;
    },
    async logRegion({commit},payload){
        const res = await PR.createRegion(payload);
        return res;
    },
    async changeRegion({commit},payload){
        const res = await PR.updateRegion(payload);
        return res;
    },
    async mappingUserToRegion({commit},payload){
        const res = await PR.mapRegionUser(payload);
        return res;
    },
    async userInRegion({commit},payload){
        const res = await PR.listRegionUser(payload);
        return res;
    },
    async unMappedRegionUser({commit}){
        const res = await PR.unmappedUserRegion();
        return res;
    },
    async unMappedAgentsToTerritory({commit},payload){
        const res = await PR.unmappedUserTerritory(payload);
        return res;
    },
    async fetchLgas({commit},payload){
        const res = await PR.lgas(payload);
        return res;
    },
    async mappingUserToTerritory({commit},payload){
        const res = await PR.mapTerritoryUser(payload);
        return res;
    },
    async fetchUsersInTerritory({commit},payload){
        const res = await PR.listTerritoryUser(payload);
        return res;
    },
    async updateProfile({commit},payload){
        const res = await PR.updateUserProfile(payload);
        return res;
    },
    async state({commit}){
        const res = await PR.states();
        return res;
    },
    async fetchRole({commit}){
        const res = await PR.roles();
        return res;
    },
    async showRole({commit},payload){
        const res = await PR.singleRole(payload);
        return res;
    },
    async assignPermissionToRole({commit},payload){
        const res = await PR.changeRolePermission(payload);
        return res;
    },
    async uploadAgents({commit},payload){
        const res = await PR.createAgent(payload);
        return res;
    },
    async fetchAgents({commit},payload){
        const res = await PR.agents(payload);
        return res;
    },
    async fetchRegion({commit},payload){
        const res = await PR.region(payload);
        return res;
    },
    async fetchIndividualRegion({commit},payload){
        const res = await PR.singleRegion(payload);
        return res;
    },
    async delist({commit},payload) {
        const res  = await PR.deleteUser(payload);
        return res;
    },
    async createTerritory({commit},payload) {
        const res  = await PR.territories(payload);
        return res;
    },
    async fetchSingleTerritory({commit},payload) {
        const res  = await PR.singleTerritory(payload);
        return res;
    },
    async fetchTerritory({commit},payload){
        const res = await  PR.getTerritory(payload);
        return res;
    },
    async changeTerritory({commit},payload) {
        const res  = await PR.updateTerritory(payload);
        return res;
    },
    async countingTerritory({commit},payload) {
        const res  = await PR.territoryCount(payload);
        return res;
    },
    async territoryMove({commit},payload) {
        const res  = await PR.moveTerritory(payload);
        return res;
    },
    async territoryMap({commit},payload) {
        const res  = await PR.mapTerritory(payload);
        return res;
    },
    async fetchAllUserTarget({commit},payload) {
        const res  = await PR.allTarget(payload);
        return res;
    },
    async fetchUserTarget({commit},payload) {
        const res  = await PR.userTarget(payload);
        return res;
    },
    async assignTarget({commit},payload){
        const res = await  PR.createUpdateTarget(payload);
        return res;
    },
    async targetByPeriod({commit},payload){
        const res = await  PR.fetchTargetByPeriod(payload);
        return res;
    },
    async deleteTarget({commit},payload){
        const res = await  PR.deleteUserTarget(payload);
        return res;
    },
    async fetchUploadedFiles({commit},payload){
        const res = await  PR.getFiles(payload);
        return res;
    },
    async singleUploadedFiles({commit},payload){
        const res = await  PR.showSingleFiles(payload);
        return res;
    },
    async deleteUploadedFiles({commit},payload){
        const res = await  PR.deleteFiles(payload);
        return res;
    },
    async createBulkTarget({commit},payload){
        const res = await  PR.bulkTarget(payload);
        return res;
    },
    async updateRole({commit},payload){
        const res  = await PR.updateUserRole(payload);
        return res;
    },
    async countAgent({commit},payload){
        const res  = await PR.agentCount(payload);
        return res;
    },
    async logout(){
        localStorage.clear();
        window.location = '/';
        return true;
    },

    //Budgets
    async fetchBudget({commit},payload){
        const res = PR.budgets(payload);
        return res
    },
    async storeBudget({commit},payload){
        const res = PR.createBudgets(payload);
        return res
    },
    async fetchSingleBudgets({commit},payload){
        const res = PR.showBudgets(payload);
        return res
    },
    async updateSingleBudgets({commit},payload){
        const res = PR.updateBudgets(payload);
        return res
    },

    async getRegionTargets({commit},payload){
        const res = PR.fetchRegionBudgetTarget(payload);
        return res
    },
    async createTargetForRegion({commit},payload){
        const res = PR.createRegionBudgetTarget(payload);
        return res
    },
    async updateTargetForRegion({commit},payload){
        const res = PR.updateRegionBudgetTarget(payload);
        return res
    },

    async getTerritoryTargets({commit},payload){
        const res = PR.fetchTerritoryBudgetTarget(payload);
        return res
    },
    async createTargetForTerritory({commit},payload){
        const res = PR.createTerritoryBudgetTarget(payload);
        return res
    },
    async updateTargetForTerritory({commit},payload){
        const res = PR.updateTerritoryBudgetTarget(payload);
        return res
    },


    async assignAssUserToTerritory({commit},payload){
        const res = PR.mapAssUserToTerritory(payload);
        return res
    },


    async getUserTargets({commit},payload){
        const res = PR.fetchUserBudgetTarget(payload);
        return res
    },
    async createTargetForUser({commit},payload){
        const res = PR.createUserBudgetTarget(payload);
        return res
    },
    async updateTargetForUser({commit},payload){
        const res = PR.updateUserBudgetTarget(payload);
        return res
    },

    async agentToStaffMapping({commit},payload){
        const res = PR.mapAgentToStaff(payload);
        return res
    },

    async mapAgentToTerritory({commit},payload){
        const res = PR.assignAgentToTerritory(payload);
        return res
    },

    async updateAgent({commit},payload){
        const res = PR.updateAgentTerritory(payload);
        return res
    },

    async myTarget({commit},payload){
        const res = PR.authUserTarget();
        return res
    },
    async currentTarget({commit},payload){
        const res = PR.currentUserTarget();
        return res
    },


    async deleteSingleBudgets({commit},payload){
        const res = PR.deleteBudgets(payload);
        return res
    },

//    Budget Types
    async fetchBudgetTypes(){
        const res = PR.getBudgetTypes();
        return res
    },
    async storeBudgetTypes({commit},payload){
        const res = PR.createBudgetTypes(payload);
        return res
    },
    async updateSingleBudgetTypes({commit},payload){
        const res = PR.updateBudgetTypes(payload);
        return res
    },
    async deleteSingleBudgetTypes({commit},payload){
        const res = PR.deleteBudgetTypes(payload);
        return res
    },


//    Permission
    async fetchPermissionModules(){
        const res = PR.permissionModules();
        return res
    },
    async fetchPermission(){
        const res = PR.allPermissions();
        return res
    },



}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}
