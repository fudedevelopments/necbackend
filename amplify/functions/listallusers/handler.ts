import { Schema } from "../../data/resource";
import { env } from "$amplify/env/list-user-in-group"
import { CognitoIdentityProviderClient, ListUsersCommand } from "@aws-sdk/client-cognito-identity-provider";

type Handler = Schema["listUsers"]["functionHandler"]
const client = new CognitoIdentityProviderClient()

export const handler: Handler = async (event) => { 
    const command = new ListUsersCommand({
        UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
    })
    const response = await client.send(command)
    return response
}


