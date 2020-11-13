class ParentRolesGuildMemberUpdateListener {

    constructor(config){
        this.config = config;
        this.parentRoles = config.parentRoles;
    }

    async execute(oldMember, newMember) {


        let oldRolesValues = oldMember.roles.cache.values();
        let newRolesValues = newMember.roles.cache.values();

        let oldRoles = [];
        let newRoles = [];

        for(const oldRole of oldRolesValues){
            oldRoles.push(oldRole.id);
        }

        for(const newRole of newRolesValues){
            newRoles.push(newRole.id);
        }

        //roles haven't changed, don't go further
        if(JSON.stringify(oldRoles) == JSON.stringify(newRoles)) return;

        let rolesToAdd = [];
        let rolesToRemove = [];

        for(let parentRoleIdx in this.parentRoles){
            let parentRoleId = this.parentRoles[parentRoleIdx].parentRoleId;
            let childrenRoles = this.parentRoles[parentRoleIdx].childrenRoles;

            let hasAnyChildrenRoles = newRoles.some(role => childrenRoles.includes(role));
            if(newRoles.includes(parentRoleId) && !hasAnyChildrenRoles){
                rolesToRemove.push(parentRoleId);
            } else if(!newRoles.includes(parentRoleId) && hasAnyChildrenRoles){
                rolesToAdd.push(parentRoleId);
            }
        }

        if(rolesToAdd.length > 0){
            newMember.roles.add(rolesToAdd);
        }

        if(rolesToRemove.length > 0){
            newMember.roles.remove(rolesToRemove);
        }
    }
}

module.exports = ParentRolesGuildMemberUpdateListener;