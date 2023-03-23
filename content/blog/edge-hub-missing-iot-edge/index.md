---
title: "My edgeHub is Missing! - A Tale of Uncovering the Secrets of Azure IoT Edge"
date: "2023-03-23T12:00:00.000Z"
description: A fresh IoT Edge installation and your edgeHub just won't run? Check this first.
---

Picture yourself setting up your Azure IoT Edge configuration, and suddenly you realize that your edgeHub module is playing hide and seek. Don't worry, you're not alone. Many IoT Edge users have found themselves in this perplexing situation, and I'm here to help you solve the mystery.

## The Puzzle of the Disappearing edgeHub
You've faithfully followed Azure IoT Edge tutorials and managed to get your Raspberry Pi running with IoT Edge. The edgeAgent module is humming along nicely, but the edgeHub module is nowhere to be found. Even more baffling, when you run `sudo iotedge check`, you stumble upon a cryptic error message that raises doubts about your device's production readiness. What's going on?

## The Big Reveal
After hours of combing through Azure IoT Edge documentation, a surprising fact comes to light: the edgeHub module only comes to life when you specify additional custom modules in your deployment manifest. If your manifest only includes the edgeAgent module, the edgeHub module sees no need to join the party and won't run.

## The Solution Unveiled
To get your edgeHub up and running, all you need to do is invite custom modules to your deployment manifest. Once you've added one or more custom modules, edgeHub will take center stage as the message router between your modules and the cloud.

## Conclusion
The mystery of the missing edgeHub is now solved! Keep in mind, if you find yourself in a similar conundrum, double-check your deployment manifest for custom modules. If you only have the edgeAgent module, it's entirely normal for the edgeHub to be MIA. So, go ahead, add your custom modules to bring the edgeHub to life, and enjoy a fully functional Azure IoT Edge setup!
