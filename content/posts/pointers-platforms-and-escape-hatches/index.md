+++
title = "Pointers, Platforms, And Escape Hatches"
date = 2026-01-07
tags = ["programming-languages", "systems", "memory", "pointers", "design"]
categories = ["programming", "languages"]
draft = false
summary = "Why pointer semantics cannot be avoided, how platform constraints shape their meaning, and how layered pointer models can keep hardware realities visible without making raw pointers the default."
+++

---

{{< figure src="/index.jpg" >}}

---


## Table Of Contents {#toc}

-   [Work Underway](#work-underway)
-   [Problem Framing](#problem-framing)
-   [Addresses As A Physical Constraint](#addresses-as-a-physical-constraint)
-   [Assembly And The Origin Of Pointers](#assembly-and-the-origin-of-pointers)
-   [Why C-Style Pointers Became Dominant](#why-c-style-pointers-became-dominant)
-   [What We Know Now](#what-we-know-now)
-   [Platform Dependent Constraints](#platform-dependent-constraints)
-   [Desktop And Server](#desktop-and-server)
-   [Web](#web)
-   [Embedded Systems And Programming](#embedded-systems-and-programming)
-   [Managed Languages: Java And C#](#managed-languages-java-and-csharp)
-   [Rust And The Cost Of Static Safety](#rust-and-the-cost-of-static-safety)
-   [Cross Domain Comparison](#cross-domain-comparison)
-   [Pointer Models As Language Surface Area](#pointer-models-as-language-surface-area)
-   [Planned Syntax: ptr T](#planned-syntax-ptr-t)
-   [Optional And Layered Pointer Semantics](#optional-and-layered-pointer-semantics)
-   [Implications For Language And Tooling](#implications-for-language-and-tooling)
-   [References](#references)
-   [Closing](#closing)

---


## Work Underway {#work-underway}

The work is underway and it is looking promising.
Because of this, publishing will be less frequent than before.

This is a consequence of compression rather than slowdown.

---


## Problem Framing {#problem-framing}

The question is often phrased incorrectly.

The problem is not whether a new programming language should have pointers.

The problem is how much of the machine’s addressing model should be exposed, where, and under what constraints.

Any language that targets systems programming, games, tooling, web, or hardware-adjacent domains must account for addresses explicitly. A language that avoids this does not remove the problem, it relocates it into foreign-function interfaces, compiler internals, or undefined behavior.

The design space begins only once this is acknowledged directly.

---


## Addresses As A Physical Constraint {#addresses-as-a-physical-constraint}

All contemporary hardware operates on addresses.

-   Memory is addressed
-   Instructions are fetched from addresses
-   Devices are accessed via addresses
-   Control flow is implemented as jumps to addresses

Language abstractions can restrict and structure access to addresses, but they cannot eliminate them.
At some point, the machine stops asking politely.

---


## Assembly And The Origin Of Pointers {#assembly-and-the-origin-of-pointers}

Assembly languages did not lack pointers.
They lacked boundaries.

Any register used as a base for indirect memory access is a pointer in practice.

-   Stack pointers
-   Frame pointers
-   Base plus offset addressing
-   Indirect calls and jumps
-   Jump tables and interrupt vectors

What assembly did not encode were properties that modern languages treat as essential.

-   Bounds
-   Lifetimes
-   Aliasing constraints
-   Ownership
-   Provenance

These properties were implicit, informal, and unenforced.

C did not invent pointers. It standardized them, typed them, and made them portable. This aligned language semantics closely with hardware reality and enabled portable operating systems.

It also coupled correctness to programmer discipline.
The compiler did what it was told, not what was meant.

---


## Why C-Style Pointers Became Dominant {#why-c-style-pointers-became-dominant}

C-style pointers became dominant because they were sufficient, simple, and well aligned with hardware.

They enabled:

-   Direct memory and device access
-   Efficient compilation
-   Flexible data layout
-   ABI stability across platforms

The abstraction “pointer to T” collapsed multiple concerns into a single construct and delegated the rest to convention.
History accepted the trade long before the bill arrived.

---


## What We Know Now {#what-we-know-now}

Decades of experience have made the failure modes of unrestricted pointer use explicit.

-   Memory safety violations translate directly into security vulnerabilities
-   Aliasing obscures both human reasoning and compiler optimization
-   Lifetime errors interact catastrophically with concurrency
-   Testing and review do not scale to unrestricted address manipulation

At the same time, empirical evidence across large codebases shows that most code does not require unrestricted pointer semantics.

The code that does benefit meaningfully from raw address manipulation is typically:

-   Platform specific
-   Hardware adjacent
-   Performance critical
-   Small relative to the rest of the system

This asymmetry motivates separating pointer capability from pointer default.
The hardware already made this distinction.

---


## Platform Dependent Constraints {#platform-dependent-constraints}

Pointer semantics are shaped by platform constraints.

Treating all targets as equivalent forces either unnecessary restriction or unacceptable unsafety.
Abstractions do not flatten physics.

---


## Desktop And Server {#desktop-and-server}

Desktop and server environments provide:

-   Virtual memory
-   MMUs
-   Process isolation
-   Comparatively abundant memory

These properties make it practical to layer:

-   Bounds carrying references
-   Capability checks
-   Debug time validation
-   Provenance tracking

Raw pointers can be confined to specific subsystems without reducing expressiveness.

---


## Web {#web}

Web platforms are adversarial and sandboxed.

Memory access is virtualized and constrained.
WebAssembly exposes linear memory, but languages targeting it aggressively restrict direct address manipulation.

Pointer-like constructs exist primarily as internal mechanisms rather than user-facing abstractions.
The browser is not impressed by intent.

---


## Embedded Systems And Programming {#embedded-systems-and-programming}

Embedded systems impose opposing constraints.

-   Memory is fixed
-   Addresses are meaningful
-   MMIO is common
-   Allocation may be limited or nonexistent
-   Predictability dominates abstraction

In these contexts, advanced pointer safety layers may be undesirable or infeasible.
Overhead is not theoretical, it is measured.

---


## Managed Languages: Java And C# {#managed-languages-java-and-csharp}

Java and C# removed raw pointers from everyday programming and replaced them with managed references and garbage collection.

This substantially improved safety, tooling, and productivity.

It also introduced structural costs.

-   Object headers increase memory footprint
-   Indirection reduces cache locality
-   Garbage collection introduces pauses
-   Temporal predictability becomes harder

For real-time systems and games, this is not an impossibility, but it requires continuous mitigation.
The garbage collector eventually wants its turn.

---


## Rust And The Cost Of Static Safety {#rust-and-the-cost-of-static-safety}

Rust retains low-level power while enforcing invariants statically.

Ownership, borrowing, and lifetimes encode aliasing and lifetime constraints directly into the type system.
Raw pointers exist, but dereferencing them requires explicit unsafe contexts.

This model is effective, but it demands a substantial mental shift.
The compiler now participates in design meetings.

---


## Cross Domain Comparison {#cross-domain-comparison}

The same pointer abstraction behaves differently across domains.

-   Desktop systems amortize safety checks
-   Web platforms mandate restriction
-   Embedded systems demand predictability
-   Games prioritize latency stability
-   Systems software values explicitness over convenience

A single pointer model cannot optimally serve all of these simultaneously.

---


## Pointer Models As Language Surface Area {#pointer-models-as-language-surface-area}

A pointer bundles multiple independent dimensions.

-   Address
-   Mutability
-   Bounds
-   Lifetime
-   Aliasing
-   Provenance
-   Address space
-   Concurrency semantics

Languages differ in which of these dimensions are explicit, enforced, or implicit.
Designing a pointer model is therefore designing a language’s exposed surface area.

---


## Planned Syntax: ptr T {#planned-syntax-ptr-t}

In my language design, I am leaning toward an explicit spelling:

ptr T

The motivation is semantic and operational clarity.

This spelling marks address-level access as distinct from safe references and slices.
It makes weakened guarantees visible at the syntactic level and allows both humans and tools to identify unsafe or platform-sensitive code paths precisely.

This distinction supports:

-   Clearer code review boundaries
-   Static analysis of unsafe usage
-   Audit tooling
-   Platform specific restriction or reinterpretation

---


## Optional And Layered Pointer Semantics {#optional-and-layered-pointer-semantics}

Pointer semantics are layered and opt in.

-   Safe references and slices form the default
-   Raw pointers exist where required
-   Advanced metadata can be enabled on platforms that support it
-   Reduced semantics can be used where overhead is unacceptable

The abstraction bends without pretending everything bends equally.

---


## Implications For Language And Tooling {#implications-for-language-and-tooling}

Under this model, several properties emerge:

-   Unsafe boundaries are explicit and auditable
-   Static reasoning improves without global restriction
-   AI assisted code can be constrained mechanically
-   Tooling can reason about pointer usage precisely

Explicitness is introduced selectively, not universally.

---


## References {#references}


### Background {#references-background}

-   Ritchie, D. M., **The Development of the C Language**
-   ISO/IEC 9899, **Programming Languages — C**
-   Intel 64 and IA-32 Architectures Software Developer’s Manual
-   ARM Architecture Reference Manual
-   WebAssembly Core Specification
-   Java Language Specification, **Java Memory Model**
-   ECMA-335, **Common Language Infrastructure (CLI)**
-   Microsoft Learn, **.NET Garbage Collection**
-   Rust RFC Book, **Ownership, Borrowing, and Lifetimes**
-   Rustonomicon, **Unsafe Rust Guidelines**
-   Zig Documentation, **Pointers, Slices, and Address Spaces**
-   Swift Programming Language Guide, **Memory Safety**
-   Go Memory Model Documentation


### Further Reading {#references-further-reading}

-   LLVM Language Reference Manual, pointer semantics and provenance sections
-   ISO WG14 N2310, **Pointer Provenance and Optimizations**
-   Jones, Hosking, Moss, **The Garbage Collection Handbook**
-   Bacon et al., **A Unified Theory of Garbage Collection**
-   CHERI Architecture, **Capability Hardware Enhanced RISC Instructions**
-   Preshing, **Memory Reordering and Synchronization**
-   MISRA C Guidelines
-   AUTOSAR Classic Platform Documentation
-   seL4 Microkernel Documentation and Verification Papers

---


## Closing {#closing}

Pointers are not a relic.
They are a direct expression of machine behavior.

The failure was never their existence, but their ubiquity without constraint.

A modern language does not need to eliminate pointers.
It needs to put them where intent is visible and responsibility is unavoidable.
