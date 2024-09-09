import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { addUserToGroup } from "../functions/addusertogroup/resources";
import { createUser } from "../functions/createuser/resources";
import { listUsersInGroup } from "../functions/listusersingroup/resource";
import { listUsers } from "../functions/listallusers/resources";
import { CreateGroup } from "../functions/creategroup/resource";

const schema = a.schema({
  EventDetatils: a
    .model({
      images: a.string().array(),
      eventname: a.string(),
      eventdetails: a.string(),
      date: a.string(),
      location: a.string(),
      registerurl: a.string()
    })
    .authorization(allow => [
      allow.group("STUDENTS").to(['read']),
      allow.groups(["ADMINS", "STAFF"])]),
  
  addUserToGroup: a
    .mutation()
    .arguments({
      userId: a.string().required(),
      groupName: a.string().required(),
    })
    .authorization((allow) => [allow.group("ADMINS")])
    .handler(a.handler.function(addUserToGroup))
    .returns(a.json()),
  
  createUser: a
    .mutation()
    .arguments({
      username: a.string().required(),
      email: a.email().required(),
      password: a.string().required(),
    })
    .authorization((allow) => [allow.group("ADMINS")])
    .handler(a.handler.function(createUser))
    .returns(a.json()),
  
  listUsersInGroup: a
    .query()
    .arguments({
      groupName: a.string().required(),
    })
    .authorization((allow) => [allow.group("ADMINS")])
    .handler(a.handler.function(listUsersInGroup))
    .returns(a.json()),
  listUsers: a
    .query()
    .authorization((allow) => [allow.group("ADMINS")])
    .handler(a.handler.function(listUsers))
    .returns(a.json()),
  createGroup : a
    .mutation()
    .arguments({
      groupName: a.string().required(),
    })
    .handler(a.handler.function(CreateGroup))
    .authorization((allow) => [allow.group("ADMINS")])
    .returns(a.json()),

  proctorstatus: a.enum(["PENDING", "APPROVED", "REJECTED"]),
  acstatus: a.enum(["PENDING", "APPROVED", "REJECTED"]),
  finalstatus: a.enum(["PENDING", "APPROVED", "REJECTED"]),
  OnDutyRequest: a
    .model({
      studentname: a.string(),
      stdentemail: a.string(),
      eventname: a.string(),
      date: a.string(),
      location: a.string(),
      registerurl: a.string(),
      documents: a.string().array(),
      proctorstatus: a.ref("proctorstatus"),
      proctorcomments: a.string(),
      acstatus: a.ref("acstatus"),
      accomments: a.string(),
      finalstatus: a.ref("finalstatus"),
      finalcomments: a.string(),
    }).authorization(allow => [
      allow.owner(),
    ]),
    
  
});


export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});