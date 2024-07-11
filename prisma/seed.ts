import { faker } from '@faker-js/faker'

import { prisma } from '~/utils/helpers/db.server'

import { createUser } from '../test/db-utils'

async function seed() {
  console.log('🌱 Seeding...')
  console.time(`🌱 Database has been seeded`)

  const totalUsers = 1
  console.time(`👤 Created ${totalUsers} users...`)

  for (let i = 0; i < totalUsers; i++) {
    const userData = createUser()
    const postsData = Array.from({
      length: faker.number.int({ min: 10, max: 20 }),
    }).map(() => {
      const title = faker.lorem.words({ min: 3, max: 10 })

      return {
        title,
        content: faker.lorem.paragraphs({ min: 5, max: 25 }, '\n\n'),
        // TODO slugify helper & ensure slug is unique on creation
        slug: title.replaceAll(' ', '-').toLowerCase(),
        published: true,
      }
    })

    await prisma.user
      .create({
        data: {
          ...userData,
          posts: {
            create: postsData,
          },
        },
      })
      .catch((error: unknown) => {
        console.error('Error creating a user:', error)
        return null
      })
  }

  console.timeEnd(`👤 Created ${totalUsers} users...`)

  console.timeEnd(`🌱 Database has been seeded`)
}

try {
  await seed()
  await prisma.$disconnect()
} catch (error) {
  console.error(error)
  await prisma.$disconnect()
  // eslint-disable-next-line unicorn/no-process-exit -- This will be run by the prisma CLI
  process.exit(1)
}
