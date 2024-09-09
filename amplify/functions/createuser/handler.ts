import { Schema } from "../../data/resource";
import { env } from "$amplify/env/create-user"
import { CognitoIdentityProviderClient, AdminCreateUserCommand } from "@aws-sdk/client-cognito-identity-provider"; 
type Handler = Schema["createUser"]["functionHandler"]
const client = new CognitoIdentityProviderClient()

export const handler : Handler = async (event) => {
  const { username, email, password  } = event.arguments
  const command = new AdminCreateUserCommand({
    UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
    Username: email,
    TemporaryPassword: password,
    UserAttributes: [{
      "Name": "name",
      "Value" : username
    }]
  })
  const response = await client.send(command)
  return response.User!.Username!
}