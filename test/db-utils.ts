import { faker } from '@faker-js/faker'
import { UniqueEnforcer } from 'enforce-unique'

const uniqueUsernameEnforcer = new UniqueEnforcer()

export function createUser() {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  const username = uniqueUsernameEnforcer.enforce(() =>
    faker.internet
      .userName({
        firstName: firstName,
        lastName: lastName,
      })
      .toLowerCase()
  )

  return {
    username,
    name: `${firstName} ${lastName}`,
    email: `${username}@example.com`,
  }
}
