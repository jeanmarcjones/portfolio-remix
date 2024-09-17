# Sqlite

Date: 2024-07-11

Status: accepted

## Context

SQLite is a file-based relational database management system. One of its most interesting features is that it's
self-contained, with the whole database stored in a single file.

SQLite's file-based nature presents challenges for external connections, making it difficult to access using database
administration tools. However, it's still possible to run tools like `prisma studio` on the machine where the SQLite
volume is mounted if needed.

Using SQLite significantly simplifies both development and production processes. By eliminating the need for a separate
database service you reduce the likelihood of outages. Additionally, SQLite requires only a persisted volume for your
application, which is typically necessary anyway, resulting in lower costs compared to traditional database solutions.

## Decision

I'll use SQLite as this decision drastically simplifies development, deployment, maintenance, and services for the web
application and reduces running costs. While also satisfying the use case of this website.

## Consequences

This means we need to have a way to connect to our SQLite database in production. We'll also need to have a way to
easily seed the database with some scripts.
