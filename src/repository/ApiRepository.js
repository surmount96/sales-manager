import axios from "axios"
axios.interceptors.response.use(response => response.data)
axios.defaults.headers.common['Content-Type'] = 'application/json';
// Default setup for Authorization
const token = JSON.parse(localStorage.getItem('SEF_token'));
if(token) {

    axios.interceptors.request.use(function (config) {
        config.headers.Authorization =  `Bearer ${token}`;
        return config;
    });
}
const url = process.env.VUE_APP_URL;


export default {
    allUsers(payload){
        return axios.get(`${url}core/users?email=${payload.email}&role=${payload.role}&size=${payload.size}&page=${payload.page}`);
    },
    userBulkUpload(payload){
        return axios.post(`${url}core/users/bulk-upload`,payload);
    },
    login(payload){
        return axios.post(`${url}auth/login`,payload); 
    },

    //Regions
    region(payload){
        return axios.get(`${url}core/regions?size=${payload.size}&page=${payload.page}`);
    },
    unmappedUserRegion(){
        return axios.get(`${url}core/regions/users/unmapped`);
    },
    mapRegionUser(payload){
        return axios.put(`${url}core/regions/${payload.id}/users`,payload);
    },
    listRegionUser(payload){
        return axios.get(`${url}core/regions/${payload.id}/users?role=${payload.role}`);
    },
    mapAssUserToTerritory(payload){
        return axios.put(`${url}core/regions/${payload.id}/area-sales-officers`,payload);
    },

    //Territory
    unmappedUserTerritory(payload){
        return axios.get(`${url}core/regions/${payload.id}/territories/users/unmapped?role=${payload.role}`);
    },
    mapTerritoryUser(payload){
        return axios.put(`${url}core/regions/territories/${payload.id}/users`,payload);
    },
    listTerritoryUser(payload){
        return axios.get(`${url}core/regions/territories/${payload.id}/users`);
    },
    states(){
        return axios.get(`${url}system/states`); 
    },
    profileUser(payload){
        return axios.get(`${url}core/user-profile`);
    },
    createUser(payload){
        return axios.post(`${url}core/users`,payload);
    },
    singleUser(payload){
        return axios.get(`${url}core/users/${payload.id}`,payload);
    },
    deleteUser(payload){
        return axios.put(`${url}core/users/${payload.id}/delist`,payload);
    },
    updateUserProfile(payload){
        return axios.patch(`${url}core/user-profile`,payload);
    },
    territories(payload){
        return axios.post(`${url}core/regions/${payload.region_id}/territories`,payload);
    },
    singleTerritory(payload){
        return axios.get(`${url}core/regions/territories/${payload.id}`,payload);
    },
    getTerritory(payload){
        return axios.get(`${url}core/regions/${payload.id}/territories`,payload);
    },
    createRegion(payload){
        return axios.post(`${url}core/regions`,payload);
    },
    singleRegion(payload){
        return axios.get(`${url}core/regions/${payload.id}`);
    },
    updateRegion(payload){
        return axios.put(`${url}core/regions/${payload.id}`,payload);
    },
    updateUserRole(payload){
        return axios.put(`${url}core/users/${payload.id}`,payload);
    },
    updateTerritory(payload){
        return axios.put(`${url}core/regions/territories/${payload.id}`,payload);
    },
    mapTerritory(payload){
        return axios.put(`${url}core/regions/territories/${payload.id}/lga-mapping`,payload);
    },
    lgas(payload){
        return axios.get(`${url}core/regions/${payload.id}/lgas`);
    },
    moveTerritory(payload){
        return axios.put(`${url}core/regions/territories/${payload.id}/move`,payload);
    },
    territoryCount(payload){
        return axios.get(`${url}core/dashboard/regions/${payload.id}/territories/count`);
    },
    roles(){
        return axios.get(`${url}core/roles`);
    },
    changeRolePermission(payload){
        return axios.put(`${url}core/roles/${payload.id}`,payload);
    },
    singleRole(payload){
        return axios.get(`${url}core/roles/${payload.id}`);
    },


    //  Target
    allTarget(payload){
        return axios.get(`${url}core/targets`);
    },
    userTarget(payload){
        return axios.get(`${url}core/users/${payload.id}/targets`);
    },
    fetchTargetByPeriod(payload){
        return axios.get(`${url}core/users/${payload.user_id}/targets/${payload.period}`);
    },
    deleteUserTarget(payload){
        return axios.delete(`${url}core/users/${payload.id}/targets`);
    },
    createUpdateTarget(payload){
        return axios.put(`${url}core/users/${payload.id}/targets`,payload);
    },
    bulkTarget(payload){
        return axios.put(`${url}core/users/targets/bulk`,payload);
    },
    //Region Target section Two
    fetchRegionBudgetTarget(payload){
        return axios.get(`${url}core/budgets/${payload.id}/regions/targets`);
    },
    createRegionBudgetTarget(payload){
        return axios.post(`${url}core/budgets/${payload.id}/regions/targets`,payload);
    },
    updateRegionBudgetTarget(payload){
        return axios.put(`${url}core/budgets/regions/targets/${payload.id}`,payload);
    },

    //Territory Target section Two
    fetchTerritoryBudgetTarget(payload){
        return axios.get(`${url}core/budgets/${payload.budgetId}/regions/${payload.regionId}/territories/targets`);
    },
    createTerritoryBudgetTarget(payload){
        return axios.post(`${url}core/budgets/${payload.budgetId}/regions/${payload.regionId}/territories/targets`,payload);
    },
    updateTerritoryBudgetTarget(payload){
        return axios.put(`${url}core/budgets/regions/territories/targets/${payload.id}`,payload);
    },

    authUserTarget(){
        return axios.get(`${url}core/targets`);
    },
    currentUserTarget(){
        return axios.get(`${url}core/dashboard/current-target/sales`);
    },

    //User Target section Two
    fetchUserBudgetTarget(payload){
        console.log(payload)
        return axios.get(`${url}core/budgets/${payload.budgetId}/territories/${payload.territoryId}/users/targets`);
    },
    createUserBudgetTarget(payload){
        return axios.post(`${url}core/budgets/${payload.budgetId}/territories/${payload.territoryId}/users/targets`,payload);
    },
    updateUserBudgetTarget(payload){
        return axios.put(`${url}core/budgets/territories/users/targets/${payload.id}`,payload);
    },

    mapAgentToStaff(payload){
        return axios.post(`${url}core/users/${payload.id}/agents`,payload);
    },


    createAgent(payload){
        return axios.post(`${url}core/agents/upload`,payload);
    },
    agents(payload){
        return axios.get(`${url}core/agents?size=${payload.size}&partnerId=${payload.partnerId}&page=${payload.page}&territoryId=${payload.territoryId}`);
    },
    assignAgentToTerritory(payload){
        return axios.put(`${url}core/regions/territories/${payload.id}/agents`,payload);
    },
    updateAgentTerritory(payload){
        return axios.put(`${url}core/agents/${payload.id}/territory`,payload);
    },
    agentCount(){
        return axios.get(`${url}core/dashboard/summary`);
    },

    //Assign role permission
    assignRolePermission(payload){
        return axios.put(`${url}core/roles/${payload.id}`,payload);
    },

    //Budgets
    budgets(payload){
        return axios.get(`${url}core/budgets?size=${payload.size}&page=${payload.page}`);
    },

    createBudgets(payload){
        return axios.post(`${url}core/budgets`,payload);
    },

    showBudgets(payload){
        return axios.get(`${url}core/budgets/${payload.id}`);
    },
    updateBudgets(payload){
        return axios.put(`${url}core/budgets/${payload.id}`,payload);
    },
    deleteBudgets(payload){
        return axios.delete(`${url}core/budgets/${payload.id}`);
    },

    //Budget type
    getBudgetTypes(){
        return axios.get(`${url}core/budget-types`);
    },
    createBudgetTypes(payload){
        return axios.post(`${url}core/budget-types`,payload);
    },
    updateBudgetTypes(payload){
        return axios.put(`${url}core/budget-types/${payload.id}`,payload);
    },
    deleteBudgetTypes(payload){
        return axios.delete(`${url}core/budget-types/${payload.id}`);
    },

    //Permissions
    permissionModules(){
        return axios.get(`${url}core/permissions/modules`);
    },
    allPermissions(){
        return axios.get(`${url}core/permissions`);
    },
    //

    //Uploaded Files
    getFiles(payload){
        return axios.get(`${url}core/system/uploaded-files?page=${payload.page}&size=${payload.size}&sort=${payload.sort}`);
    },
    showSingleFiles(payload){
        return axios.get(`${url}core/system/uploaded-files/${payload.id}`);
    },
    deleteFiles(payload){
        return axios.delete(`${url}core/system/uploaded-files/${payload.id}`);
    },
}
