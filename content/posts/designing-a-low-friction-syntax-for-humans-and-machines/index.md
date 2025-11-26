+++
title = "Designing a Low Friction Syntax for Humans and Machines"
date = 2025-11-25
lastmod = 2025-11-25T15:44:05-07:00
slug = "designing-a-low-friction-syntax-for-humans-and-machines"
tags = ["language-design", "syntax", "programming-languages", "human-factors", "tooling"]
draft = false
+++

{{< figure src="/index.jpg" >}}

---

Many languages still act like keyboards never changed and editors never evolved. They waste some of the most comfortable keys on invisible work, hide structure in whitespace, or overuse symbols that need Shift combinations on common layouts.

This project explores a different axis.

The goal is to design a syntax where:

-   most common operations use unshifted keys
-   structure is visually obvious
-   role of a name can be seen at a glance
-   machines can still parse everything with a simple grammar
-   users and projects can choose visual skins without changing semantics

This article is a snapshot of the current design experiments.

---


## Table of Contents {#table-of-contents}

-   [Dash case for everything](#dash-case-for-everything)
-   [Roles: local, parameter, field, method](#roles-local-parameter-field-method)
-   [Comments: visible and line based](#comments-visible-and-line-based)
-   [Blocks and classes](#blocks-and-classes)
-   [Function headers and the separator](#function-headers-and-the-separator)
-   [Future multi return](#future-multi-return)
-   [Tooling, projects, and personal taste](#tooling-projects-and-personal-taste)
-   [Summary](#summary)
-   [References](#references)
-   [Further Reading](#further-reading)
-   [Attributions](#attributions)

---


## Dash case for everything {#dash-case-for-everything}

Most languages split names with camelCase or snake_case. Both have drawbacks.

-   camelCase needs Shift for capitals and mixes visual role with typography
-   snake_case needs Shift for "_" and often looks noisy in dense code

This syntax uses dash case for all identifiers:

-   `load-user`
-   `load-user-profile`
-   `compute-total-amount`

Identifiers:

-   start with a lowercase letter
-   continue with lowercase letters, digits, and "-"
-   never collide with fixed keywords like `fn`, `class`, `let`, `if`

Dash case reads like natural language, keeps everything on the home row, and avoids Shift.

Unary operators can be enforced by spaces.

---


## Roles: local, parameter, field, method {#roles-local-parameter-field-method}

One of the useful ideas from old style naming conventions is the ability to see the role of a name without chasing its declaration.

Types do not belong in the name. Roles sometimes do.

This syntax treats role markers as optional but encouraged and possibly enforced per project.

-   Local variables
    -   Plain identifiers
    -   Example
        -   `subtotal`
-   Parameters
    -   Optional prefix with apostrophe
    -   Example
        -   `'amount`
        -   `'user-id`
-   Member fields of the current object
    -   Optional prefix with a single dot
    -   Example
        -   `.balance`
        -   `.interest-rate`
-   Member methods of the current object
    -   Optional prefix with two dots
    -   Example
        -   `..deposit`
        -   `..withdraw`

Other objects:

-   `account.balance`
-   `account..deposit 100`

The core language only sees identifiers. The project can decide to enforce these patterns with a linter or formatter. An editor can even hide the prefixes visually while keeping them in the file on disk.

---


## Comments: visible and line based {#comments-visible-and-line-based}

Comments are deliberately simple.

Single line comments:

-   Any line whose first character is "=" is a comment
-   Example
    -   "= describe the next function"

There are no inline comments. Code and comments never share a line. This keeps lines visually clean and makes lexing trivial.

Multiline comments:

-   Experimental choice
    -   `/=` starts a comment block
    -   `=/` ends it
-   Both markers must appear at the beginning of a line.

Example:

```nil
/=
This is a longer comment
It can span many lines
=/
```

---


## Blocks and classes {#blocks-and-classes}

Blocks use brackets on their own line. There is no argument about saving a few characters on a line at the cost of structure and visibility. If the method can't fit on the screen, then it is too long anyway.

Example:

```nil
fn i32 add i32 'a i32 'b
[
  let result = 'a + 'b
  return result
]
```

Classes:

```nil
class bank-account
[
  i32 .balance
  i32 .overdraft-limit
  f32 .interest-rate

  fn vd ..deposit i32 'amount
  fn vd ..withdraw i32 'amount
]
```

In this example:

-   `.balance`, `.overdraft-limit`, `.interest-rate` are fields
-   `..deposit` and `..withdraw` are methods
-   `'amount` is a parameter

The bracket form for class and method bodies is an experiment. It clearly separates headers from body and plays well with future pluggable block styles.

---


## Function headers and the separator {#function-headers-and-the-separator}

Function headers are where humans benefit most from a stable visual rhythm.

The current experimental shape for a method with a single return type is:

```nil
fn i32 ..add i32 'a i32 'b
[
  return 'a + 'b
]
```

Pattern:

-   `fn` introduces a function
-   the first token after `fn` is the return specification
    -   `i32`, `str`, or `vd` for no value
-   then the name
    -   plain for free functions
    -   optionally prefixed with `..` for member methods
-   then parameter list
    -   pairs of type and parameter name
    -   types first, then the apostrophe prefixed name

Example free function:

```nil
fn i32 add-two i32 'x
[
  return 'x + 2
]
```


### Visual separator with "/" {#visual-separator-with}

Function headers carry three distinct regions:

-   return information
-   name
-   parameter list

To make this clearer for humans without changing semantics, the syntax allows an optional separator `/` in specific positions.

All of these headers are equivalent at the AST level:

```nil
fn i32 ..add i32 'a i32 'b
fn i32 / ..add i32 'a i32 'b
fn i32 ..add / i32 'a i32 'b
fn i32 / ..add / i32 'a i32 'b
```

The separator:

-   is only recognized in function headers
-   can appear between return spec and name
-   can appear between name and parameter list
-   is ignored by the compiler
-   can be added or removed by project and user level formatting rules

The idea is to give the eye an extra handle without forcing a particular style.
The separator choice is a work in progress.

---


## Future multi return {#future-multi-return}

Multi return is intentionally postponed until the basic syntax feels stable.

-   Tuple-like return type after `fn`
    -   Example
        -   `fn i8, i8, i16 ..split-range i8 'start i8 'end`

`returns` clauses or similar styles after parameters are discarded as they don't play well with humans’ natural ability of noticing patterns when skimming through the code.

This fits into the current design without breaking existing code. The language can start with single return value only and grow into multi return later.

---


## Tooling, projects, and personal taste {#tooling-projects-and-personal-taste}

A central idea in this design is to keep the core syntax small and deterministic, but allow projects and users to shape how code looks in their editor.

-   The compiler understands a simple, fixed grammar
-   Projects can define:
    -   whether role prefixes are required
    -   whether the "/" separator is kept or removed
    -   how strict operator spacing must be
-   Editors can:
    -   render prefixes differently
    -   show or hide separators
    -   format code according to project rules on save

On disk there is one canonical form per project. In the editor there can be many views as long as they map cleanly to the same abstract syntax tree.

This balances:

-   human readability
-   low key friction
-   machine friendliness
-   and the reality that different people read code differently

This is still an experiment. The point of writing it down is to make the constraints explicit:

-   avoid overusing Shift
-   make structure obvious
-   make roles visible
-   give separators a place
-   keep the grammar boring

The rest can change as the language gets exercised by real code.

---


## Summary {#summary}

The ideal scenario is to create a truly universal language that can be used across all the domains.

I believe that such a language is not only not as hard as it might seem, but realistically achievable.

My goal is to attract people interested in developing such a language and fund it through both individual and organisational means.

It is not a fantasy, but a reality that no one has done yet, and it would be a big step towards making the world a better place.

---


## References {#references}

-   Kenneth E. Iverson - Notation as a Tool of Thought
    <https://www.eecg.utoronto.ca/~jzhu/csc326/readings/>

-   Quorum Programming Language - Evidence for an Evidence-Based Language Design
    <https://quorumlanguage.com/evidence.html>

-   Warm Signull - The Cycle of Reinvention - and What a Truly General Language Should Be
    <https://warmsignull.github.io/posts/the-cycle-of-reinvention-and-what-a-truly-general-language-should-be/>

-   Warm Signull - A Language With Pluggable Syntax <https://warmsignull.github.io/posts/a-language-with-pluggable-syntax/>

---


## Further Reading {#further-reading}

-   Bret Victor - Learnable Programming
    <https://worrydream.com/LearnableProgramming/>

-   Steven Kelly - Concrete Syntax Matters (talk)
    <https://www.infoq.com/presentations/Language-Design/>

-   Walter Bright - The Naked Truth About Writing a Programming Language
    <https://www.digitalmars.com/articles/b90.html>

-   So, You Want to Write Your Own Language?
    <https://thestandardoutput.com/posts/so-you-want-to-write-your-own-language/>

---


## Attributions {#attributions}

The following image is used under a Creative Commons license:

DIY means choosing the right tool for the purpose – a watchmaker’s nightmare
![](https://commons.wikimedia.org/wiki/File:DIY_means_choosing_the_right_tool_for_the_purpose_-_a_watchmaker%27s_nightmare.jpg)

Attribution: **“DIY means choosing the right tool for the purpose – a watchmaker’s nightmare” by Franz van Duns, licensed under CC BY-SA 4.0.**

License: <https://creativecommons.org/licenses/by-sa/4.0/>

---
