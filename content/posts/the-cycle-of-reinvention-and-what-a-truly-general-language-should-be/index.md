+++
title = "The Cycle of Reinvention - and What a Truly General Language Should Be"
date = 2025-11-19
lastmod = 2025-11-19T11:25:33-07:00
slug = "the-cycle-of-reinvention-and-what-a-truly-general-language-should-be"
tags = ["programming", "languages", "language", "design", "software", "history"]
draft = false
+++

{{< figure src="/index.jpg" >}}


## Introduction {#introduction}

Programming languages are supposed to evolve, but most of the time they "revolve".
Every "new" language borrows the brilliance of its ancestors and adds new layers of safety, syntax, or ideology.
Yet somehow, the more we add, the less complete the result becomes.

This is an overview of:

-   where modern languages borrow their ideas from,
-   what they accidentally broke along the way,
-   and what a truly unified, general, high performance, developer friendly language could look like if we stopped fragmenting the past.


## 1. Lisp → Clojure, Rust Macros, Python Metaclasses {#1-dot-lisp-clojure-rust-macros-python-metaclasses}

-   Inherited: code as data, macros, functional purity, garbage collection.
-   Broken in successors:
    -   Clojure tied to JVM, lost simplicity and direct system access.
    -   Rust macros powerful but over engineered, not Lisp elegance.
    -   Python metaprogramming works, but lacks homoiconicity, you cannot rewrite yourself.
-   Lesson: the oldest ideas like REPLs, reflection, and meta control remain superior. Everything since has been syntax decorated constraint.


## 2. Smalltalk → Ruby, Python, JavaScript {#2-dot-smalltalk-ruby-python-javascript}

-   Inherited: message passing, dynamic objects, readable code, REPL culture.
-   Broken:
    -   Lost live systems, Smalltalk was an operating environment, not just syntax.
    -   Modern OOP is half baked, no image, no live time travel, no full reflection.
-   Lesson: interactivity and live coding were once standard. Now we call it "hot reload" and pretend it is new.


## 3. C and C++ → Rust and Zig {#3-dot-c-and-c-plus-plus-rust-and-zig}

-   Inherited: bare metal power, manual control, deterministic performance.
-   Broken:
    -   C unsafe by default.
    -   C++ complexity collapse, templates, undefined behavior, ancient syntax scars.
    -   Rust brilliant but verbose, ownership dominates mental space.
    -   Zig clarity and simplicity but young ecosystem and limited metaprogramming.
-   Lesson: the closer to the metal, the clearer abstractions must be. Zig almost gets it right.


## 4. ALGOL → Pascal → Go, Java, Swift {#4-dot-algol-pascal-go-java-swift}

-   Inherited: structured programming, human syntax, compilation model.
-   Broken:
    -   Go simplified too far, no generics for years, workarounds everywhere.
    -   Java safety via verbosity.
    -   Swift beautiful surface, unstable internals, Apple locked.
-   Lesson: safety should not mean losing power. Orthogonality matters more than boilerplate.


## 5. Scheme → JavaScript → TypeScript {#5-dot-scheme-javascript-typescript}

-   Inherited: closures, lexical scope, functional nature.
-   Broken:
    -   JavaScript abandoned tail calls, added quirks.
    -   TypeScript retrofits correctness on chaos.
-   Lesson: interpreted languages can be elegant and safe when designed from first principles.


## 6. ML → Haskell → Rust → Kotlin {#6-dot-ml-haskell-rust-kotlin}

-   Inherited: type inference, algebraic data types, pattern matching.
-   Broken:
    -   Haskell pure but detached from real world side effects.
    -   Rust strong types but error messages overwhelming.
    -   Kotlin tries blending FP and OOP but ends verbose and JVM bound.
-   Lesson: types should guide, not punish.


## 7. Prolog → Logic DSLs, SQL, Rules Engines {#7-dot-prolog-logic-dsls-sql-rules-engines}

-   Inherited: declarative logic, unification.
-   Broken:
    -   Modern versions neutered, no full recursion or backtracking.
    -   SQL logic stripped of reasoning.
-   Lesson: declarative can be powerful when not constrained to rigid subsets.


## 8. APL → MATLAB → NumPy → JAX {#8-dot-apl-matlab-numpy-jax}

-   Inherited: array oriented programming, concise vector logic.
-   Broken:
    -   Terse notation replaced with boilerplate.
    -   Library inconsistencies.
-   Lesson: expressiveness matters, one line of APL replaced entire frameworks.


## 9. Erlang → Elixir → Go → Akka {#9-dot-erlang-elixir-go-akka}

-   Inherited: actor model, fault tolerance, message passing.
-   Broken:
    -   Elixir tied to BEAM.
    -   Go copied syntax but lost supervision hierarchy.
-   Lesson: concurrency is resilience, not threads.


## 10. Forth → Lua → Modern Embeddables {#10-dot-forth-lua-modern-embeddables}

-   Inherited: simplicity, portability, extensibility.
-   Broken:
    -   Lua lightweight but lacks composable syntax and tooling.
    -   No modern systems languages adopt Forth introspection.
-   Lesson: simplicity means maximum leverage per keystroke.


## 11. Python {#11-dot-python}

-   Borrowed from ABC, Lisp, Smalltalk, and C.
-   Strengths: readability, batteries included, giant ecosystem.
-   Broken:
    -   Slow interpreted performance.
    -   Dynamic typing creates subtle runtime bugs.
    -   Packaging complications and slow startup.
-   Lesson: simplicity must scale.


## 12. JavaScript {#12-dot-javascript}

-   Borrowed from Scheme, Self, Java, and C.
-   Strengths: runs everywhere, async first, dynamic.
-   Broken:
    -   Inconsistency, coercion chaos.
    -   Dependency explosion.
    -   Weak standard library.
-   Lesson: ubiquity without elegance.


## 13. Rust {#13-dot-rust}

-   Borrowed from C, ML, and Haskell.
-   Strengths: safety, concurrency, zero cost abstraction.
-   Broken:
    -   Compiler friction, heavy syntax, slow builds.
-   Lesson: safe systems language should not require battling the compiler.


## 14. Zig {#14-dot-zig}

-   Borrowed from C, D, Ada.
-   Strengths: simplicity, predictable memory, comptime, no hidden control flow.
-   Broken for now:
    -   Small stdlib, few high level libraries.
    -   Young, fast moving.
-   Lesson: near ideal modern C reboot.


## 15. Go {#15-dot-go}

-   Borrowed from C, Oberon, Pascal.
-   Strengths: simplicity, concurrency, fast compiles.
-   Broken:
    -   Missing generics until late.
    -   Manual error handling.
    -   Awkward modules.
-   Lesson: over simplicity becomes complexity.


## 16. Modern Meta Languages: Nim, Crystal, Julia {#16-dot-modern-meta-languages-nim-crystal-julia}

-   Nim metaprogramming like Lisp, syntax like Python, compiles to C.
-   Crystal Ruby syntax with LLVM.
-   Julia dynamic with JIT for math.
-   All share strong ideas but limited ecosystems.
-   Lesson: the middle ground exists but lacks universal runtime vision.


## 17. What a Truly General, Good Language Should Be {#17-dot-what-a-truly-general-good-language-should-be}

If we distilled 70 years of evolution, the ideal language would:

****Be low level when needed and high level when wanted****

-   Predictable memory, no GC unless asked.
-   Macros, reflection, live runtime.

****Be multi domain****

-   Compile to native, WASM, and bytecode.
-   Unified backend for OS, games, and web.

****Have composable concurrency****

-   Actors, async, green threads unified.

****Support metaprogramming without pain****

-   Compile time reflection.
-   Simple homoiconic macros.

****Have a sane type system****

-   Inference when obvious.
-   Types help, never obstruct.

****Have native build and package simplicity****

-   One command for everything.

****Use expressive minimal syntax****

-   Optional semicolons, one clear way to do things.

****Be ergonomic across domains****

-   Instant scripting.
-   Predictable compilation.
-   First class WASM or JS interop.

****Be transparent and honest****

-   No magic or invisible allocations.
-   Readable IR by default.

****Enable live interactivity****

-   Inspect, modify, hot reload like Smalltalk and Lisp.


## 18. Closing Thoughts {#18-dot-closing-thoughts}

Every generation rediscovers half of the past and forgets the other half.
Innovation is not missing, synthesis is.
The ideal language will not come from new syntax but from remembering why the old ideas worked.

> "Languages do not evolve. They reincarnate, each lifetime shorter, shinier,
> and more forgetful than the last."


## 19. Language Lineage Overview {#19-dot-language-lineage-overview}

-   Assembly 1949, total control, tedious, foundation layer.
-   Fortran 1957, numeric speed, old syntax, still active in HPC.
-   Lisp 1958, macros and meta systems, verbose and niche, timeless idea.
-   COBOL 1959, business stability, verbose, still running finance.
-   APL 1964, array power, symbolic barrier, elegance lost.
-   C 1972, speed and simplicity, unsafe and module limited, eternal baseline.
-   Smalltalk 1972, pure OOP and live image, heavy and niche, lost brilliance.
-   Prolog 1972, declarative logic, slow IO integration, forgotten gem.
-   SQL 1974, declarative data, procedural pain, eternal backend.
-   C++ 1983, performance and abstraction, complexity collapse, overgrown.
-   MATLAB 1984, math and visualization, proprietary, academic legacy.
-   Objective C 1984, dynamic OO, obsolete, legacy bridge.
-   Erlang 1986, concurrency and resilience, niche BEAM, fault tolerant art.
-   Perl 1987, text processing, readability issues, declining but rich.
-   Bash 1989, automation, awkward syntax, everywhere.
-   Haskell 1990, pure FP, steep learning curve, academic beauty.
-   Python 1991, readability and libraries, slow runtime, great scripting.
-   Lua 1993, lightweight embeddable, weak typing, ideal scripting core.
-   R 1993, stats and analysis, slow and odd syntax, academic mainstay.
-   Java 1995, portability and GC, verbosity, corporate standard.
-   JavaScript 1995, ubiquitous and async, inconsistent, messy everywhere.
-   Ruby 1995, expressive syntax, slow and memory heavy, developer friendly.
-   PHP 1995, easy web dev, inconsistent legacy, evolving relic.
-   Racket 1995, elegant Scheme, niche, educational elegance.
-   C# 2000, strong .NET tooling, historical Windows bias, robust ecosystem.
-   Scala 2004, hybrid FP + OO, slow compiles, complex but powerful.
-   F# 2005, FP on .NET, limited mindshare, practical FP.
-   Go 2009, simple and fast compile, lacks generics, pragmatic minimalism.
-   Kotlin 2011, null safety and modern syntax, JVM bound, better Java.
-   Dart 2011, UI friendly, narrow ecosystem, modern niche tool.
-   Julia 2012, scientific JIT, startup lag, math darling.
-   TypeScript 2012, typed JS, loose typing, safer JS layer.
-   Elixir 2012, BEAM resilience, niche, production FP.
-   Nim 2014, meta and native builds, young ecosystem, hidden potential.
-   Crystal 2014, Ruby like native, limited adoption, Ruby with teeth.
-   Swift 2014, modern safe performant, Apple locked, elegant but limited.
-   Rust 2015, safe systems programming, complex builds, safe power tool.
-   Zig 2019, simple predictable systems, small stdlib, modern C reboot.

> "A proper general language would merge Zig honesty, Lisp metaprogramming, Smalltalk introspection, Rust safety, and Python ergonomics into a reflective and real time system that is both scripting friendly and systems capable."
