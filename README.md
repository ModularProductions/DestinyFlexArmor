# DestinyFlexArmor

## Purpose
As an avid player of Bungie's game "Destiny", I had a nagging curiosity about one aspect of the RPG system. To put it in game terms, I wanted to find the equipment stat combinations that would produce the most flexibility in granting Tier-12 status in a single build.

## How the game works
In Destiny, the player's equipment system contains seven different slots for items, excluding weapons:
- Head
- Arms
- Chest
- Legs
- Class Item
- Artifact
- Ghost

The player's character also holds three Stats:
- Intellect (charges your Super ability)
- Discipline (charges your Grenade)
- Strength (charges your special Melee ability)

Points for these Stats are built up by the equipment you use. More points in a Stat gives a faster recharge rate to the associated ability. To be more precise, these in-game bonuses are granted when a Stat achieves a Tier of point quantity. Each Tier is 60 points, and points above this level are worthless until you hit the next Tier. (e.g. 120 points in Intellect will give a slight recharge boost, but further points in Intellect have no effect until 180 have been accumulated.) The maximum Tier any Stat can achieve is 5 (or 300 points), with furthur allocated points wasted.

Overall, the maximum number of Tiers a character can achieve across all three Stats is 12, limited by the raw number of points the game makes available. This means the player can enjoy maximum benefits in two Stats (at Tier 5 each) plus having the remaining Stat at Tier 2, or they may spread them evenly at 4/4/4, or perhaps some other combination, like 3/5/4. Having a "Tier 12" build means you have maximized your Stat bonus potential, although it does require having very strong equipment.

When the player discovers a new piece of equipment, it will generally have points split between two of the three Stats. One Stat will be higher than the other Stat, and the player may flip the points between them at will, offering further customization of the build's Stat total.

## What I was interested in
I was curious if there were any combination of Stat splits that would provide the ability to allocate points in such a manner that -any- Tier-12 combination could be achieved with a single set of equipment. I had a feeling that this was unlikely, but was still interested in finding what loadouts would offer the most flexibility through point allocation. (Surprisingly, there seemed to be no attempts at answering this question already extant on the internet.) In any case, my equipment Vault is quite full, and I thought it might prove a golden key to eliminating stuff that I didn't realize was inefficient.

## Get to the damn program, already
To get the results I wanted, I had to figure out how to set up a method for proper iteration through a LOT of combinations, and check to see if each one was qualified for a given Tier set. (Since I'm not a god of programming and recursion, there's probably a cleaner way than mine out there.) A few limitations were established to make the generated results practical. (By this point, if you don't know the game, don't worry about understanding some of the upcoming references.)

### Limitations
- assumes each piece of equipment is at the maximum Light level of 400
- assumes perfect rolls (100% for most items, higher for I/D artifacts)
- only interested in Tier 12
- single-stat pieces excluded
- "Memory of Felwinter" artifact excluded

### Operation
Running the program (via Node) will iterate through each Tier combination (hard-coded to only search Tier-12 combinations), and then iterate through each equipment stat split combination to see if that build qualifies for that Tier combination. If a loadout qualifies, its stat splits are checked against the "collection" array, where previously qualified loadouts are stored. If that split combination is not already present in the array, it will be pushed into the collection along with its Tiers. If that split combination -is- already present, then the Tier set of the older build is appended with the new build's Tier set (also screening for duplicates). After all combinations are checked, the collection of qualified builds are sorted to front-load the builds with the most Tier sets allowed by point allocation.

Once all that is done, the results are logged to console (likely exceeding the screen buffer), and logged to an external .txt file. This file, if already present, is deleted and refreshed with the new results.

### Results
Unsurprisingly, there are no equipment loadouts that will allow you the full range of Tier-12 builds. Eighteen different stat split combinations exist that have four different Tier-12 builds available to them through point allocation. Because it's such a short list, here they are:
```
Head/Arms/Chest/Legs/Class/Artifact/Ghost
D/S I/D D/S I/S I/S I/D I/S --- 3/4/5,3/5/4,4/3/5,4/4/4
I/S D/S I/S I/D D/S I/D I/D --- 4/4/4,4/5/3,5/3/4,5/4/3
I/S D/S I/S D/S D/S I/D I/D --- 3/4/5,3/5/4,4/3/5,4/4/4
I/S D/S D/S I/S I/D I/D D/S --- 3/4/5,3/5/4,4/3/5,4/4/4
I/S D/S D/S I/S D/S I/D I/D --- 3/4/5,3/5/4,4/3/5,4/4/4
I/S I/D I/S D/S D/S I/D D/S --- 3/4/5,3/5/4,4/3/5,4/4/4
I/S I/D D/S I/S D/S I/D D/S --- 3/4/5,3/5/4,4/3/5,4/4/4
I/S D/S I/S D/S I/D I/D I/S --- 3/4/5,4/3/5,4/4/4,5/3/4
I/S D/S I/S D/S I/S I/D I/D --- 3/4/5,4/3/5,4/4/4,5/3/4
I/S D/S I/S D/S I/D I/D D/S --- 3/4/5,3/5/4,4/3/5,4/4/4
D/S I/D I/S I/S D/S I/D D/S --- 3/4/5,4/3/5,4/4/4,5/3/4
I/D D/S I/S D/S I/D I/D I/S --- 3/5/4,4/4/4,4/5/3,5/4/3
I/D D/S I/S D/S I/S I/D I/D --- 3/5/4,4/4/4,4/5/3,5/4/3
I/D I/S I/S D/S I/D I/D D/S --- 4/4/4,4/5/3,5/3/4,5/4/3
I/D I/S I/S D/S D/S I/D I/D --- 4/4/4,4/5/3,5/3/4,5/4/3
I/S I/D I/S D/S I/D I/D D/S --- 4/4/4,4/5/3,5/3/4,5/4/3
I/S I/D I/S D/S D/S I/D I/D --- 4/4/4,4/5/3,5/3/4,5/4/3
I/S D/S I/S I/D I/D I/D D/S --- 4/4/4,4/5/3,5/3/4,5/4/3
```
Keen observers will notice that none of them provide the coveted "5/5/2" (or "2/5/5" if you're rolling Sunsinger) build.

(Two hundred and forty-eight combinations will allow for three different Tier-12 builds.)

Overall, I don't know that these results are terribly useful in any way, but they do provide a bit of insight into the game's meta, as well as providing a nice little exercise in recursion programming.

#### Result Confirmation
I have a fair bit of max-rolled equipment in my Vault, so some of my results were checked against the most useful app at www.destinyitemmanager.com. They appeared to be correct.

## Other applications and future development
Some of the main parameters may be changed to provide a greater number of results, like removing the Tier-12-only restriction to see -all- Tier sets a combination will provide, although this takes a bit more computation time. (Besides, who cares about being Tier 9, anyways?)

The core functionality could be adapted to a similarly working game, like Destiny 2. But I haven't played Destiny 2, so I don't know how that game is set up.

## Math is fun and mental
The number of potential combinations (within the above limitations) in equipment stat splits is 279,936. (6 split options, point allocation inclusive, on each of 7 equipment slots, so 6 to the 7th power.) This turns into 2,187 loadout combinations when discounting point allocation (3 to the 7th power), of which 1,665 loadouts qualify as Tier-12. There are 10 different combinations of Tier-12 stat builds.

## Contributors
Just me, because nobody else cares in the first place, especially since the game is pretty old by now.