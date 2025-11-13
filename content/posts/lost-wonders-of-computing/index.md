+++
title = "Lost Wonders of Computing"
date = 2025-11-13
lastmod = 2025-11-13T14:44:03-07:00
slug = "lost-wonders-of-computing"
tags = ["computing", "history", "technology"]
draft = false

[cover]
hiddenInSingle = true
+++

{{< figure src="/title.png" >}}


## Lost Wonders of Computing {#lost-wonders-of-computing}

When I look back at the languages and systems of the 60s, 70s, and 80s, I don’t just see “old tech”.
I see entire **worlds** of thought, ideas that modern computing quietly abandoned.

We built everything we use today on top of them, but somewhere along the way, we stopped **listening** to what they were trying to teach us.

Here are some of those forgotten wonders, features, philosophies, and design choices that would feel foreign and almost magical to someone who grew up after the 1990s.


## Live, Self-Modifying Systems {#live-self-modifying-systems}

-   Lisp Machines, Smalltalk, and Interlisp let you **change** any function, class, or kernel routine while the system was running.
-   You could patch your OS, fix a bug, and resume execution **without rebooting**.
-   Every process was alive, introspectable, and editable from within itself.

Modern software rebuilds, redeploys, and restarts, the opposite of “living code”.


## Total Introspection {#total-introspection}

-   Every symbol, object, and call frame could be examined or changed.
-   The debugger, editor, and runtime were one unified environment.
-   You could click an error message, jump into the live code, patch it, and continue execution instantly.

Today’s IDEs simulate this through layers of tooling that the 80s already had natively.


## Code as Data {#code-as-data}

-   Lisp, Forth, and APL treated programs as just another kind of data structure.
-   The compiler could rewrite itself because the language **was its own syntax tree**.
-   You could inspect, serialize, and transform any part of the system at runtime.

We lost this clarity when code became “text” again instead of **structure**.


## Image-Based Worlds {#image-based-worlds}

-   Systems like Smalltalk didn’t “save files”. They saved **the world**, every object, variable, window, and state snapshot.
-   You reopened your environment exactly as you left it: code, data, and context all alive.

We rebuilt this decades later as “virtual machines” and “hibernate”, but it used to be **the norm**.


## User-Extensible Everything {#user-extensible-everything}

-   The user **was expected** to modify the system.
-   Menus, compilers, and window managers were editable at runtime.
-   “Hacking” wasn’t an act of rebellion; it was how you **used** the machine.

Modern systems are locked boxes; the personal computer was once truly personal.


## Orthogonal Persistence {#orthogonal-persistence}

-   Memory and storage were one continuous space.
-   When you rebooted, your objects were still there.
-   No serialization, no databases, no deserialization cost, just continuity.

Now, we serialize our memories into files and pray we can read them back.


## Reflective Compilers and Toolchains {#reflective-compilers-and-toolchains}

-   Compilers were written in the same language they compiled.
-   You could open the compiler as a live object, tweak optimizations, and rebuild it **from inside itself**.

Today’s compilers are black boxes, efficient but unapproachable.


## Micro-Expressiveness {#micro-expressiveness}

-   APL, Lisp, and Forth could express immense logic in microscopic space.
-   A single line could calculate, transform, or reason about entire data sets.
-   Programs were short because they were **dense with meaning**.

We replaced elegance with verbosity and “readability” that reads like bureaucracy.


## Integrated AI and Symbolic Reasoning {#integrated-ai-and-symbolic-reasoning}

-   Lisp and Prolog embedded logic, inference, and knowledge representation directly into the language.
-   You could describe relationships and let the machine **deduce** new ones.
-   The AI wasn’t an external API; it was part of your runtime.

Symbolic computing made the machine **conversational**, not transactional.


## Simplicity Through Completeness {#simplicity-through-completeness}

-   The entire OS, compiler, and GUI could fit in a few tens of thousands of lines of code.
-   It was coherent, understandable, and self-contained.
-   You could print the entire system on paper and reason about it.

We traded simplicity for complexity, and gained features we barely understand.


## Inline Documentation and Living Manuals {#inline-documentation-and-living-manuals}

-   Interlisp and Smalltalk merged documentation with code.
-   Every function carried its own examples and notes.
-   You could right-click any symbol to view its docs, 40 years before “LSP hover” made it novel again.

Knowledge lived **inside** the machine, not on a separate website.


## Unified Command Environments {#unified-command-environments}

-   Editors, shells, and GUIs all spoke the same command language.
-   One set of keystrokes controlled everything from text to windows to compilers.
-   The computer felt consistent, navigable, and human-scaled.

Modern computing is a patchwork of disconnected metaphors.


## Bootstrapping and Self-Hosting {#bootstrapping-and-self-hosting}

-   Systems could rebuild themselves entirely from source, **within themselves**.
-   You could modify the tools that modified the tools, a true recursive civilization.

Now we rely on opaque binaries and external toolchains we can’t even compile alone.


## Message-Passing Everything {#message-passing-everything}

-   Objects communicated by sending messages, not by calling functions.
-   Local or remote didn’t matter, the syntax was the same.
-   Early object systems already had the intuition behind microservices and actors.

We rediscovered this decades later with Erlang and distributed systems.


## Why It Feels So Alien Now {#why-it-feels-so-alien-now}

To someone born after 1990, these systems seem impossible, too open, too editable, too trusting.
But the point wasn’t chaos. The point was **intimacy** with computation.
You weren’t a “user”. You were a **co-author** of your environment.

The machine wasn’t a tool.
It was a **conversation partner**.


## Closing Thought {#closing-thought}

We didn’t lose these wonders because they failed.
We lost them because we industrialized computing.
We chose safety, scalability, and profit over curiosity, coherence, and trust.

But the spirit of those systems, live, introspective, programmable, humane, still flickers in our editors, REPLs, and open-source experiments.

Maybe the next revolution isn’t about new paradigms at all.
Maybe it’s about **remembering**.
