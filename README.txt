=== Apps' Functionality

- As a user, I want to see an option to draw a card and an option to keep my current cards
- As a user, I want to see a reset button to start a new game
- As a user, after every card draw, I want to know wether I won or lost, or can keep drawing
- As a user, I want a play button to start a game
- As a user, I want an indicator that shows me if I won or lost the game

=== Icebox features

- As a user, I want to see animations when drawing cards or when a deck is shuffling
- As a user, I want some basic sound feedback when drawing a card or a state is changed

=== Pseudocode

-- When we start a game of Blackjack:

- initialize the board state to be empty or the dealer has dealt the beginning cards [init()]
- render the board with buttons and starting cards [render()]
- randomize the first draw to be either player's or the dealer's [playerChoice(), dealerChoice()]
- on player decision, either draw or hold, render the board, then check state of the game

-- When it's a player's turn:

- when a player clicks a button, we need to draw a card from the deck and update the board so it corresponds to the player's choice [handleClicK()]
- if the player didn't lose or win, the dealer makes his choice automatically [dealerChoice()]