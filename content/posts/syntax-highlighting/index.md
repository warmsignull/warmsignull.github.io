+++
title = 'Syntax Highlighting Cheatsheet'
date = '2024-07-21T09:00:00Z'
description = 'Copy-ready examples for adding syntax-highlighted code blocks to your Hugo posts.'
tags = ['syntax', 'code', 'hugo']
+++

Learning sticks faster when you can copy a working snippet. This post captures the most common ways to add syntax-highlighted code blocks in Hugo.

## Markdown fences

Use triple backticks ("```") followed by the language name. Hugo passes that hint to the theme’s highlighter.

```bash
hugo new content posts/my-first-snippet/index.md
```

```python
def greet(name: str) -> str:
    """Return a friendly greeting."""
    return f"Hello, {name}!"

print(greet("reader"))
```

```javascript
export function sum(values) {
  return values.reduce((total, current) => total + current, 0);
}
```

```go
package main

import "fmt"

func main() {
	fmt.Println("Go highlights work, too!")
}
```

## Shortcode extras

When you need line numbers or fine-grained control, switch to the built-in `highlight` shortcode.

{{< highlight toml "linenos=table" >}}
[markup]
  [markup.highlight]
    noClasses = false
    style = "dracula"
{{< /highlight >}}

{{< highlight html "linenostart=42,linenos=inline" >}}
<section class="code-sample">
  <pre>{{ .Get "value" }}</pre>
</section>
{{< /highlight >}}

## Inline code

Drop inline snippets with single backticks like `npm run build`, and they will pick up the same syntax styling as block-level code.

Mix and match these options to keep technical posts readable without breaking your writing flow.
