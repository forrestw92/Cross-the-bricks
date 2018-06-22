

# Cross the bricks
## Introduction
This game was completed for the Udacity Front End Nano-degree program. It is a frogger like game where you must cross the bricks to complete each level without dying.

## How to run
You can simply visit this link [Play me](https://forrestwalker.net/Udacity/Cross-the-bricks/) and play in your browser or you can download the source code and run

    npm install
    gulp serve:build

# Game Play
First start off by picking an avatar to play with.
## Scoring
To score in the game you collect pickups and proceed to the next level for points.
Every pickup is randomly generated based on probability most common being the Blue Gem![Blue Gem](https://forrestwalker.net/Udacity/Cross-the-bricks/images/gem-blue.png)
and least common is the star ![Gold star](https://forrestwalker.net/Udacity/Cross-the-bricks/images/star.png)
## Level Completion
You must make your way across the bricks to the randomly generated open spot to complete each level.
As you complete a level more enemy's(bugs) will be generated.
## Pickup's
Here is a list of all available pickups in the game and the points for each item.


| Name | Image | Points |  Extra Life |
| :---------: |:----------:| :----:| :---:|
| Blue Gem | ![Blue Gem](https://forrestwalker.net/Udacity/Cross-the-bricks/images/gem-blue.png) | 100 | No |
| Green Gem | ![Green Gem](https://forrestwalker.net/Udacity/Cross-the-bricks/images/gem-green.png) | 200 | No |
| Gold Gem | ![Gold Gem](https://forrestwalker.net/Udacity/Cross-the-bricks/images/gem-gold.png) | 300 | No |
| Heart| ![Heart](https://forrestwalker.net/Udacity/Cross-the-bricks/images/heart.png) | 500| Yes |
| Star | ![Star](https://forrestwalker.net/Udacity/Cross-the-bricks/images/star.png) | 1000 | No |

## Win
Play till you die is how you win. Try to beat your last high-score

## References
Collision detection help from [2D collision detection](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)

Based my 'container' idea from [HTML5-Games Novice to Ninja](https://www.sitepoint.com/premium/books/html5-games-novice-to-ninja)
