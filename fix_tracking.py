#!/usr/bin/env python3
import re

with open('game.js', 'r') as f:
    content = f.read()

# Coinflip loss - find the playCoinFlip function loss section
content = re.sub(
    r"(createParticles\('\+' \+ winAmount\.toFixed\(2\), '#00e701'\);\s+}\s+else\s+{\s+)(playSound\('lose'\);)",
    r"\1trackResult('coinflip', betAmount, 0);\n            \2",
    content,
    count=1
)

# Pump loss
content = re.sub(
    r"(pumpActive = false;\s+)(playSound\('lose'\);)",
    r"\1trackResult('pump', pumpBetAmount, 0);\n    \2",
    content,
    count=1
)

# Drill loss
content = re.sub(
    r"(drillActive = false;\s+)(playSound\('lose'\);.*?showToast\(`Drill missed target)",
    r"\1trackResult('drill', drillBetAmount, 0);\n    \2",
    content,
    count=1,
    flags=re.DOTALL
)

# Scratch loss
content = re.sub(
    r"(} else {\s+)(playSound\('lose'\);.*?resultDiv\.textContent = `Lost)",
    r"\1trackResult('scratch', scratchPrice, 0);\n            \2",
    content,
    count=1,
    flags=re.DOTALL
)

# Cases - track results after opening
content = re.sub(
    r"(totalProfit \+= profit;\s+}\s+)(balance \+= totalProfit;)",
    r"\1trackResult('cases', totalCost, totalCost + totalProfit);\n    \2",
    content,
    count=1
)

# Packs - track results after opening
content = re.sub(
    r"(totalValue \+= value;\s+}\s+)(balance \+= totalValue;)",
    r"\1trackResult('packs', totalCost, totalValue);\n    \2",
    content,
    count=1
)

# Stocks - track on sell
content = re.sub(
    r"(const profit = sellValue - stockBuyPrice;\s+)(balance \+= sellValue;)",
    r"\1trackResult('stocks', stockBuyPrice, sellValue);\n    \2",
    content,
    count=1
)

with open('game.js', 'w') as f:
    f.write(content)

print("Tracking fixed!")
