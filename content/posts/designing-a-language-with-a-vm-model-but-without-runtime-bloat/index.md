+++
title = "Designing a Language with a VM Model but without Runtime Bloat"
date = 2025-11-21
lastmod = 2025-11-21T17:36:13-07:00
slug = "designing-a-language-with-a-vm-model-but-without-runtime-bloat"
tags = ["compiler", "language-design", "virtual-machine", "native-binaries", "systems-programming"]
draft = false
+++

{{< figure src="/index.png" >}}

Many developers want the clarity and control that comes from designing a language around a custom virtual machine, but they do not want to ship a heavy runtime, a slow interpreter, or a dependency that resembles Java or the .NET framework. A language can use a virtual machine internally while still producing very small native binaries. The VM becomes the semantic core, not a component that must be delivered to the end user. This article explains how such a system can be designed, how to structure the toolchain, and how to keep native executables small and portable.

---


## Table of Contents {#table-of-contents}

-   [Background: Transpiling to High Level Languages](#background)
-   [Using a VM as an Internal Model](#internal-vm)
-   [Ensuring No VM Is Needed at Runtime](#no-runtime-vm)
-   [Methods for Producing Small Native Binaries](#small-binaries)
-   [Controlling Runtime Size](#runtime-size)
-   [Size of the VM in This Model](#vm-size)
-   [Why Use a VM Internally](#why-vm)
-   [Real World Uses](#uses)
-   [Example Workflow](#workflow)
-   [Conclusion](#conclusion)

---


## Background: Transpiling to High Level Languages {#background}

A common early strategy in language design is to transpile to an existing language such as C, C++, Rust, JavaScript, or Python.

Advantages:

-   reuse of established compilers
-   platform portability
-   free tooling
-   reduced initial engineering effort

However, this introduces problems.

Issues with semantics:

-   evaluation order differences
-   incompatible integer rules
-   mismatched memory models
-   incompatible error handling
-   garbage collection assumptions
-   pointer and aliasing rules you do not control

Issues with performance:

-   hidden allocations
-   reordering of operations
-   unexpected bounds checks
-   unpredictable optimizations
-   timing differences across host versions

---


## Using a VM as an Internal Model {#internal-vm}

A more stable approach is to define an internal virtual machine that encodes the semantics of your language. This VM is not shipped with user applications.

Benefits:

-   precise semantics
-   stable representation for all backends
-   straightforward debugging
-   clean path to interpreters, JIT engines, or AOT compilers
-   well understood design patterns

VM forms:

-   stack based bytecode
-   register based bytecode
-   SSA based IR
-   custom instruction sets

---


## Ensuring No VM Is Needed at Runtime {#no-runtime-vm}

A language can use a VM internally while delivering pure native binaries.

Compiler only mode:

1.  Parse and typecheck.
2.  Lower to VM IR.
3.  Optimize IR.
4.  Translate to C, LLVM IR, or direct machine code.
5.  Emit a static native binary.

Development VM mode:

-   REPL
-   scripting
-   debugging
-   prototyping

Hybrid mode:

-   interpreted VM optional
-   compiled binaries never depend on it

---


## Methods for Producing Small Native Binaries {#small-binaries}

Several established paths produce small binaries while using a VM internally.

Approach A: lower IR to C

-   high portability
-   very small binaries with a minimal C runtime
-   proven C optimizers
-   predictable size

Approach B: lower IR to LLVM IR

-   strong optimization pipeline
-   multi architecture output
-   ahead of time compilation
-   link time optimization for compact results

Approach C: direct machine code generation

-   full control of emitted code
-   smallest possible footprint
-   precise low level optimization

---


## Controlling Runtime Size {#runtime-size}

A minimal runtime avoids the large footprints found in traditional VM ecosystems.

Keep the runtime minimal:

-   string utilities
-   optional bounds checking
-   allocation helpers if needed
-   minimal IO wrappers

Avoid:

-   reflection systems
-   heavy metadata
-   JIT engines
-   large class libraries
-   complex GC systems unless required

Make advanced features opt in.
Split the standard library into modules.
Provide freestanding and minimal modes.

---


## Size of the VM in This Model {#vm-size}

The VM lives in the compiler, not the output binary.

Typical runtime sizes:

-   minimal: 50 to 200 KB
-   with utilities: 200 to 400 KB
-   with small GC: 400 KB to 1.5 MB

---


## Why Use a VM Internally {#why-vm}

Reasons:

-   precise semantics
-   predictable behavior across targets
-   simpler backend development
-   clearer debugging
-   future optional JIT support

---


## Real World Uses {#uses}

This model supports:

-   command line tools
-   servers
-   native applications
-   games
-   embedded systems
-   desktop software
-   scripting and extension systems

---


## Example Workflow {#workflow}

1.  Write code
2.  Parse and typecheck
3.  Lower to VM IR
4.  Optimize IR
5.  For development:
    -   interpret IR
    -   debug IR
6.  For production:
    -   lower to C or LLVM IR
    -   compile to native code
    -   produce a static binary

---


## Conclusion {#conclusion}

Using a VM internally gives clear semantics, stable architecture, and small executables without shipping a virtual machine. It avoids semantic mismatches, produces predictable performance, and provides a strong base for future features.
