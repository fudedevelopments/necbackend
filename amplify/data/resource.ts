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
      registerurl: a.string(),
      ondutyrequest : a.hasMany("Ondutyrequest", "eventid")
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
  
  ClassRoom : a
    .model({
      classRoomname: a.string(),
      hod: a.hasMany("Hod", "classRoomid"),
      ac: a.hasMany("Ac", "classRoomid"),
      proctors: a.hasMany("Proctor", "classRoomid"),
      students : a.hasMany("Student", "classRoomid"),
    })
    .authorization(allow => [
      allow.groups(["ADMINS", "STAFF"])
    ]),
  
   Hod : a
    .model({
      hodname: a.string(),
      email: a.email(),
      classRoomid: a.id(),
      classRoom: a.belongsTo("ClassRoom", "classRoomid")
    })
    .authorization(allow => [
      allow.groups(["ADMINS", "STAFF"])
    ]),

  Ac: a
    .model({
      acname: a.string(),
      email: a.email(),
      classRoomid: a.id(),
      classRoom: a.belongsTo("ClassRoom", "classRoomid")
    })
    .authorization(allow => [
      allow.groups(["ADMINS", "STAFF"])
    ]),
  Proctor: a
    .model({
      proctorname: a.string(),
      email: a.email(),
      classRoomid: a.id(),
      classRoom: a.belongsTo("ClassRoom", "classRoomid"),
      students : a.hasMany("Student", "proctorid")
    })
    .authorization(allow => [
      allow.groups(["ADMINS", "STAFF"])
    ]),
  
  Student: a.model({
    studentname: a.string(),
    email: a.email(),
    classRoomid: a.id(),
    classRoom: a.belongsTo("ClassRoom", "classRoomid"),
    proctorid: a.id(),
    proctor: a.belongsTo("Proctor", "proctorid")!,
  }).authorization(allow => [
    allow.groups(["ADMINS", "STAFF"])
  ]),
  
 
  
  Ondutyrequest : a
    .model({
      ondutyname: a.string(),
      email: a.email(),
      eventid: a.id(),
      events: a.belongsTo("EventDetatils", "eventid"),
    })
    .authorization(allow => [
      allow.groups(["ADMINS", "STAFF"])
    ]),
});


export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  name: "necproject",
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});