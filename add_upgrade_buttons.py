#!/usr/bin/env python3
import re

# Read the HTML file
with open('index.html', 'r') as f:
    html = f.read()

# Define the upgrade buttons to add after specific elements
upgrades = [
    ('pump-cashout-btn', '''
<button class="bet-button" id="pump-safety-btn" onclick="usePumpSafety()" style="background: #ffc800; display: none;">🛡️ Use Pump Safety</button>
<button class="bet-button" id="pump-greed-btn" onclick="usePumpGreed()" style="background: #00e701; display: none;">💰 Use Greedy Pump</button>'''),
    
    ('drill-start-btn', '''
<button class="bet-button" id="drill-luck-btn" onclick="useDrillLuck()" style="background: #ffc800; display: none;">🍀 Use Lucky Drill</button>
<button class="bet-button" id="drill-vision-btn" onclick="useDrillVision()" style="background: #00e701; display: none;">👁️ Use Drill Vision</button>'''),
    
    ('onclick="playDiamonds()"', '''
<button class="bet-button" id="diamonds-match-btn" onclick="useDiamondsMatch()" style="background: #ffc800; display: none;">🎯 Use Match Master</button>
<button class="bet-button" id="diamonds-rare-btn" onclick="useDiamondsRare()" style="background: #00e701; display: none;">💎 Use Rare Gems</button>'''),
    
    ('onclick="throwDart()"', '''
<button class="bet-button" id="darts-aim-btn" onclick="useDartsAim()" style="background: #ffc800; display: none;">🎯 Use Perfect Aim</button>
<button class="bet-button" id="darts-bullseye-btn" onclick="useDartsBullseye()" style="background: #00e701; display: none;">🎪 Use Bullseye Master</button>'''),
    
    ('chicken-cashout-btn', '''
<button class="bet-button" id="chicken-safety-btn" onclick="useChickenSafety()" style="background: #ffc800; display: none;">🛡️ Use Chicken Shield</button>
<button class="bet-button" id="chicken-greed-btn" onclick="useChickenGreed()" style="background: #00e701; display: none;">💰 Use Greedy Chicken</button>'''),
    
    ('hilo-cashout-btn', '''
<button class="bet-button" id="hilo-oracle-btn" onclick="useHiloOracle()" style="background: #ffc800; display: none;">🔮 Use Card Oracle</button>
<button class="bet-button" id="hilo-streak-btn" onclick="useHiloStreak()" style="background: #00e701; display: none;">⚡ Use Streak Master</button>'''),
    
    ('tarot-play-btn', '''
<button class="bet-button" id="tarot-fortune-btn" onclick="useTarotFortune()" style="background: #ffc800; display: none;">🔮 Use Fortune Teller</button>
<button class="bet-button" id="tarot-vision-btn" onclick="useTarotVision()" style="background: #00e701; display: none;">✨ Use Mystic Vision</button>'''),
    
    ('snakes-play-btn', '''
<button class="bet-button" id="snakes-ladder-btn" onclick="useSnakesLadder()" style="background: #ffc800; display: none;">🪜 Use Ladder Boost</button>
<button class="bet-button" id="snakes-luck-btn" onclick="useSnakesLuck()" style="background: #00e701; display: none;">🍀 Use Lucky Roll</button>'''),
    
    ('onclick="openCase()"', '''
<button class="bet-button" id="cases-luck-btn" onclick="useCasesLuck()" style="background: #ffc800; display: none;">🍀 Use Lucky Case</button>
<button class="bet-button" id="cases-rare-btn" onclick="useCasesRare()" style="background: #00e701; display: none;">💎 Use Rare Finder</button>'''),
    
    ('onclick="buyScratchCard()"', '''
<button class="bet-button" id="scratch-golden-btn" onclick="useScratchGolden()" style="background: #ffc800; display: none;">🎫 Use Golden Ticket</button>
<button class="bet-button" id="scratch-reveal-btn" onclick="useScratchReveal()" style="background: #00e701; display: none;">👁️ Use X-Ray Vision</button>'''),
    
    ('onclick="openPack()"', '''
<button class="bet-button" id="packs-boost-btn" onclick="usePacksBoost()" style="background: #ffc800; display: none;">⚡ Use Pack Boost</button>
<button class="bet-button" id="packs-legendary-btn" onclick="usePacksLegendary()" style="background: #00e701; display: none;">👑 Use Legendary Hunter</button>'''),
]

# Add buttons after each target
for target, buttons in upgrades:
    # Find the target and add buttons after the closing tag
    pattern = f'({target}[^>]*>(?:[^<]|<(?!/button))*</button>)'
    replacement = r'\1' + buttons
    html = re.sub(pattern, replacement, html, count=1)

# Write back
with open('index.html', 'w') as f:
    f.write(html)

print("Upgrade buttons added successfully!")
