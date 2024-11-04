# Sqlite

Date: 2024-07-11

Status: superseded by [0005](005-markdown-as-a-database.md)

## Context

SQLite is a file-based relational database management system. One of its key features is that it's self-contained, with
the whole database stored in a single file.

SQLite's file-based nature presents challenges for external connections, making it difficult to access using database
administration tools. However, it's still possible to run tools like `prisma studio` on the machine where the SQLite
volume is mounted if needed.

Using SQLite significantly simplifies both development and production processes. It eliminates the need for a separate
database service, which reduces the risk of outages. Additionally, SQLite requires only a persisted volume for your
application, which is typically necessary anyway, resulting in lower costs than traditional database solutions.

## Decision

I'll use SQLite as this it drastically simplifies development, deployment, maintenance, and services for the web
application and reduces running costs. While also satisfying the use case of this website.

## Consequences

I will need a way to connect to the SQLite database in production and a script to seed the database.
