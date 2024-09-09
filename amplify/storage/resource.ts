import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'Appimages',
  access: (allow) => ({
    'myImage/*': [
      allow.groups(['STAFF']).to(['read', 'write', 'delete']),
      allow.groups(['STUDENTS']).to(['read']),
    ]
  })
});