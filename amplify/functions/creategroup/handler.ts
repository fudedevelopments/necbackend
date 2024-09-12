// import { Schema } from "../../data/resource";
// import{env} from "$amplify/env/create-group"
// import { CognitoIdentityProviderClient, CreateGroupCommand } from "@aws-sdk/client-cognito-identity-provider"; 
// type Handler = Schema["createGroup"]["functionHandler"]
// const client = new CognitoIdentityProviderClient()

// export const handler : Handler = async (event) => {
//   const { groupName } = event.arguments
//   const command = new CreateGroupCommand({
//      UserPoolId : env.AMPLIFY_AUTH_USERPOOL_ID,
//      GroupName: groupName,
//   })
//   const response = await client.send(command)
//   return response.Group!.GroupName!
// }
