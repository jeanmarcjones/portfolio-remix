# Components

Date: 2024-07-10

Status: accepted

## Context

I wanted to use Tailwind CSS to style my app with a component library to speed up development time. My two main
requirements were customization and accessibility. With these considerations in mind, a headless component library would
be best suited. This type of library handles all the logic for accessible, reusable components and leaves the styling to
me. For React, I believe [Radix][1] is the perfect choice.

I still need to address how to style the components provided by Radix with Tailwind. This is where [shadcn/ui][2] comes
into play. It's not a component library, but more of a code registry where you can copy, paste, and modify code to your
heart's content. It's built with Tailwind and Radix.

Additionally, shadcn/ui assumes a Tailwind setup that heavily relies on CSS variables for color styles, making it much
easier to adapt to light/dark mode themes for the site.

## Decision

I will use Tailwind, Radix, and shadcn/ui to handle our UI components.

## Consequences

Since shadcn/ui isn't distributed on npm, we won't receive automatic updates for our components. This manual update
process takes a bit more time but offers benefits when it comes to customization. We can modify shadcn/ui components
without worrying about breaking changes.

[1]: https://www.radix-ui.com/
[2]: https://ui.shadcn.com/
