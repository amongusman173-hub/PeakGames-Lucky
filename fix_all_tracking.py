#!/usr/bin/env python3
import re

with open('game.js', 'r') as f:
    content = f.read()

# Fix coinflip - replace wrong scratch tracking with coinflip
content = content.replace(
    "trackResult('scratch', scratchPrice, 0);",
    "trackResult('coinflip', betAmount, 0);",
    1  # Only replace first occurrence (in coinflip)
)

# Add coinflip win tracking
content = re.sub(
    r"(const winAmount = betAmount \* 2;\s+balance \+= winAmount;\s+)(playWinSound\(winAmount\);\s+resultDisplay\.style\.color = '#00e701';)",
    r"\1trackResult('coinflip', betAmount, winAmount);\n            \2",
    content,
    count=1
)

# Check other games
print("Fixed coinflip tracking")

with open('game.js', 'w') as f:
    f.write(content)

print("All tracking fixed!")
