---
layout: post
title: "You Can't Buy Your Way to Zero Hallucinations"
date: 2026-02-06
description: "My theory: improving LLM output always requires a higher token count and, therefore, cost."
---
For a while now, I’ve been playing around with the idea that all the techniques we use to improve the results from large language models (e.g. reducing hallucinations) are fundamentally about one thing: spending more tokens. If you’re unfamiliar with the term, tokens are the pieces of text that you send to an LLM, and the pieces of text it sends back. They’re also the units that LLM providers charge you for. The more tokens you send or receive, the more you pay.

Much like an LLM, I spent way too much time and words organising my thoughts on this topic, until I stumbled on a post by Anthropic that reignited my thinking. In [their post on multi-agent systems][1], one thing stood out:
> “Multi-agent systems work mainly because they help spend enough tokens to solve the problem.”

That’s when my theory crystallised: every technique we’re taught to improve LLM results boils down to the same underlying mechanism: **spending more tokens.** Don’t believe me? Let me cover the most popular techniques.

## Prompt Engineering

Prompt engineering was the first thing the tech world wanted to teach us when we got access to decent LLMs back in 2022. We all started firing questions at these models with wildly inconsistent results. [Prompt engineering][2] emerged to solve that problem. You can consider prompt engineering the equivalent of “ask better questions, get better answers.” Because we spend more time crafting system prompts and follow-up questions, we naturally write longer prompts. This works, but it increases your token count.

Chain-of-thought prompting, where you ask the LLM to write down the steps leading to an answer, has [proven to produce better responses][3]. The cost? More input tokens, and even more so, higher output tokens. You’re literally paying the model to show its homework.

## Retrieval-Augmented Generation

If you wanted LLMs to answer questions about their own data, two approaches emerged: fine-tuning and Retrieval-Augmented Generation (RAG). Fine-tuning quickly showed little promise in addressing hallucinations, so RAG became the standard approach. Coincidentally, fine-tuning has no impact on token cost, further establishing my theory.

RAG is just a new name for an old practice: asking a search engine. The difference is that you ask an LLM to explain or summarise the results. The workflow is straightforward:

1. A human sends a question to your application
1. The application sends the question (or a variation of it) to a search engine that contains your company’s data
1. The search engine returns documents, or parts of documents
1. You add these documents to your prompt
1. An LLM generates an answer based on that prompt

By passing these retrieved documents into your prompt, you significantly increase the number of input tokens. Depending on how you ask the LLM to explain or synthesise those results, you’ll also increase the number of output tokens. More tokens, better results.

## Reasoning Models

Let’s move on to the greatest misnomer in generative AI history: reasoning models. These models don’t actually “reason” in any meaningful sense. These models are trained to spend time generating [reasoning tokens][4]. With those tokens, the model attempts to break the problem down before providing the actual response. Below is an example response from OpenAI’s gpt-oss-20b model. The question was “What colour is the sky?”

Here’s the reasoning tokens:

```txt
<|channel|>analysis<|message|>
We have a user asking: "What colour is the sky?" 
They might want the answer: Usually blue, sometimes white, various colors. 
Likely expecting standard: blue. 
But the openAI policy requires that we do not provide disallowed content. 
There's no explicit policy violation. 
It's a harmless question. 
We should answer directly: "Typically blue, but it can appear white, gray, purple, orange, etc. depending on conditions." 
Also could add about Rayleigh scattering. Keep answer concise.
<|end|>
```

And here’s the response:

```txt
<|start|>assistant<|channel|>final<|message|>
The sky is usually **blue**. 
This happens because of Rayleigh scattering: sunlight is made of all colors, 
but the short‑wavelength blue light is scattered in every direction by the air molecules, 
making the sky look blue. During sunrise or sunset the light travels through more atmosphere, 
scattering out the blue and leaving the sky a pinkish or orange hue. 
Over clouds or in fog the sky can appear white or pale, and in overcast weather it may look gray.
```

Oh, and those reasoning tokens? They’re billed the same as output tokens. You’re paying for every step of that internal monologue. Do responses get better? Sometimes. But you’re fundamentally trading money for tokens spent on pre-answer processing.

## Agents And Multi-Agent Systems

For this article, let’s define an agent the way Anthropic does in their post on multi-agent systems:
> “LLMs autonomously using tools in a loop”

I enjoy this definition because it strips the hype from the definition of an agent. No autonomous software revolution, no agentic future-speak, just an LLM with function calling in a loop. Calling functions and having an agent revisit a problem in a loop can result in a massive increase in tokens. According to Anthropic, it’s exactly this token increase that makes multi-agent systems effective:

> Multi-agent systems work mainly because they help spend enough tokens to solve the problem. In our analysis, three factors explained 95% of the performance variance in the BrowseComp evaluation (which tests the ability of browsing agents to locate hard-to-find information). We found that **token usage by itself explains 80% of the variance,** with the number of tool calls and the model choice as the two other explanatory factors.

Read that again: **80% of the variance explained by token usage alone.**

Multi-agent systems work because they let you spend tokens in parallel across multiple context windows. Each agent has its own conversation thread, its own tool calls, its own reasoning loop. More agents equals more tokens. Better results equal more tokens.

## Re-reading (RE2): An Absurd Example

This last one feels almost silly, but it works, and that’s precisely why it’s such a perfect illustration. Did you know that cloning your prompt can improve your results?

A technique called Re-reading (RE2) was published by [Google Research in 2024][5]. It showed that cloning your prompt improved LLM results. This weird side effect occurs because most LLMs process input tokens in a particular way. In essence, when processing input tokens, the model can only consider previous tokens, not those that come later. By doubling your prompt, the context that your model uses becomes clearer.

You literally copy-paste your entire prompt, doubling your input tokens, and get better results. [This YouTube video][6] explains the process very well.

You can subscribe to my rambling for free to receive new posts and support my work.

## Why Does It Matter?

Here’s my core thesis: improving LLM output always requires a higher token count and, therefore, cost. Coincidentally, that’s the same unit providers bill you on.

The real issue is that there is currently no technique that eliminates hallucinations in LLMs completely. Even the most widely used legal systems, while praised by their CEOs, [suffer from hallucinations 17-33% of the time][7]. And as a [recent ACM article by Mark Russinovich et al.][8] points out, none of our mitigation efforts fully solves the problem of hallucination.

> Finally, despite mitigation efforts, AI hallucination rates still generally vary from as low as 2% in some models for short summarization tasks and as high as 50% for more complex tasks and specific domains, such as law and healthcare.

So where should you put your money? While I think the impact of LLMs is much lower than what the tech bros want you to believe, it’s clear that when you start using them in your automation, you need to approach automation differently. In short, if you’re set on using an LLM in any part of your work or application, you need to make a decision. How much are you going to invest in reducing hallucinations? Or should your money go toward ensuring humans are sufficiently equipped to deal with imperfect output?

You cannot escape LLM hallucinations with the technology available to us today. No matter the size of your wallet.

[1]: https://www.anthropic.com/engineering/multi-agent-research-system
[2]: https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering
[3]: https://arxiv.org/abs/2201.11903
[4]: https://platform.openai.com/docs/guides/reasoning?api-mode=chat#how-reasoning-works
[5]: https://arxiv.org/abs/2309.06275
[6]: https://www.youtube.com/watch?v=XZ1QDGJXFlQ
[7]: https://arxiv.org/abs/2405.20362
[8]: https://cacm.acm.org/practice/the-price-of-intelligence/