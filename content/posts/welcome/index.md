+++
title = 'Welcome to the Minimal Dark Blog'
date = '2024-07-14T10:00:00Z'
description = 'A quick tour of the minimal dark Hugo starter and how to keep posts organized.'
tags = ['introduction', 'hugo']
coverAlt = 'Laptop glowing in a dark room'
+++

Welcome! This starter keeps things intentionally lean so you can focus on your words and your readers.

![Blue and purple gradient squares](welcome.png)

## What is included

- A dark-first theme with a single click light mode toggle.
- Compact typography and generous spacing for long-form reading.
- A post bundle structure (`content/posts/example/index.md`) so every article keeps its related media and resources together.

## Writing with bundles

When you run:

```bash
hugo new content posts/my-next-post/index.md
```

Hugo creates a folder that holds the Markdown file and any supporting assets. Add images next to the `index.md` file, then reference them relatively just like the screenshot earlier.

## Switching themes

Readers can switch between dark and light modes using the toggle in the header. Their selection is stored locally, so the site remembers the preference on the next visit.

Happy publishing!
