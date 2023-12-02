---
title: Getting Started With Semantic Kernel - What is Semantic Kernel?
date: "2023-11-30T18:17:00.000Z"
description: "What is Semantic Kernel and how do you get started with it? In this post I'll cover the absolute basics."
---

Building with LLMs is a great way to add more intelligence to your applications. You can talk to LLMs directly by calling their APIs, for instance, on OpenAI or Azure OpenAI. A little string concatenation can get you very far in building what I (and the company I work for, Xebia) like to call "Level 1" and "Level 2" applications. But what if you want to build something more complex? What if you want to build a "Level 3" application? That's where Semantic Kernel comes in.

## Different Levels Of Applications

**Level 1** covers the very basics. You send a request to an LLM, and it will respond by completing the sentence you sent it. This is great for building a simple chatbot that doens't need to "know" anything beyond the data in its impressively big training set. You could use this to build applications that answer questions, write short stories, or create cooking recipes. I use this type of application to [create self-guided meditations][1]

Sometimes you need your application to "know" information that the LLM was not trained on, this is where **Level 2** comes in. In the case of a chatbot, instead of sending the user message directly to the LLM, you first send it to a search engine, or vector database. This search engine will return a list of relevant documents. You then send these documents to the LLM, and it will complete the sentence. This is great for building chatbots that can answer questions about a specific topic, or write stories about a specific topic. We call this pattern "Retrieval Augmented Generation" (RAG), give it a search online and you'll find a lot of interesting articles about it.

This brings us to **Level 3**, a world of intelligent software, where we use LLMs not just to generate natural language. We can also use them to plan, reason, and make decisions. This is where Semantic Kernel comes in. Semantic Kernel is a framework that allows you to build applications that can reason about the a problem, and make decisions based on that reasoning. It's a popular alternative to Langchain, and it's available in Python, C# and Java.

## The Basics - Functions and Plugins

You might have heard the term "Plugin" before in the context of ChatGPT. A plugin can be used to execute functions that an LLM is just not that good at, or to execute functions that an LLM needs help with. Semantic Kernel is an [open-source project][2] that helps build these plugins.

In Semantic Kernel terms, a plugin is a collection of functions. Functions could be anything ranging from:

- A simple prompt
- Doing complex math and explaining the result with an LLM
- Retrieving data from an external source

A function can be anything you have the skills for to program. The project also provides some [core plugins][4] that you can use out of the box. Some of these plugins are just 1 function, others are a collection of functions.

## Abstracting Away The Complexity

Semantic Kernel tries to take away some of the complexity of working with LLMs. One way it does that is by abstracting away the underlying LLM API. Instead of talking directly to the (Azure) OpenAI API, you just tell the Kernel what models you want to use, and it will take care of the rest.

Another way it helps decrease the complexity, is when you want to deal with "memory". Especially if you're coming from a level 2 application, working towards the next level, you'll find that Sementic Kernel has tools in place to deal with your knowledge base. You can store data in Semantic Kernel "memory" and retrieve it later. You can have this memory in your application, stored in your RAM. But Semantic Kernel also offers [different connectors][5] for a lot of databases.

## Planners

Perhaps the most impressive use of LLMs to date, and the very core of a Level 3 application, is the ability to plan. When you want to use this feature, you build several Functions and offer them to an LLM. The LLM will then decide which functions to execute, and in which order. This is a very powerful feature, and it's what makes Semantic Kernel so interesting.

## Getting Started

The above should give a little overview of Semantic Kernel, but if you want to see how all this technology works, you can check out my other articles, where I go into details about all these topics:

- [Plugins and Functions][3]

[1]: https://github.com/MatthijsvdVeer/PeaceProcessor
[2]: https://github.com/microsoft/semantic-kernel/
[3]: ../semantic-kernel-plugins-simple-functions/
[4]: https://learn.microsoft.com/en-us/semantic-kernel/ai-orchestration/plugins/out-of-the-box-plugins?WT.mc_id=IoT-MVP-5004034&tabs=Csharp
[5]: https://learn.microsoft.com/en-us/semantic-kernel/memories/vector-db?WT.mc_id=IoT-MVP-5004034#available-connectors-to-vector-databases
