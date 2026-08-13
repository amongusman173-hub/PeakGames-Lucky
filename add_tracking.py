#!/usr/bin/env python3
"""
Script to add stats tracking to all game functions in game.js
"""

# Read the file
with open('game.js', 'r') as f:
    content = f.read()

# Define tracking insertions for each game
# Format: (game_name, search_pattern_for_bet, search_pattern_for_result)

tracking_additions = [
    # Dice game
    ('dice', 
     'diceRolling = true;\n    balance -= betAmount;\n    updateBalance();',
     'diceRolling = true;\n    balance -= betAmount;\n    trackBet(\'dice\', betAmount);\n    updateBalance();'),
    
    ('dice_win',
     'const winAmount = betAmount * multiplier;\n                balance += winAmount;',
     'const winAmount = betAmount * multiplier;\n                balance += winAmount;\n                trackResult(\'dice\', betAmount, winAmount);'),
    
    ('dice_loss',
     'playSound(\'lose\');\n                addLoseEffect(diceDisplay);',
     'playSound(\'lose\');\n                trackResult(\'dice\', betAmount, 0);\n                addLoseEffect(diceDisplay);'),
]

# Apply replacements
for name, old, new in tracking_additions:
    if old in content:
        content = content.replace(old, new, 1)
        print(f"✓ Added tracking for {name}")
    else:
        print(f"✗ Could not find pattern for {name}")

# Write back
with open('game.js', 'w') as f:
    f.write(content)

print("\nDone!")
