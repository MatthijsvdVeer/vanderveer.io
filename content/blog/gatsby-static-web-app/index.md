---
title: Using Azure Static Web Apps With Gatsby
date: "2020-06-07T12:00:00.000Z"
description: Building a Gatsby powered blog on Azure Static Web Apps for free.
---

This blog has seen many iterations on different platforms. It started on Wordpress, which I chose because it took little effort to maintain the solution. But having to pay hosting costs while I have perfectly good Azure credits that remain unused didn't sit well with me. Hosting Wordpress yourself becomes very expensive though, so I decided on [Ghost][1], a NodeJS powered blogging engine.

## Build 2020
I simply hosted Ghost in an App Service Plan on Azure for a while and all was good, but then Build 2020 came along. At Build, there was an announcement for Azure Static Web Apps and it promised serverless hosting with seamless integration with GitHub. Also, Azure Static Web Apps is free during this preview. All I needed now was to find a platform to build my blog with that allowed to be compiled into a static package.

I asked some of the front end developers at work and Gatsby was the platform that was mentioned without fail. I figured I would probably have to do a ton of learning because I had never used Gatsby, but then I found out Microsoft Learn already had me covered. I followed the steps on [Create and publish a static web app with Gatsby and Azure Static Web Apps][3] and learned the basics about creating a site ready to deploy to a Static Web App.

## Gatsby Blog
But wait, there's more! Gatsby has a great starter project to create blogs with. [The Gatsby Starter Blog][4] contains everything you need to get started on your blog. What I like most about this starter kit is that you write your blog posts in Markdown. If you've never written Markdown, here's a sample:
    
    ## Gatsby Blog
    But wait, there's more! Gatsby has a great starter project to create blogs with. 
    [The Gatsby Starter Blog][4] contains everything you need to get started on your blog.

So now when I write a blog post, I write it where I write most things: Visual Studio Code. And when I'm finished, I shoot myself a pull request on GitHub. When you create a Static Web App, Azure will add a GitHub Action to your repository that does all the hard lifting. When I make a new pull request, Azure spins up a new instance of my website so I can review my changes before closing the pull request.

![A pull request for Azure Static Web App][pull-request]

Merging the pull request results in an automatic deployment to your Azure Static Web App! Being able to use the tools I use in my everyday job to write blog posts feels really good! You can find the code of this blog [here][5]

[1]: https://ghost.org/
[2]: https://azure.microsoft.com/en-us/services/app-service/static/#overview
[3]: https://docs.microsoft.com/en-us/learn/modules/create-deploy-static-webapp-gatsby-app-service/?WT.mc_id=AZ-MVP-5004034
[4]: https://github.com/gatsbyjs/gatsby-starter-blog
[5]: https://github.com/MatthijsvdVeer/vanderveer.io

[pull-request]: ./pull-request.png