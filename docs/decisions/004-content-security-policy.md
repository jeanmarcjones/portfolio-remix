# Content Security Policy

Date: 2024-08-09

Status: accepted

## Context

A Content Security Policy (CSP) allows a server to inform the browser about the sources from which it expects to load
resources. This helps to prevent cross-site scripting (XSS) attacks by not allowing the browser to load resources from
any other location than the ones specified in the CSP.

CSPs that are overly strict can be a major pain to work with, especially when using third-party libraries. Still, for
the most security, the CSP should be as strict as possible. Additional sources can be added to the CSP as needed.

## Decision

I will configure a strict Content Security Policy (CSP) for the default application using [helmet][1], the de-facto
Express middleware for setting security headers. To enhance both security and developer experience, I will enable
report-only mode for the CSP in development.

## Consequences

Having different CSP configurations between the development and production environments may introduce some complexity to
our application setup. However, this added complexity is significantly outweighed by having a safer default
configuration for production.

[1]: https://npm.im/helmet
