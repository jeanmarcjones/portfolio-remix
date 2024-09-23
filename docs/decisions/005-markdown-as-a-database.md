# Markdown As A Database

Date: 2024-09-07

Status: accepted

## Context

To simplify the app and advance development, I plan to remove the database. This will allow me to streamline
development, deployment, and maintenance while reducing running costs.

Markdown is a lightweight markup language used to format plain text documents. It's well-suited for storing an app's
static content on a file system. To meet database-like needs, you can use frontmatter to add metadata to the files.

## Decision

I will replace the SQLite database with MDX files combined with frontmatter. This solution provides all the
functionality I need for my use case.

## Consequences

Redeployment will be necessary if site content changes are required. Fortunately, for my use case frequent updates are
uncommon, so this isn't a significant concern.

If new features requirements demand a proper database, I'll need to reintroduce SQLite. Fortunately, I've maintained
a branch with the current implementation, making this transition trivial.
