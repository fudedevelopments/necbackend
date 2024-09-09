import { defineAuth } from '@aws-amplify/backend';
import { addUserToGroup } from '../functions/addusertogroup/resources';
import { createUser } from '../functions/createuser/resources';
import { listUsersInGroup } from '../functions/listusersingroup/resource';
import { listUsers } from '../functions/listallusers/resources';


export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  triggers: {
    
  },
  groups: ["ADMINS","STAFF","STUDENTS"],
  access: (allow) => [
    allow.resource(createUser).to(["createUser"]),
    allow.resource(addUserToGroup).to(["addUserToGroup"]),
    allow.resource(listUsersInGroup).to(["listUsersInGroup"]),
    allow.resource(listUsers).to(["listUsers"])
  ],
});


