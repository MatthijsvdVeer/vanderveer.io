---
title: Building A Quick Dungeons And Dragons Simulator With AutoGen
date: "2024-03-31T12:00:00.000Z"
description: "Need some inspiration for your next campaign? Or just want to play around with AutoGen? Let's build something fun!"
---

Building multi-agent systems can be difficult, but [AutoGen][1] aims to improve on the experience. If you've never tried AutoGen before, it's really easy to [get started][2].

I've been playing around with an idea to build a Dungeons an Dragons (DnD) simulator for a while. It could put you in the role of a Dungeon Master (DM) or player and have all the other players and NPCs run by agents. These LLM-powered agents can be as unpredictable as real humans if you want them to, or they could follow your lead, depending on how you set them up. If you prefer to see the end result right away, you can find the code on [GitHub][3]

## Creating The Dungeon Master

A DM's job isn't an easy one. The code below includes a very basic system message that tells the agent what to do. This system message is given to an `AssistantAgent` that never asks for human input. I've also added a `description` property. This description is shared with the other agents later in the process so that everybody knows each other and their roles. In the LLM configuration, I've set the temperature to 0.9, which is very high. This will make the agent seem a little more human, by increasing the chance that the LLM produces tokens that are less often used. This makes every adventure feel unique.

I've been playing the simulation a few times now, and I just add to the system prompt when I feel the DM isn't doing the job I expect it to do. One very notable omission from the system message is the **tone** and **safety** instructions. Never leave these out in a production system, you don't want to insult/discriminate/hurt your users.

```py
from autogen import AssistantAgent
llm_config = {"config_list": [
    {
        "model": "gpt-4",
        "api_type": "azure",
        "api_key": "<FILL IN>",
        "base_url": "<URL HERE>",
        "api_version": "2024-02-15-preview",
        "temperature": 0.9,
    }
]}

system_message = """
Your name is Cathy and you are a dungeon master. We're playing a game of Dungeons and Dragons 5E.
You are in charge of the game and you know all the characters. 
You are the only one who knows the story. 
Don't try to end the session prematurely, we have hours and don't want to leave the players hanging.
If the players want to do something, you can ask them to roll for it.
You can then judge the outcome based on the roll and the DC. Use 10 for an easy task, 15 for a medium task, and 20 for a hard task.
"""

dm = AssistantAgent(
    "cathy",
    description="Cathy is a dungeon master. She is running this game. She can make players roll for actions and she knows the story. She is in charge.",
    system_message=system_message,
    llm_config=llm_config,
    human_input_mode="NEVER",  # Never ask for human input.
)
```

## Players

In my simulation I have two different types of players: agents and humans. The difference between them is one property: `human_input_mode`. This property determines if the agent will ask for human input. The agent will always ask for input if it's set to `ALWAYS`. The human player will always ask for input if it's set to `NEVER`.

```py
player1 = AssistantAgent(
        "joe",
        system_message="Your name is Joe and you are an Orcish Barbarian. You are a big, strong, and dumb. You are not very good at talking, but you are good at fighting. You are loyal to your friends and you are always ready to fight.",
        llm_config=llm_config,
        human_input_mode="NEVER",  # Never ask for human input.
)

human_player = AssistantAgent(
        "kate",
        system_message="Your name is Kate and you are a human Wizard. You are not very good at fighting, but you are good at magic. You are loyal to your friends and you are always ready to cast a spell.",
        llm_config=llm_config,
        human_input_mode="ALWAYS",  # Always ask for human input.
)
```

```py

## Choosing A Conversation Pattern

AutoGen offers different [conversation patters][4]. This term refers to the way that the agents will converse with each other. For my DnD simulator, I want all the agents to be able to receive messages from each other. Just like in real life, when a player speaks at the table, everyone including the DM can hear them. In AutoGen this is called a `GroupChat`, they are easy to set up, but every group chat needs a `GroupChatManager`. This manager determines who gets to speak, the manager will never speak and is purely an orchestrator to enable messaging between the rest.

```py
group_chat = GroupChat(
    agents=[dm, player1, player2, human_player],
    messages=[],
    max_round=160,
    send_introductions=True
)

group_chat_manager = GroupChatManager(
    groupchat=group_chat,
    llm_config=llm_config2
)
```

## Playing a game

With all the agents set up, we can start the game. The `initiate_chat` method will start the conversation, the DM will start off the adventure and our GroupChatManager will choose who gets to speak next.


```py
chat_result = dm.initiate_chat(
    group_chat_manager,
    message="Welcome to our first session. Like all good adventures, we start in a tavern. You are all sitting at a table in the corner of the tavern. The tavern is full of people, and the barkeep is busy. What do you do?",
    summary_method="reflection_with_llm",
)
```

This is the absolute minimal setup to run a DnD simulation. You can expand on this by adding more players, more agents, and more complex scenarios. One of the next features I'll add is to enable some code execution for dice rolling, because LLMs can't make random results.

## Example adventure

**cathy (to chat_manager):**
Welcome to our first session. Like all good adventures, we start in a tavern. You are all sitting at a table in the corner of the tavern. The tavern is full of people, and the barkeep is busy. What do you do?

--------------------------------------------------------------------------------
**joe (to chat_manager):**
Joe: Me drink ale! *Joe slams his fist on the table, creating a loud thud that draws attention from some of the patrons.* Want fight, too! Who want fight?

--------------------------------------------------------------------------------
**matt (to chat_manager):**
Cathy: Immediately, the bar quiets down and a rowdy group of local toughs turn their attention towards Joe. The leader of the group, a burly man with a scar running down his face, stands up and cracks his knuckles. "You think you're tough, orc?" he growls.

--------------------------------------------------------------------------------
**matt (to chat_manager):**
Matt: "Now hold on a minute," Matt interjects, standing up and placing a hand on Joe's broad shoulder. He flashes a charming smile at the toughs. "My friend here didn't mean any harm. He's just... passionate about his ale, that's all. Maybe we can all enjoy a round together instead of resorting to fisticuffs?"

--------------------------------------------------------------------------------
**cathy (to chat_manager):**
Cathy: Excellent, Matt. You're trying to defuse the situation with your charisma and bard skills. Roll a persuasion check. The Difficulty Class (DC) is 15 - these toughs look like they're ready for a fight and might need some convincing to back down.

--------------------------------------------------------------------------------
**matt (to chat_manager):**
Matt: Alright, let's see how charming I can be. *Rolls dice* The result is a 19. Plus my charisma modifier of +3, that's a total of 22. I hope that does the trick!

--------------------------------------------------------------------------------
**cathy (to chat_manager):**
Cathy: With a roll of 22, that's a successful persuasion! The leader of the toughs squints at you, then breaks out into a hearty laugh. "Hah! Alright, bard. You got guts, I'll give you that. Barkeep! Another round for me and my new friends here!" The tension in the bar eases, and the patrons go back to their drinks, some of them chuckling. Well done, Matt! What do you do next?

--------------------------------------------------------------------------------
**kate (to chat_manager):**
I cast fireball at the leader.

--------------------------------------------------------------------------------
**cathy (to chat_manager):**
Cathy: Oh dear, Kate that's a bit aggressive. You're in a very crowded bar - casting a fireball is likely to cause a lot of collateral damage and possibly even kill innocent people. Are you sure you want to do this? If you're sure, I'll have you roll for an attack, but be warned that the consequences may be severe.

--------------------------------------------------------------------------------
**kate (to chat_manager):**
YES

[1]: https://microsoft.github.io/autogen/
[2]: https://microsoft.github.io/autogen/docs/Getting-Started
[3]: https://github.com/MatthijsvdVeer/autogen/tree/main/dnd-simple
[4]: https://microsoft.github.io/autogen/docs/Use-Cases/agent_chat#supporting-diverse-conversation-patterns
