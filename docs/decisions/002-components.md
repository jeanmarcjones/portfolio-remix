# Components

Date: 2024-07-10

Status: accepted

## Context

I wanted to use tailwind css to style my app with a component library to speed up development time. When it came to
picking a library I had two main requirements it needs to be customizable and accessible.

With this in mind a headless component library will be best suited. This type of library handles all the logic required
for accessible, reusable components and leaves the styling up to me. For react I believe [Radix][1] is the perfect
choice.

We still have the question of how to style the components provided by radix with tailwind. This is where [shadcn/ui][2]
comes into the picture. It's not a component library, but more of a code registry where you can copy/paste/modify the
code to your heart's content. That's built with Tailwind and Radix.

On top of that, shadcn/ui assumes a Tailwind setup that relies heavily on CSS variables for color styles which makes it
much easier to adapt to the light/dark mode theme for the site.

## Decision

We will use Tailwind, Radix shadcn/ui, and to handle our UI components.

## Consequences

As shadcn/ui isn't distributed on npm we won't be able to receive automatic updates for our components. Doing manual
updates will take a bit of extra time but this is a positive when is comes to customization. As it means we can modify
the shadcn/ui components without having to worry about any breaking changes.

[1]: https://www.radix-ui.com/

[2]: https://ui.shadcn.com/
