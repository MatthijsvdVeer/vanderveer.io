---
title: I Actually Built A Worse Model Uploader
date: "2021-09-29T12:00:00.000Z"
description: Eating a slice of humble pie, while deploying Azure Digital Twins models at scale.
---

I wrote about building a different implementation to the Model Uploader [here](../building-a-model-uploader/), and wrote about how my implementation could upload a large ontology in 20 calls rather than 1000+. Well, time to eat some humble pie, because that tool is now deprecated and replaced by Microsoft with one that can easily do the same in... hold on... 3 calls. You can find this new implementation [here][1].

The new version is quite elegant, and revolves around ordering all of the interfaces by way of their dependencies. It's definitly worth checking out if you have to deal with large ontologies like RealEstateCore.

Still, it was a fun project to work on. I fully recommend building your own tools, you learn a lot about edge cases you might not have thought of before.

[1]: https://github.com/Azure/opendigitaltwins-tools/tree/master/ADTTools