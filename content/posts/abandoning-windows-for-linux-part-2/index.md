+++
title = "Abandoning Windows for Linux - Part 2"
date = 2025-11-04
lastmod = 2025-11-04T10:44:17-07:00
slug = "abandoning-windows-for-linux-part-2"
tags = ["windows", "linux", "os", "arch"]
draft = false
[cover]
  hidden = true
  hiddenInSingle = true
  hiddenInList = true
+++

## The Process of Discovery {#the-process-of-discovery}

While I am still working on my method of delivery, what I hope those articles will give the readers, is to show all the benefits of alternative working environments that they might not be aware of and the process of learning all of it.
Instead of making me look like an expert who makes no mistakes, I want to show how a true process of learning looks like, even for someone who is already experienced with technology.

Show all the struggles, and how by not giving up we can turn those struggles into self-improvement.
Show how by doing the uncomfortable we can both improve ourselves and discover things that always were there, but by never venturing into the unknown we were not able to see their benefits.

This is a highly technical and niche topic, yet those lessons are applicable to everyone in all aspects of life.
Growth is rarely about mastering a specific system, it’s about mastering yourself while learning it.


## Day 2 – Playing with Sway {#day-2-playing-with-sway}

I have started researching about things that I want to do with my newly installed system, but shortly after I have ended up playing with Sway desktop config and themes, and did that for most of the day.

It might seem like wasted time, but it is both a discovery process and a way to start getting used to the new environment.

I have also started investigating different browsers, desktop environments, file managers, terminals, firewalls, system logging, and auditing.

There is definitely a huge benefit to the minimal desktop environment.
While there is a lot of friction in getting used to a tiling window manager and both learning and setting up the hotkeys at the same time, I can definitely see the future productivity benefits.
Not having to reach for my mouse also lets me stay uninterrupted in the flow.

What I have also noticed is that by not having all the clutter, no notifications, no pop-ups, no social media tabs lurking behind, my focus dramatically increased.
I even disabled the clock. What happened next was strange: I got lost in work again.
Something that used to happen to me long ago and I honestly stopped believing was still possible.
Before I knew it, many hours had passed and I had done a lot of work. The kind of work where time dissolves, the flow state everyone keeps talking about but rarely finds.

> "The best moments in our lives are not the passive, receptive, relaxing times... but the moments when we are fully engaged."
> — Mihaly Csikszentmihalyi


## Day 3 – The VPN, The Firewall, and The Existential Crisis {#day-3-the-vpn-the-firewall-and-the-existential-crisis}

Third day of my adventure exploring the unknown, searching for productivity, and breaking old habits to make space for better ones.

The initial excitement has worn off a little and my morale is low.

I eagerly powered on my laptop today and got struck by new issues. VPN is not connecting, and I have a kill switch active, which effectively means no internet connection.
So here I am, troubleshooting through my phone again. The issue? Misconfigured nftables.

Turns out that after the reboot, some settings had been applied that I thought were already applied and working previously.
Did some investigating and gave up on nftables for today, flushed to default settings. Sometimes the smartest move is to not fight the system. Literally.

There are so many things I want to do to bring this system to higher standards that I’m getting lost easily, unable to decide on which part to pursue.
This has been an issue most of my life: too many interests, too many things I want to do, and not being able to finish them, or jumping between them and losing focus.

The best way to make progress is to align your focus with your current mental state.
This is why I decided to prioritize organizing my knowledge right now and leave the OS details for later.
I’ve got it working to the point where it’s usable and lets me build structure, and that’s what matters.

> “It is not the daily increase but daily decrease. Hack away at the unessential.”
> — Bruce Lee


## Emacs – The Ancient Weapon of Knowledge {#emacs-the-ancient-weapon-of-knowledge}

So I stumbled upon this a while ago and didn’t really see the benefits.

Emacs was released in 1976, an ancient and niche piece of technology, yet it does something incredible.

The problem with Emacs is that it’s extremely hard to explain and make someone see the benefits. It’s very unintuitive at first. “Why would I need another text editor? There are plenty already.” So what if it can be customized? Others can too.

And I felt the same way, until one day, something aligned in my brain and gave me that AHA! moment.

Think of Emacs as a super-customizable digital workshop:
you can write, plan, code, organize, and even browse the web, all in one place.
It looks old-school, but that’s just the skin of a beast. Underneath, it’s limitless.


## Org Mode – The Heart of It All {#org-mode-the-heart-of-it-all}

Org Mode turns Emacs into a smart planner + notebook.

You can:

-   Write notes
-   Make to-do lists
-   Schedule tasks
-   Export to HTML, PDF, Markdown, and more

You keep ideas organized using simple outlines (-, \*, and headings).
It’s all plain text, but Emacs makes it feel alive, interactive, structured, and surprisingly beautiful in its simplicity.

> “Simplicity is the ultimate sophistication.”
> — Leonardo da Vinci


## Org-roam – Building a Second Brain {#org-roam-building-a-second-brain}

Org-roam is like having a brain that connects your notes automatically.
When you write a note, you can link it to others (like Wikipedia links).
Over time, it builds a web of thoughts, a map of your mind.

Writers, researchers, and thinkers love this because it turns random notes into a connected knowledge system. It’s your personal Wikipedia, written by you, for you.


## Org-journal – The Quiet Discipline {#org-journal-the-quiet-discipline}

Org-journal is exactly what it sounds like: a digital diary inside Emacs.
You open today’s page, write your thoughts, and it automatically organizes everything by date.
You can search past entries instantly, which is far more satisfying than flipping through forgotten notebooks.

It’s not just journaling, it’s pattern recognition.
You start seeing how your thoughts evolve, what cycles repeat, and how far you’ve come.


## How It All Fits Together {#how-it-all-fits-together}

Emacs is the tool that runs everything.

Org Mode gives you structure (tasks, notes, outlines).

Org-roam connects your ideas into a network.

Org-journal provides the daily habit that feeds it all.

Together, they form a personal knowledge system, a mix of diary, planner, and wiki, fully under your control. It’s a system you own, offline, and free from the chaos of cloud platforms that forget you exist when the Wi-Fi drops.


## Benefits – Why It’s Worth the Climb {#benefits-why-it-s-worth-the-climb}

Everything is yours (no cloud lock-in or ads).
Notes are plain text (readable forever).
You can link ideas like your brain does.
Works offline, fast, and private.

Scales with your ambition: simple or infinitely complex.

It gives you a unified environment for managing and organizing your life and knowledge.

The drawback? The learning curve is steep. Most people drop out before they “get it.”
Even reading about it won’t help, you need that hands-on “click” moment.

It’s a matter of deciding whether spending time learning something now is worth the lifelong payoff later. For me, it definitely is.


## The Zettelkasten Connection {#the-zettelkasten-connection}

Org-roam builds on the Zettelkasten method, created by German sociologist Niklas Luhmann, who wrote over 70 books and 400 scholarly articles in his lifetime.
He managed this productivity through his elaborate paper-based note system, the original hyperlinked brain.

> “One cannot think without writing.”
> — Niklas Luhmann

This is how it looked for him:
![](/zettel.jpg)

Needless to say, it’s much easier and more powerful when combined with technology.
If this method let Luhmann produce that much by hand, imagine what happens when you pair it with Emacs, Org-roam, and automation.

In my opinion, the potential scales by magnitudes.
