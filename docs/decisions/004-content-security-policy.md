# Content Security Policy

Date: 2024-08-09

Status: accepted

## Context

A Content Security Policy (CSP) allows a server to inform the browser about the sources from which it expects to load
resources. It prevents cross-site scripting attacks by stopping the browser from loading resources from unspecified
locations.

CSPs that are overly strict can be a pain to work with, especially when using third-party libraries. But, the CSP should
be as strict as possible to maximize the site's security. Additional sources can be added to the CSP as needed.

## Decision

I will configure a strict CSP defaults for the application using [helmet][1], the de facto express middleware for
setting security headers. To enhance security and developer experience, I will enable report-only mode for the CSP in
development.

## Consequences

Having different CSP configurations in development and production may introduce some complexity to my application.
However, this is significantly outweighed by having a safer default configuration for production.

[1]: https://npm.im/helmet
