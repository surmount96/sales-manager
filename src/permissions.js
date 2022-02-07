
export default {
    userCreatePermission(state){
        const permission = state;
        if(permission && permission.User) {
            const value = permission.User.filter((item) => {
                return item.name === 'user:create'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    userIndexPermission(state){
        const permission = state;
        if(permission && permission.User) {
            const value = permission.User.filter((item) => {
                return item.name === 'user:index'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    userSinglePermission(state){
        const permission = state;
        if(permission && permission.User) {
            const value = permission.User.filter((item) => {
                return item.name === 'user:show'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    userUpdatePermission(state){
        const permission = state;
        if(permission && permission.User) {
            const value = permission.User.filter((item) => {
                return item.name === 'user:update'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    userDelistPermission(state){
        const permission = state;
        if(permission && permission.User) {
            const value = permission.User.filter((item) => {
                return item.name === 'user:delist'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    userBulkUploadPermission(state){
        const permission = state;
        if(permission && permission.User) {
            const value = permission.User.filter((item) => {
                return item.name === 'user:bulk-upload'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },


    regionCreatePermission(state){
        const permission = state;
        if(permission && permission.Region) {
            const value = permission.Region.filter((item) => {
                return item.name === 'region:create'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    regionIndexPermission(state){
        const permission = state;
        if(permission && permission.Region) {
            const value = permission.Region.filter((item) => {
                return item.name === 'region:index'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    regionSinglePermission(state){
        const permission = state;
        if(permission && permission.Region) {
            const value = permission.Region.filter((item) => {
                return item.name === 'region:show'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    regionUpdatePermission(state){
        const permission = state;
        if(permission && permission.Region) {
            const value = permission.Region.filter((item) => {
                return item.name === 'region:update'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    regionAssMappingPermission(state){
        const permission = state;
        if(permission && permission.Region) {
            const value = permission.Region.filter((item) => {
                return item.name === 'region:user:ass-mapping'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    regionUserMapPermission(state){
        const permission = state;
        if(permission && permission.Region) {
            const value = permission.Region.filter((item) => {
                return item.name === 'region:user:mapping'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },


    budgetCreatePermission(state){
        const permission = state;
        if(permission && permission.Budget) {
            const value = permission.Budget.filter((item) => {
                return item.name === 'budget:create'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    budgetIndexPermission(state){
        const permission = state;
        if(permission && permission.Budget) {
            const value = permission.Budget.filter((item) => {
                return item.name === 'budget:index'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    budgetUpdatePermission(state){
        const permission = state;
        if(permission && permission.Budget) {
            const value = permission.Budget.filter((item) => {
                return item.name === 'budget:update'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    budgetShowPermission(state){
        const permission = state;
        if(permission && permission.Budget) {
            const value = permission.Budget.filter((item) => {
                return item.name === 'budget:show'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    budgetDeletePermission(state){
        const permission = state;
        if(permission && permission.Budget) {
            const value = permission.Budget.filter((item) => {
                return item.name === 'budget:delete'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    territoryCreatePermission(state){
        const permission = state;
        if(permission && permission.Territory) {
            const value = permission.Territory.filter((item) => {
                return item.name === 'territory:create'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    territoryIndexPermission(state){
        const permission = state;
        if(permission && permission.Territory) {
            const value = permission.Territory.filter((item) => {
                return item.name === 'territory:index'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    territoryShowPermission(state){
        const permission = state;
        if(permission && permission.Territory) {
            const value = permission.Territory.filter((item) => {
                return item.name === 'territory:show'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    territoryUpdatePermission(state){
        const permission = state;
        if(permission && permission.Territory) {
            const value = permission.Territory.filter((item) => {
                return item.name === 'territory:update'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    territoryMovePermission(state){
        const permission = state;
        if(permission && permission.Territory) {
            const value = permission.Territory.filter((item) => {
                return item.name === 'territory:move'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    territoryLgaMappingPermission(state){
        const permission = state;
        if(permission && permission.Territory) {
            const value = permission.Territory.filter((item) => {
                return item.name === 'territory:lga-mapping'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    territoryMapStaffPermission(state){
        const permission = state;
        if(permission && permission.Territory) {
            const value = permission.Territory.filter((item) => {
                return item.name === 'territory:user:mapping'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    territoryMapAgentPermission(state){
        const permission = state;
        if(permission && permission.Territory) {
            const value = permission.Territory.filter((item) => {
                return item.name === 'territory:assign-agents'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    agentUploadPermission(state){
        const permission = state;
        if(permission && permission.Agent) {
            const value = permission.Agent.filter((item) => {
                return item.name === 'agent:bulk-upload'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },
    agentIndexPermission(state){
        const permission = state;
        if(permission && permission.Agent) {
            const value = permission.Agent.filter((item) => {
                return item.name === 'agent:index'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    agentUpdatePermission(state){
        const permission = state;
        if(permission && permission.Agent) {
            const value = permission.Agent.filter((item) => {
                return item.name === 'agent:update-territory'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    agentMapPermission(state){
        const permission = state;
        if(permission && permission.Agent) {
            const value = permission.Agent.filter((item) => {
                return item.name === 'agent:user:mapping'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    budgetTypeIndexPermission(state){
        const permission = state;
        if(permission && permission['Budget Type']) {
            const value = permission['Budget Type'].filter((item) => {
                return item.name === 'budget-type:index'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    budgetTypeCreatePermission(state){
        const permission = state;
        if(permission && permission['Budget Type']) {
            const value = permission['Budget Type'].filter((item) => {
                return item.name === 'budget-type:create'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    budgetTypeUpdatePermission(state){
        const permission = state;
        if(permission && permission['Budget Type']) {
            const value = permission['Budget Type'].filter((item) => {
                return item.name === 'budget-type:update'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    budgetTypeDeletePermission(state){
        const permission = state;
        if(permission && permission['Budget Type']) {
            const value = permission['Budget Type'].filter((item) => {
                return item.name === 'budget-type:delete'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },


    regionTargetCreatePermission(state){
        const permission = state;
        if(permission && permission['Region Target']) {
            const value = permission['Region Target'].filter((item) => {
                return item.name === 'region-target:create'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    regionTargetUpdatePermission(state){
        const permission = state;
        if(permission && permission['Region Target']) {
            const value = permission['Region Target'].filter((item) => {
                return item.name === 'region-target:update'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    regionTargetIndexPermission(state){
        const permission = state;
        if(permission && permission['Region Target']) {
            const value = permission['Region Target'].filter((item) => {
                return item.name === 'region-target:index'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    territoryTargetUpdatePermission(state){
        const permission = state;
        if(permission && permission['Territory Target']) {
            const value = permission['Territory Target'].filter((item) => {
                return item.name === 'territory-target:update'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },
    territoryTargetCreatePermission(state){
        const permission = state;
        if(permission && permission['Territory Target']) {
            const value = permission['Territory Target'].filter((item) => {
                return item.name === 'territory-target:create'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },
    territoryTargetIndexPermission(state){
        const permission = state;
        if(permission && permission['Territory Target']) {
            const value = permission['Territory Target'].filter((item) => {
                return item.name === 'territory-target:index'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },


    userTargetUpdatePermission(state){
        const permission = state;
        if(permission && permission['User Target']) {
            const value = permission['User Target'].filter((item) => {
                return item.name === 'user-target:update'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    userTargetCreatePermission(state){
        const permission = state;
        if(permission && permission['User Target']) {
            const value = permission['User Target'].filter((item) => {
                return item.name === 'user-target:create'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    countPermission(state){
        const permission = state;
        if(permission && permission['Dashboard']) {
            const value = permission['Dashboard'].filter((item) => {
                return item.name === 'dashboard:summary'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

    listUploadFilePermission(state){
        const permission = state;
        if(permission && permission['Uploaded File']) {
            const value = permission['Uploaded File'].filter((item) => {
                return item.name === 'system:uploaded-file:index'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },
    showUploadFilePermission(state){
        const permission = state;
        if(permission && permission['Uploaded File']) {
            const value = permission['Uploaded File'].filter((item) => {
                return item.name === 'system:uploaded-file:show'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },
    deleteUploadFilePermission(state){
        const permission = state;
        if(permission && permission['Uploaded File']) {
            const value = permission['Uploaded File'].filter((item) => {
                return item.name === 'system:uploaded-file:delete'
            })
            return value.length > 0 ? true : 0;
        }

        return false;
    },

}
