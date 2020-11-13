


class ParentRolesGuildMemberUpdateListener {

    constructor(config){
        this.config = config;
        this.parentRoles = config.parentRoles;
    }

    async execute(oldMember, newMember) {
        let oldRoles = oldMember.roles.cache.values;
        let newRoles = newMember.roles.cache.values;

        //roles haven't changed, don't go further
        if(JSON.stringify(oldRoles) == JSON.stringify(newRoles)) return;

        let rolesToAdd = [];
        let rolesToRemove = [];

        for(let parentRole in this.parentRoles){
            let parentRoleId = parentRole.parentRoleId;
            let childrenRoles = parentRole.childrenRoles;

            let hasAnyChildrenRoles = newRoles.some(role => childrenRoles.includes(role));
            if(newRoles.includes(parentRoleId) && !hasAnyChildrenRoles){
                rolesToRemove.push(parentRoleId);
            } else if(!newRoles.includes(parentRoleId) && hasAnyChildrenRoles){
                rolesToAdd.push(parentRoleId);
            }
        }

        if(rolesToAdd.length > 0){
            newRoles.roles.add(rolesToAdd);
        }

        if(rolesToRemove.length > 0){
            newRoles.roles.remove(rolesToRemove);
        }
    }
}

module.exports = ParentRolesGuildMemberUpdateListener;