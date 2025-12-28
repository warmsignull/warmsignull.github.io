+++
title = "Toward a Unified General Language - Overview"
date = 2025-12-28
lastmod = 2025-12-28T14:57:07-07:00
slug = "toward-a-unified-general-language-overview"
tags = ["language-design", "introspection", "metaprogramming", "systems", "programming-languages"]
draft = false
+++

{{< figure src="/index.png" >}}

---


## Table of Contents {#toc}

-   [Why this language needs to exist](#why-this-language-needs-to-exist)
-   [Language design goals](#language-design-goals)
-   [What this language is not](#what-this-language-is-not)
-   [What comes next](#what-comes-next)
-   [Closing](#closing)

---


## Why this language needs to exist {#why-this-language-needs-to-exist}

Modern systems often force developers to choose between power and comprehensibility. We are told that abstraction means giving up control, that live development kills performance, and that strong types block flexibility. These are not laws of nature. They are defaults that accumulated over time.

Different language families each solved parts of the problem:

-   Lisp: code as data and reflection
-   ML: strong types and inference that stays legible
-   C: control and predictable binaries
-   Erlang: message passing and resilience
-   Smalltalk and Genera: live worlds and persistence

What I want is integration. A single language that lets us build systems we can understand without abandoning modern requirements.

For context related to this motivation:

-   Lost Wonders of Computing
    <https://warmsignull.github.io/posts/lost-wonders-of-computing/>
-   Reclaiming Knowable Machines Across Systems
    <https://warmsignull.github.io/posts/reclaiming-knowable-machines-across-systems/>

---


## Language design goals {#language-design-goals}


### 1. Code as structured data, with readable IR {#1-dot-code-as-structured-data-with-readable-ir}

Programs are trees, not strings. The compiler exposes these structures so developers can manipulate and understand their own code.

-   reflective IR always available
-   compiler phases explain themselves
-   no invisible rewrites or magic behavior

Context behind this motivation:

-   Designing a Language with a VM Model but without Runtime Bloat
    <https://warmsignull.github.io/posts/designing-a-language-with-a-vm-model-but-without-runtime-bloat/>

---


### 2. Image capable development, native binaries by default {#2-dot-image-capable-development-native-binaries-by-default}

The language supports world snapshots during development. These enable liveness, experimentation, and inspection. The feature never forces users to ship a runtime image.

-   image based development is optional
-   final output is native by default
-   VM exists for tools and debugging support

Historical grounding:

-   Genera - The Living Lisp Machine OS
    <https://warmsignull.github.io/posts/genera-the-living-lisp-machine-os/>

---


### 3. Memory control without punishment {#3-dot-memory-control-without-punishment}

Memory is predictable:

-   deterministic ownership, regions, or arenas by default
-   tracing or generational GC can be enabled per module
-   allocation is visible and auditable
-   garbage collection is a tool that can be selected when needed

The same motivations surface in that earlier exploration of systems design.

-   When Inferior Languages Won
    <https://warmsignull.github.io/posts/when-inferior-languages-won-how-c-conquered-lisp-and-the-world/>

---


### 4. Composable concurrency through message passing {#4-dot-composable-concurrency-through-message-passing}

Concurrency model:

-   message passing first
-   structured concurrency
-   actor style isolation
-   clear local and remote boundaries with a shared abstraction

This relates to the need for predictable systems:

-   Reclaiming the Machine
    <https://warmsignull.github.io/posts/reclaiming-the-machine-designing-modern-systems-with-lost-principles/>

---


### 5. Strong static types, inference when obvious {#5-dot-strong-static-types-inference-when-obvious}

Types guide rather than punish:

-   algebraic data types
-   pattern matching
-   inference only where intent remains clear

Motivation from ML lineage:

-   OCaml and the ML Lineage
    <https://warmsignull.github.io/posts/ocaml-and-the-ml-lineage/>

---


### 6. Macros and reflection that scale beyond toy problems {#6-dot-macros-and-reflection-that-scale-beyond-toy-problems}

Macros operate on typed AST nodes. They manipulate code in a structured form rather than in raw strings.

-   homoiconic structure instead of homoiconic syntax
-   compile time reflection is a core capability
-   transformations are predictable and readable

Related experiments:

-   A Language with Pluggable Syntax
    <https://warmsignull.github.io/posts/a-language-with-pluggable-syntax/>

---


### 7. Syntax that adapts to the developer without fracturing the language {#7-dot-syntax-that-adapts-to-the-developer-without-fracturing-the-language}

The language separates internal semantics from external syntax. The core syntax is small and regular so that machines and humans can work with it directly. Developers can choose visual styles that suit their workflows while the compiler always sees one canonical representation.

This allows:

-   Lisp-y style blocks for interactive work
-   ML style expressions for algebraic code
-   more punctuation heavy style for systems programming
-   indentation based style for readability focused projects

Multiple syntax skins map to the same internal representation. The compiler sees one uniform structure, which keeps tooling, macros, and compiled artifacts consistent. Developers gain flexibility without fragmenting the language or ecosystem.

---


### 8. Multi domain by design {#8-dot-multi-domain-by-design}

The same toolchain targets:

-   native executables
-   WASM for browsers
-   VM bytecode for development environments

Games, OS utilities, and web work can be done without switching languages.

Background:

-   The Cycle of Reinvention
    <https://warmsignull.github.io/posts/the-cycle-of-reinvention-and-what-a-truly-general-language-should-be/>

---


## What this language is not {#what-this-language-is-not}

-   not forced GC everywhere
-   not a single locked syntax
-   not a platform runtime that must be shipped
-   not bound to a heavy hidden ecosystem
-   not opinionated to the point of paralysis

The goal is to lower accidental complexity instead of adding another layer to it.

---


## What comes next {#what-comes-next}

Near term tasks:

1.  define core IR with readable transformations
2.  ownership and optional GC integration design
3.  minimal syntax plus skinning layer
4.  VM architecture for development only
5.  structured concurrency and messaging prototype
6.  introspection explorer for state, IR, and memory

I do not expect to finish this alone. I do expect to start it without hiding complexity or pretending the problem is smaller than it is.

---


## Closing {#closing}

I know that aiming for a language that is general, understandable, and practical is ambitious. That does not make the goal less necessary. The worst outcome is not failure. The worst outcome is to never try.
