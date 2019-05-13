# Udacity Project 2 - Memory Game

This project is a browser-based card matching memory game devloped with html, css, and javascript. It was a requirement for the 2019 Udacity Front-End Nanodegree program.

## Notable Features

* Responsive design
* Card flip, match, and mismatch animations
* Win condition modal popup with metrics (time, moves, star rating, etc.)
* Only 2 event listeners
    * One for the deck and one for the restart button for performance and cleanliness

## Game Mechanics

The objective of the game is to match all cards with their counterparts in as few moves as possible.

The game is initialized with 16 cards all face-down and distributed randomly on the game board. A card will flip over when the player clicks on it. When a second card is clicked the game will compare the two. If it is a matching pair then the two cards will be shown throughout the remainer of the game. If it is a mismatch, the cards will be hidden once again.

Game metrics are shown above the game board:
* Stars
    * The game begins with 3 stars. The number of stars awarded at the end of the game is determined by how many moves the player took to win.
    * Currently the ratings are as follows:
        * 3 stars - 13 or fewer moves
        * 2 stars - 14 to 18 moves
        * 1 star - 19 or more moves
* Moves
    * Total pairs of cards selected
* Time
    * Time taken since beginning the game (when the first card is opened)
* Restart
    * Reset the game

When all cards are matched, a congratulatory modal popup is shown displaying the aforementioned metrics in addition to a total card flip count. The player can then either close the modal to see the final game board and reset the game via the restart button icon at their leisure or click the Play Again button to close the modal and instantly reset the game board.

## Dependencies

* [Font Awesome](https://fontawesome.com)
* [Google Fonts](https://fonts.google.com)