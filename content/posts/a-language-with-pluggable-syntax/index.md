+++
title = "A Language With Pluggable Syntax"
date = 2025-11-20
lastmod = 2025-11-20T16:51:51-07:00
slug = "a-language-with-pluggable-syntax"
tags = ["syntax-pluggable-languages", "language-design", "programming-history", "compilers-and-asts", "developer-experience"]
draft = false
+++

{{< figure src="/index.jpg" >}}


## Introduction {#introduction}

Modern programming languages keep repeating a mistake that goes all the way back to the 1950s: they force you to commit to one syntax. The moment you choose a language, you inherit not only its semantics and features, but also its aesthetic, its indentation rules, its punctuation rituals, and all the historical debt that came with its design.

We live in a world where:

-   Python is elegant but whitespace-constraining.
-   JavaScript is flexible but syntactically chaotic.
-   Rust is powerful but occasionally verbose and ceremonial.
-   Zig is clean but opinionated.
-   C++ is feature-rich but syntactically overloaded.
-   Lisp is semantically pure but syntactically alien to many developers.

Developers end up choosing between features they want and syntax they can tolerate. This article explores the idea of a **syntax-pluggable language**: a single semantic core with optional front-ends, letting developers choose the surface syntax that best fits their cognitive style.

We will explore:

-   the historical roots of syntax-agnostic systems,
-   old languages that almost did this but not quite,
-   the architecture required to implement it today,
-   what editors and tooling would look like,
-   and why this idea, despite its obvious usefulness, has not been broadly realized.


## Historical Background {#historical-background}

The idea that syntax and semantics can be separated is **not new**. In fact, the oldest programming paradigms had much looser syntactic constraints than today.


### COBOL and English-like syntax {#cobol-and-english-like-syntax}

COBOL tried to make code read like English, but the semantics were rigid and the syntax was not customizable. The experiment proved that "natural language syntax" was not a universal solution.


### Lisp and the myth of parenthesis {#lisp-and-the-myth-of-parenthesis}

Lisp was one of the first languages to fully separate semantics from syntax. Lisp effectively uses one syntax: fully parenthesized S-expressions. Behind this simplicity is the core idea that syntax is merely the serialization of an abstract syntax tree (AST). This makes Lisp extremely easy to write custom syntaxes **for**, even if most Lisps never exposed that feature directly to users.

Historically, Lisp is the closest thing to a syntax-pluggable language.

Early Lisp machines allowed:

-   prefix syntax (usual Lisp),
-   ML-like syntax through macros,
-   algebraic infix notations for math,
-   and even natural-language-like DSLs.

But these were achieved through **macros**, not true syntax layers. Most users still interacted through S-expressions.


### ISWIM and Landin’s Abstract Machine {#iswim-and-landin-s-abstract-machine}

Peter Landin in the 1960s proposed separating syntax from semantics. ISWIM ("If you See What I Mean") attempted to give users a semantic core independent of syntax.

Landin introduced:

-   syntax trees as the “true language”
-   surface syntaxes as transform layers
-   a universal core calculus underneath

ISWIM was never fully implemented, but the concept survives in the lambda calculus–based IRs of many compilers.


### Prolog and DCGs {#prolog-and-dcgs}

Prolog introduced **definite clause grammars** which let the language parse arbitrary user-defined syntaxes. Prolog essentially lets you write parsers inside the language itself. This is powerful, but it is not full syntax pluggability for the language itself, it’s user-level parsing.


### Racket and Syntax Objects {#racket-and-syntax-objects}

Racket is the most serious modern attempt. It lets you define new languages inside the Racket ecosystem. Each file can declare:

```racket
#lang slideshow
```

or

```racket
#lang typed/racket
```

Each module literally changes:

-   parser,
-   macro expander,
-   semantics.

Racket is the closest thing we have to "pick your syntax," though in practice you pick an entire language variant, not a syntax module that can be swapped freely over one core.


### Smalltalk and image-based systems {#smalltalk-and-image-based-systems}

Smalltalk environments treat code as objects in memory rather than text files. In principle, this means you could view and edit code through any syntax renderer. Instead of text, you manipulate AST nodes.

This was visionary, but no one built a multi-syntax frontend for it.


### ML, Haskell, Rust, Zig {#ml-haskell-rust-zig}

These languages focus on "semantics-first" design but maintain strong syntactic identities. None allow pluggable syntactic styles. The syntax is part of the brand.


## Why Syntax Became a Prison {#why-syntax-became-a-prison}

Several forces solidified syntax into a language’s identity:

-   Tooling expectations (editor modes, syntax highlighters).
-   Cultural inertia.
-   Teaching materials and documentation.
-   Parser complexity in early languages.
-   Compiler architecture that binds parsing tightly to semantics.
-   Professional ecosystems where syntax familiarity equals hireability.

Thus, languages became tribes where syntax served as both the banner and border.


## The Case for a Syntax-Pluggable Language {#the-case-for-a-syntax-pluggable-language}

Why should such a language exist?

Because we want:

-   language features (modules, ownership, safety, speed),
-   without syntax forcing us into one mental model.

Developers argue endlessly about:

-   tabs vs spaces,
-   brace style,
-   significant whitespace,
-   semicolons vs no semicolons,
-   assignment direction,
-   function call shape,
-   prefix/infix/postfix,
-   type annotations before or after variables.

These are **surface concerns**, not semantic ones.

A syntax-pluggable language would allow:

-   Lisp-like prefix syntax
-   ML/Haskell algebraic syntax
-   C-like block syntax
-   Python-like indentation syntax
-   Zig/Rust style minimal syntax
-   Custom DSL syntax for specialized tasks

All describing the same underlying AST.


## Has Anything Like This Been Tried? {#has-anything-like-this-been-tried}

Several partial attempts exist:


### 1. Sweet-expressions for Lisp {#1-dot-sweet-expressions-for-lisp}

A more readable indentation-based syntax for Lisp. This shows syntax abstraction works, but is still fringe.


### 2. Ioke / J {#2-dot-ioke-j}

Some languages support alternative syntax notations, especially for array programming. But again, not interchangeable syntaxes over the same core.


### 3. Racket {#3-dot-racket}

As mentioned, Racket supports multiple languages over one runtime, but not pluggable syntax over a single language definition.


### 4. Coq / Agda Notation Extensions {#4-dot-coq-agda-notation-extensions}

These allow custom symbols and infix operators. Useful but far from full syntax choice.


### 5. Julia macros generating ASTs {#5-dot-julia-macros-generating-asts}

You can define syntactic sugar, but not whole syntax styles.


### 6. Nim {#6-dot-nim}

Nim’s macros manipulate the AST and allow some syntax-level manipulation. Some people have built Python-like syntax layers on top of Nim. But the base grammar remains.


### Conclusion {#conclusion}

No major language has ever let you choose between **entire** syntax families interchangeably.


## Designing a Syntax-Pluggable Language Today {#designing-a-syntax-pluggable-language-today}

This section explores how you could implement a fully general multi-syntax language.


### Core Idea: AST as the Source of Truth {#core-idea-ast-as-the-source-of-truth}

The language's “real” form is the AST (abstract syntax tree). Text is just one view.

A syntax-pluggable system means:

-   Code is stored as AST or IR, not text.
-   Each “syntax module” is a bidirectional transformation between text and AST.

This is similar to how:

-   JSON, YAML, and TOML represent similar data structures in different formats.
-   Markdown, Org-mode, and HTML represent the same documents.


### Architecture {#architecture}

We need 3 layers:

1.  Surface Syntax Layer
    Converts text - tokens - AST.
    Also supports pretty-printing AST - text.

2.  Semantic Core
    Defines types, functions, modules, semantics, generics, memory models, etc.

3.  Tooling Layer
    Formatters, editors, analyzers, REPLs must understand AST natively.


### Requirements {#requirements}

-   Canonical AST specification
-   Parser combinator framework
-   Pretty-printer framework
-   Semantic phase independent of syntax
-   Editors that interact with AST, not text


### AST Storage vs Text Storage {#ast-storage-vs-text-storage}

Two models:

Model A: Store text files (traditional)

-   Each file declares which syntax it uses.
-   IDE services parse the text according to the chosen syntax.

Model B: Store AST files (Smalltalk-style)

-   File stores AST directly (binary or textual IR like WebAssembly text).
-   Editors render AST into textual syntax according to user preference.

Model B is the purest version of syntax-pluggable programming.


### Syntax Modules {#syntax-modules}

A syntax module contains:

-   A grammar
-   A lexer
-   AST mapping rules
-   A pretty printer

A user might write:

```nil
#syntax zig
```

or

```nil
#syntax python
```

or

```nil
#syntax lisp
```

but all yield the same AST.


### Example {#example}

Consider a function definition in three syntaxes.

Zig-like:

```zig
fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

Python-like:

```python
def add(a: i32, b: i32) -> i32:
    return a + b
```

Lisp-like:

```lisp
(fn add ((a i32) (b i32)) i32
    (+ a b))
```

C-like:

```c
int add(int a, int b) {
    return a + b;
}
```

All have the same AST.


### Editor Integration {#editor-integration}

In a perfect system:

-   You open a project.
-   You select your preferred syntax in the editor.
-   Files appear in your style even if other contributors use different styles.

This is similar to how:

-   Git clients or IDEs let you view diffs in preferred formats.
-   Org-mode can export to many formats while keeping semantic structure.


## Challenges and Why It Hasn't Happened Yet {#challenges-and-why-it-hasn-t-happened-yet}


### 1. Tooling Explosion {#1-dot-tooling-explosion}

Every syntax module requires:

-   Language server support
-   Syntax highlighting
-   Formatter rules
-   Error message mapping


### 2. Diff &amp; version control issues {#2-dot-diff-and-version-control-issues}

Different syntaxes produce different text diffs. If storing AST, this is solved, but storing AST is culturally foreign.


### 3. Compiler complexity {#3-dot-compiler-complexity}

Good news: compilers already parse to AST.
Bad news: they’re monolithic and tightly bound to one grammar.


### 4. Error reporting {#4-dot-error-reporting}

Mapping semantic errors to multiple syntaxes is difficult.


### 5. Community Fragmentation {#5-dot-community-fragmentation}

Developers identify with syntax tribes. Many languages want a unique syntactic identity as part of their brand.


### 6. Linters and analysis tools {#6-dot-linters-and-analysis-tools}

Would require AST-level hooks instead of text-level hooks.


### 7. Education and documentation {#7-dot-education-and-documentation}

Tutorials must refer to syntax variants.


### 8. Performance of parsers {#8-dot-performance-of-parsers}

Multiple grammars - higher maintenance costs.


## Despite All This, It Is Completely Possible {#despite-all-this-it-is-completely-possible}

Modern parsing technologies (PEG, GLL, GLR, Pratt Parsers) make multiple syntaxes entirely feasible.

The core language could have:

-   a canonical AST (like a protobuf schema),
-   pluggable surface grammars,
-   and a stable IR underneath.

This is essentially how:

-   browsers parse HTML, CSS, and JS,
-   compilers handle different target languages,
-   editors like Emacs and VSCode highlight languages.

We already have tools like Tree-Sitter that can handle multiple grammars automatically.

Nothing in theory prevents a modern language from having:

-   C-inspired syntax users,
-   Python-inspired syntax users,
-   Lisp-inspired syntax users,
-   ML-inspired syntax users,

all coexisting on one semantic foundation.


## What It Would Mean for Actual Development {#what-it-would-mean-for-actual-development}


### Beginners {#beginners}

Choose the syntax they find most readable.


### Experts {#experts}

Customize syntax to their workflow.
Lisp-like syntax for metaprogramming, ML-like syntax for type-heavy code, Python-like syntax for glue.


### Teams {#teams}

Different members could write in different syntaxes.
AST diffs remain consistent.
Formatters generate consistent semantic diffs.


### Libraries {#libraries}

Syntax-independent.
Same package works across syntaxes.


### Tooling {#tooling}

Linters, formatters, IDEs operate on AST.
Finally frees us from syntax wars.


## Would This Be a Revolution? {#would-this-be-a-revolution}

Yes.
It would end:

-   indentation wars,
-   braces vs no braces debates,
-   semicolon crusades,
-   language tribalism based on aesthetics.

It would unify programming into a semantic-first discipline, where surface syntax is a preference, not a constraint.


## How Hard Would It Be to Build? {#how-hard-would-it-be-to-build}


### Hard Parts {#hard-parts}

-   Designing a canonical AST that covers all syntax variants.
-   Writing multiple parsers and pretty-printers.
-   Building AST file storage and cross-syntax diff tools.
-   Error message mapping (very hard but solvable).
-   Editor integration.


### Easy Parts (surprisingly) {#easy-parts--surprisingly}

-   Semantic core (normal).
-   Compiling from AST to bytecode or machine code.
-   Supporting macros via AST transformations.
-   Type system (unchanged).

It’s not technically impossible, it’s culturally unprecedented.


## Could We Build a Proof of Concept? {#could-we-build-a-proof-of-concept}

Yes.
We could create:

-   A small typed functional-imperative core (like a mix of Zig + ML).
-   An AST schema using JSON or S-expressions.
-   One compiler backend.
-   Three syntax modules:
    -   Lisp-like
    -   Python-like
    -   Zig-like

-   One editor plugin that shows AST in user-selected syntax.

This would already demonstrate the viability.


## Final Thoughts {#final-thoughts}

The idea of a syntax-pluggable language is not fantasy; it’s the logical evolution of what computing should have done decades ago. Historically, Lisp, ISWIM, Racket, and Smalltalk all came close, but no mainstream language completed the journey.

It is completely feasible today thanks to:

-   modern parser technologies,
-   AST-based tooling,
-   editor extensibility,
-   and programming culture increasingly valuing developer experience.

When languages stop making us choose between features and syntax, developers can finally focus on building systems rather than fighting aesthetics.
