---
title: Getting Started With Semantic Kernel - Plugins and Functions
date: "2023-12-01T13:15:00.000Z"
description: "Let's talk about Functions. How do you create Semantic Functions inline or in a file?"
---

In my [previous post][1] I wrote about the basics of Semantic Kernel. In this post I'll cover about Functions. I'll show you how to create a simple function in code, and how to create a function in a file.

There are two types of functions in Semantic Kernel: Semantic Functions and Native Functions. Semantic functions deal mostly with langauge. Common uses for these functions are interpreting and responding to user requests. In C#, these functions are usually implemented as a simple string, or a dedicated text file. However, there's nothing stopping you from implementing them as a class, which is how you would implement a native function.

Native functions are functions that you implement in code. When you write a function in C#, you can build functions that can achieve anything you can program. You can use these functions to retrieve data from a database, or to do complex math. This means your functions could also call other parts of your application. For instance, in the case of a webshop, you could have a function that adds an item to a shopping cart. But let's not get ahead of ourselves, let's start with semantic functions.

## Inline Functions
There are two ways to create functions in code, the simplest is the Inline Function. It's just a C# string. You can create an inline function like this:

```csharp
string functionDefinition = "Translate {{$input}} to Spanish";
```

To run this function, you need to create a `ISKFunction` object. You can do that like this:

```csharp
string functionDefinition = "Translate {{$input}} to Spanish";
var spanishFunction = kernel.CreateSemanticFunction(functionDefinition);
```

To run this function, we can offer it to the kernel. You can check an example of how to build a kernel in my [GitHub repo][2]

```csharp
string functionDefinition = "Translate {{$input}} to Spanish";
var spanishFunction = kernel.CreateSemanticFunction(functionDefinition);

string topic = "Hello World";
var result = await kernel.RunAsync(topic, spanishFunction);
var translation = result.GetValue<string>();

Console.WriteLine(translation);
```

[1]: ../semantic-kernel-getting-started/
[2]: https://github.com/MatthijsvdVeer/semantic-kernel/blob/main/examples/00-setting-up/notebook.ipynb
