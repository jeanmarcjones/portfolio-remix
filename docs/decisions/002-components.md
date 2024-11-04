# Components

Date: 2024-07-10

Status: accepted

## Context

I wanted to use Tailwind CSS to style my app with a component library to speed up development time. My two main
requirements were customization and accessibility. With this in mind, a headless component library would be the perfect
choice. These libraries handle all the logic for accessible, reusable components and leave the styling to me. For React,
I believe [Radix][1] is the ideal candidate.

I still need to address how to style the components provided by Radix with Tailwind. Given these
constraints, [shadcn/ui][2] would be the logical choice. It's not a component library but more of a code registry where
you can copy, paste, and modify code to your heart's content.

Additionally, shadcn/ui assumes a Tailwind setup that heavily relies on CSS variables for color styles, making it much
easier to adapt to light/dark mode themes.

## Decision

I will use Tailwind, Radix, and shadcn/ui to handle our UI components.

## Consequences

As shadcn/ui isn't distributed via NPM, I won't benefit from automatic component updates. While this adds some overhead,
it gives me total control to customize components without the risk of breaking changes.

[1]: https://www.radix-ui.com/
[2]: https://ui.shadcn.com/
