# Tic Tac Toe

A classic Tic Tac Toe game built with vanilla JavaScript, HTML, and CSS. Play against a friend on the same device.

## 🎮 How to Play

- Two players take turns placing **X** and **O** on a 3×3 grid.
- The first player to get three in a row (horizontal, vertical, or diagonal) wins.
- If all 9 squares are filled without a winner, the game ends in a draw.

## Features

- **Interactive board** – click any cell to make a move.
- **Player names** – edit player names directly from the interface.
- **Active player highlight** – see whose turn it is.
- **Game status** – displays running, win, or draw states.
- **Reset button** – restart the game at any time.

## Technologies

- HTML5
- CSS3 (custom dark theme)
- Vanilla JavaScript (ES6+)

## 🚀 How to Run

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/tic-tac-toe.git
2. Open index.html in your browser.

Or check live demo at :
https://chamseddine-svg.github.io/tic-tac-toe/

## QA Test Report & Bug Fixes
While testing the game, I noticed a couple of issues with the blue highlight that shows whose turn it is:

**#1 - Wrong player highlighted after a win**
- When a player won, the blue border would move to the other player instead of staying on the winner.
- **Fix:** Changed the logic to highlight the actual winner (the player who just moved), not the next player in line.

**#2 - Highlight stayed active on a draw**
- If the game ended in a tie, one player would still have the blue border even though nobody won.
- **Fix:** Added a check so the highlight is removed from both players when the game is a draw.

**#3 - Status text didn't update after reset**
- After clicking Reset, the board would clear but the text would still say "Player X is Winner" or "It's a Draw."
- **Fix:** Added `renderGameState()` to the reset function so the status text correctly changes back to "Game Running"

**#4 - Implicit global variables**
- The `nameFields` and `players` variables were declared without `const` or `let`, causing them to leak into the global scope.
- **Fix:** Added `const` to both variables to keep them safely scoped inside the UI controller.