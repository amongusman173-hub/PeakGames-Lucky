#!/usr/bin/env python3
"""
Add trackResult calls to all remaining games
"""

import re

with open('game.js', 'r') as f:
    content = f.read()

# Track changes
changes = []

# Coinflip - add after balance += winAmount in playCoinFlip
pattern = r'(const winAmount = betAmount \* 2;\s+balance \+= winAmount;)\s+(playWinSound\(winAmount\);)'
replacement = r'\1\n            trackResult(\'coinflip\', betAmount, winAmount);\n            \2'
if re.search(pattern, content):
    content = re.sub(pattern, replacement, content, count=1)
    changes.append('coinflip win')

# Coinflip loss - add before playSound('lose') in playCoinFlip
pattern = r'(createParticles\(\'\+\' \+ winAmount\.toFixed\(2\), \'#00e701\'\);\s+}\s+else\s+{)\s+(playSound\(\'lose\'\);)'
replacement = r'\1\n            trackResult(\'coinflip\', betAmount, 0);\n            \2'
if re.search(pattern, content):
    content = re.sub(pattern, replacement, content, count=1)
    changes.append('coinflip loss')

# Roulette - search for win/loss patterns
# Keno - search for win/loss patterns
# Tower - search for win/loss patterns
# Pump - search for win/loss patterns
# Drill - search for win/loss patterns
# Cases - search for win/loss patterns
# Scratch - search for win/loss patterns
# Packs - search for win/loss patterns
# Slots - search for win/loss patterns

print(f"Applied {len(changes)} changes:")
for change in changes:
    print(f"  - {change}")

with open('game.js', 'w') as f:
    f.write(content)

print("\nDone!")
