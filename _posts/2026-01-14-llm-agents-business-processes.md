---
layout: post
title: "Why You Should Think Twice About LLM Agents for Business Processes"
date: 2026-01-14
description: "Run your business on a poem generator, I dare you!"
---

Your LinkedIn feed is full of AI success stories. Tech conferences buzz with demos of “Agentic AI” handling customer service, processing refunds, and managing workflows. Everyone’s racing to automate everything with large language models. The promise is irresistible: handle unstructured input, automate complex decision-making, eliminate human bottlenecks. But here’s what the hype machine isn’t telling you: the technology everyone’s excited about is fundamentally unsuited for the job they want it to do.

This article isn’t about being a technology pessimist or raining on the AI parade. Large language models are remarkable tools that have legitimate, powerful applications. But when we hand critical business decisions to systems that don’t actually understand what they’re processing - systems designed to generate plausible text, not make accurate judgments - we’re setting ourselves up for failure. Let’s solve this issue, shall we?

## The Core Problem: An LLM Does Not Hold Knowledge

When you ask ChatGPT, “What’s the capital of France?” it doesn’t hesitate. “Paris,” it responds. An LLM’s answer is formatted correctly and grammatically sound. Ask it about quantum computing, medieval history, or your favourite programming language, and you’ll get responses that sound authoritative. The model employs proper terminology and structures its explanations in a manner consistent with that of a subject matter expert.

But here’s the reality: that confident “Paris” isn’t coming from any internal knowledge of French geography. The model isn’t consulting some internal database of world capitals. It’s making a statistical prediction that, given the sequence of tokens “What’s the capital of France,” the most likely next tokens are “Paris.” It sounds identical to knowledge, but it’s actually just sophisticated pattern matching.

This is where most people fundamentally misunderstand what they’re working with. There’s a crucial distinction between recreating facts and retaining knowledge that often gets lost in the excitement. When you ask a human expert, “What’s the capital of France?” they’re accessing stored knowledge about geography, political structures, and factual information they’ve learned and understood. When you ask an LLM the same question, it’s running a probability calculation across billions of parameters to predict what text should come next.

Here’s what this means technically: no matter how you tweak the parameters - adjust the temperature, modify top-p settings, or fine-tune the system prompts - you’re still dealing with token prediction at its core. Even if you somehow had access to perfect training data with zero errors, the model still doesn’t “learn” facts in the way humans do. It learns statistical patterns about how words and concepts relate to each other in text. A large language model is exactly that: a language model. It models language, not knowledge.

This language modelling makes an LLM perfectly suitable for writing a Christmas poem, drafting an email, or generating code snippets based on examples. Should you be comfortable using the same model to make business decisions that require an actual understanding of facts, context, and implications? You decide.

## Why This Matters for Business Applications

This isn’t just a theoretical computer science problem - it strikes at the heart of what makes business processes reliable. Real knowledge work requires actual understanding of facts, relationships, and context. When a human analyst reviews a financial report, they understand what revenue means, how it relates to costs, and what seasonal patterns might indicate about future performance. When an LLM processes the same report, it’s identifying textual patterns that correlate with human-labelled “good” and “bad” outcomes, but without any deeper comprehension.

Business decisions require verifiable and traceable information sources. In regulated industries, you must be able to cite specific data sources and clearly explain the methodology used to reach a conclusion. “The AI said so” won’t satisfy auditors, compliance officers, or legal teams when things go wrong. Critical business processes can’t rely on “statistically likely to be correct” - they need to be actually correct, with clear reasoning chains you can examine and defend.

The stakes in business contexts are simply too high for “sounds right” to be good enough. A wrong recommendation might cost your company thousands of dollars, damage customer relationships, or expose you to legal liability. The pleasant, confident tone of an LLM’s response doesn’t change the fundamental reality that you’re making important decisions based on sophisticated guesswork rather than verifiable knowledge.

## “But RAG Will Solve This!”

Here’s where someone inevitably jumps in with “but what about RAG?” Retrieval Augmented Generation is supposed to fix everything, right? You provide the LLM with the correct context, relevant documents, and necessary information, and it will surely give you accurate answers. Well, here’s the thing about that theory.

I’ve seen this play out in RAG scenarios where the user asks a question and your knowledge base produces a couple of relevant answers. You can achieve a lot with prompt engineering, but the LLM might still attempt to “explain” the results by inadvertently linking them together. The results might not be related at all, but an LLM is happy to fill in those gaps with whatever sounds plausible.

Take this example: I ask an agent about Lisa (a fictional colleague) to give me a list of people she worked with in the past. The knowledge base contains projects that indeed list teammates, but it also includes trainings that Lisa provided, as well as a list of people who followed a specific training. What happened? Everyone she’d given training to became a teammate. And everyone who followed that other training also became a teammate.

Here’s the uncomfortable reality: an LLM isn’t guaranteed to interpret the retrieved information correctly. Whatever the result is from the knowledge base, you can’t trust the LLM output to be factual, even when the results are 100% correct. The unreliability isn’t just in the retrieval - it’s in the interpretation layer, even with perfect source material.

## “But It Works 99% of the Time!” The Invisible Failure Problem

The counterargument you’ll hear is that someone has seen it work. And they likely did! There are numerous examples, also in research papers, that illustrate various instances where an agent gets it right. A more pessimistic writer might attribute this to the datasets that skew the results. In any case, this success actually creates a more insidious problem: it fosters dangerous overconfidence while making real failures nearly impossible to detect.

Consider the distinction between traditional factory automation and these “advanced” AI systems. When a 1980s robot welded a car door shut, or when robots started painting each other (both of which happened), you knew immediately that something had gone wrong. The failure was visible, measurable, and fixable. But when an LLM agent makes a mistake in processing customer requests or analysing documents, the error often looks perfectly reasonable on the surface. It is in the nature of an LLM to confidently back up an earlier mistake.

Consider the Air Canada case, where their customer service agent fabricated a bereavement fare discount policy1. The system delivered the wrong information with complete confidence, using proper corporate language and formatting. The customer had no reason to doubt it until they tried to claim the discount later. Even then, it took a court case to resolve - because who questions an official company system? Air Canada lost that case, by the way. Just because you let a machine generate plausible-sounding text, it doesn’t make you less liable for the content.

Now imagine that same scenario playing out with background agents that process claims, route requests, or make recommendations without human oversight. These systems can operate for months, making subtle yet consequential errors that only become apparent when patterns emerge or major problems accumulate. Unlike conversational agents, where you can at least review the output, these background processes create an accountability gap that allows mistakes to compound invisibly.

## A Better Way: Process Simplification First

But don’t worry! The solution isn’t to avoid automation entirely - it’s to do it right. I believe LLMs can even play a role in this! There’s a proven approach for this, though it’s not particularly new or exciting. Toyota figured this out decades ago with its factory automation processes. They didn’t just throw robots at complex manufacturing problems. Instead, they took a methodical approach: inspecting the existing process, understanding every step, breaking it down into component parts, and then making those parts as simple as possible.

Here’s the approach distilled into three clear steps:

## Step 1: Make It Dead Simple

Before you automate anything, make the process so simple that a human would feel it’s beneath their capabilities to spend time on it. I call this the “undignified test” - if the task is so straightforward, so mechanical, so devoid of judgment calls that humans find it boring and repetitive, then you’ve probably simplified it enough to automate safely.

Think about the difference between “process this customer refund request” (complex, requires judgment) versus “if the customer paid in the last 30 days and the order status equals ‘shipped’ and the return reason equals ‘damaged’, then approve refund” (simple, mechanical, deterministic). The first requires human understanding of context, policies, and edge cases. The second is just following a flowchart.

If there are still judgment calls, edge cases, or “it depends” scenarios, you’re not done yet. Keep breaking it down until you have something mechanical and boring - the kind of task people would rather hand off to a computer because it’s beneath their capabilities.

## Step 2: Automate with Deterministic Techniques

Once you’ve achieved that level of simplification, then you automate - but with deterministic techniques that you can predict, test, and debug. Here’s the thing: we have numerous great “classic AI” and non-GenAI techniques that actually work reliably. Natural Language Processing offers a wide range of valuable tools. And don’t forget, software developers already know how rule engines, decision trees, traditional programming logic and database lookups work!

This is deterministic stuff that does exactly what you tell it to do, every single time. These are mature areas that are extremely testable and repeatable. They won’t surprise you with creative interpretations of your requirements. Technologies that do exactly what you tell them to do, every single time.

## Step 3: Sprinkle GenAI Sparingly - Where It Adds Value

Now, and only now, consider where an LLM might genuinely add value. When you do bring in an LLM, think about it as the “language” layer, never the decision layer.

The best use case for an LLM is generating text - maybe you want to describe the output of your automation in a friendly, human-readable way. And sparingly, you might use an LLM to turn human input into structured input for your automation system. You’re still running into the non-deterministic side of the technology, but now you’ve reduced the risk by making as much as possible deterministic first. LLMs are also genuinely good at intent analysis - much better than classic NLP methods - so that’s another valid interface point.

However, remember that even in these “safe” applications, you’re dealing with user input and LLM input, so ensure you verify everything deterministically. Think of LLM output the same way you’d treat any other user input - with extreme caution.
Safeguards and Human-in-the-Loop

When you do use LLMs in your simplified processes - remember, sparingly and only for the language layer - you need robust safeguards. This isn’t optional nice-to-have stuff; it’s essential for any system where accuracy matters. I’ll write a more extensive post on this point in the future.

# For CTOs and Engineering Leaders

My main piece of advice is simple: utilise automation for processes that are easy to understand. And if you must apply it to something difficult, ask yourself how you can simplify it first. This isn’t about avoiding technology - it’s about using the right technology for the right job.

Let humans do the critical thinking. They become amazing at that when you take the simple, repetitive stuff out of their hands. When you free people from mind-numbing tasks, they don’t become obsolete - they become more valuable because they can focus on what humans actually excel at: understanding context, making judgment calls, and thinking through complex scenarios that require real comprehension. The same accolades that the Tech Bros give to AI.

Don’t fall for the trap that artificial intelligence can run your business for you. It can’t, and pretending otherwise sets you up for expensive failures that might not surface until it’s too late to fix them easily.

## Beyond the Hype

Here’s something important to remember: your LinkedIn feed, your news feed, wherever you get your tech news - it’s full of people shouting “this will work!” Agentic AI is envisioned as the future. And you know what? It very well might be. But I don’t think it’s going to be next-token prediction models that get us there. These models have fundamental limitations that are unlikely to change in the near future.

The technology you use to turn a shopping list into a cooking recipe can’t run your business for you. LLMs are phenomenal at language tasks - generating text, understanding intent, formatting output - but they’re not business decision engines. When you need something that understands your customers, your processes, and the context of your industry, you need systems built for comprehension, not linguistic pattern matching.

Let’s educate ourselves about what these technologies actually do under the hood. Investigate by building non-critical things first. Test your assumptions with low-stakes applications. And most importantly, discuss your findings with other technical leaders who are grappling with the same questions. The hype machine wants you to move fast and deploy everything, but the smart money is on moving thoughtfully and deploying strategically.
