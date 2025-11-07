+++
title = "Abandoning Windows for Linux - Part 4"
date = 2025-11-06
lastmod = 2025-11-06T00:00:00-07:00
slug = "abandoning-windows-for-linux-part-4"
summary = "Over these five days I transformed my workflow. I learned how to manage time and notes with Org-agenda, linked my journal to Org-roam, wrote admin scripts, fell into the VPN transparency rabbit hole, considered building my own mail server, and wrestled with the absurd verification hurdles of modern social media. By the end of the week, I had a working Hugo blog fully integrated with Emacs keybindings and a deeper appreciation for how messy, funny, and rewarding the digital world can be when you insist on doing things your own way."
tags = ["windows", "linux", "os", "arch"]
draft = false
[cover]
  hidden = true
  hiddenInSingle = true
  hiddenInList = true
+++

## Day 6: Getting Organized with Org-Agenda {#day-6-getting-organized-with-org-agenda}

Today was the first time I truly appreciated how powerful Org-mode can be once it starts making sense. I spent most of the day learning how to use org-agenda. It took some experimenting to understand how it pulls data from multiple files and converts them into one coherent daily overview. It felt like turning chaos into order.

I decided to migrate my journal entries from org-journal to org-roam-dailies, so now my daily notes live inside the same network of interconnected ideas as the rest of my knowledge base. Everything is linked. Every thought can reference a project or concept. It feels like building a second brain that finally remembers things for me.

To make the system even more useful, I wrote a few admin utility scripts. One of them grants users time-limited sudo permissions. The idea came from my constant need to run short-lived administrative tasks without leaving wide-open permissions lying around. Now I can elevate access for a few minutes, and it automatically expires. It is a small but satisfying improvement.

## Day 7: VPN Deception and the Research Spiral {#day-7-vpn-deception-and-the-research-spiral}

The plan was simple: create a few social media accounts for Warm Signull. That plan lasted about fifteen minutes before I fell into the VPN rabbit hole.

I learned that some VPN providers use what they call virtual servers. In theory, you connect to a location like “Germany”, but your connection actually exits through a data center somewhere completely different, often for cost or routing reasons. Some companies admit this quietly in a blog post. Others hide it behind vague marketing language about “optimized routing”. It is frustrating how much effort goes into sounding honest without actually being honest. Some people call it lack of transparency, I call it a scam.

After that detour, I explored free hosting providers and fell straight into the idea of running my own email server. It sounds like a fun challenge: DNS configuration, spam filters, DKIM, SPF, TLS certificates, and a dozen moving parts that all have to align perfectly. It is one of those projects where you end up learning a lot, even if it never works on the first try.

From there, I wandered into domain registrars, decentralized alternatives, and new web protocols. That alone could fill several articles. I had one of those days where curiosity keeps branching into more curiosity.

To stay productive, I added a new Emacs function that inserts backlinks automatically in Org-roam and updates them whenever I save a file. It is a small automation, but it makes the writing flow smoother.

I ended the evening with some gaming tests. Anno 1800 runs well. Ghost Recon Breakpoint was trickier. It needed to point it to the Uplay launcher from Wildlands to work because apparently only Wildlands ships with it. Once running, it stuttered slightly, probably because Arch decided to use swap memory even though plenty of RAM was free. I installed Lutris, which seems like the proper way to manage everything from one place.

## Day 8: Privacy Is a Puzzle {#day-8-privacy-is-a-puzzle}

The internet today feels like a maze designed to filter out anyone who values privacy. Most websites either block VPN connections outright or refuse to let you sign up without a phone number. Trying to maintain a clear boundary between personal and project accounts feels almost impossible without owning two phones.

I briefly considered paying for a VOIP number just to continue setting things up. It feels ridiculous that using privacy tools automatically labels you as suspicious. There are legitimate reasons for wanting separation and anonymity that have nothing to do with bad intentions.

Instead of treating all VPN traffic as dangerous, platforms could monitor new accounts for patterns of abuse. But that would require nuance, which seems to be in short supply.

Still, I managed to create a Tuta account after switching VPN regions and clearing my browser cache. Progress, even if small. Now I have to wait up to twenty-four hours for manual verification. The waiting game begins.

## Day 9: The Social Media Gauntlet {#day-9-the-social-media-gauntlet}

Tuta still had not approved my account, so I created a Gmail address instead. Today it worked instantly. I registered on GitHub and started a small Diceware generator project to keep my coding streak alive.

The process of creating social media accounts in 2025 feels like an endurance test. Captchas have become self-parodies. Each one feels like a psychological experiment designed to test patience rather than verify humanity. Facebook demanded that I record a short video of myself moving my head around in circles. I half-expected it to ask for interpretive dance next.

I created an account on X and asked Grok a few questions just to test it. Moments later, my account was automatically blocked before I could even post or change any settings. I appealed and decided to wait.

At this point, frustration has turned into detached amusement. Watching the modern internet make everything harder feels almost educational.

## Day 10: The Workflow Finally Clicks {#day-10-the-workflow-finally-clicks}

A new day, a new attempt at progress. My goal today was to finish setting up the Warm Signull blog and publish the first post.

I built the site using GitHub Pages with automated deployment through GitHub Actions. Once that pipeline was working, I customized my Emacs environment to make the process seamless. I added keybindings for every step of the Org-to-Hugo workflow: creating new posts, starting the local Hugo server, exporting Org files to Markdown, and opening either the preview or the published version in the browser.

It felt incredible to see the first article live. The entire process now feels like a system that understands me instead of fighting against me.

I am finally getting comfortable in Doom Emacs using Evil mode. The keybindings make sense, the muscle memory is forming, and combined with my Sway desktop everything feels fast, clean, and intentional. Writing no longer feels like a chore. It feels like an integrated creative process.

This is the first time in a while that I looked around my setup and thought, yes, this is mine.
