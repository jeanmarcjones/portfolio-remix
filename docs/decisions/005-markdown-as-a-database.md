# Markdown As A Database

Date: 2024-09-07

Status: accepted

## Context

I'm removing the database to simplify the app and advance development. Doing so will allow for easier development,
deployment, and maintenance while reducing running costs.

Markdown is a lightweight markup language used to format plain text documents. It's well-suited for storing an app's
static content on a file system. I can use Frontmatter to add metadata to the files to meet my database-like needs.

Finally, I need to decide how to validate the posts' frontmatter. Zod is a TypeScript-first schema declaration and
validation library. With this, we can achieve the same level of type safety as provided by Prisma's ORM.

## Decision

I will replace the SQLite database with MDX files combined with Frontmatter. Zod will handle validating the Frontmatter
with a predefined schema. This solution provides all the functionality I need for my use case.

## Consequences

Redeployment will be necessary if the site's content changes are required. However, this isn't a significant concern due
to infrequent updates.

If new feature requirements demand a proper database, reintroducing SQLite will be trivial. I've retained a branch with
the current implementation to aid the process.
