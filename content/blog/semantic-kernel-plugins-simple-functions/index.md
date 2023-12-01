---
title: Getting Started With Semantic Kernel - Plugins and Functions
date: "2023-12-01T13:15:00.000Z"
description: "Let's talk about Functions. How do you create Semantic Functions inline or in a file?"
---

In my [previous post][1] I talked about the basics of Semantic Kernel. In this post I'll talk about Functions and Plugins. I'll show you how to create a simple function in code, and how to create a function in a file.

There are two types of functions in Semantic Kernel: Semantic Functions and Native Functions. Semantic functions deal mostly with langauge. Common uses for these functions are interpreting and responding to user requests. In C#, these functions are usually implemented as a simple string, or a dedicated text file. However, there's nothing stopping you from implementing them as a class, which is how you would implement a native function.

Native functions are functions that you implement in code. When you write a function in C#, you can build functions that can achieve anything you can program. You can use these functions to retrieve data from a database, or to do complex math. This means your functions could also call other parts of your application. For instance, in the case of a webshop, you could have a function that adds an item to a shopping cart. But let's not get ahead of ourselves, let's start with semantic functions.

[1]: ../semantic-kernel-getting-started/
