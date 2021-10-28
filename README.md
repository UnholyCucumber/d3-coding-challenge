# D3 Coding Challenge :sunglasses:

### About

Interactive ball which can jump on a platform; use left and right keys to control horizontal movement and spacebar to jump.

Hint: the central small platform is designed to only be accessible if you take advantage of the ball's jump mechanics. 

### Main Concepts/Features

Use jQuery to continuously check for key presses then perform logic corresponding to key being pressed/held using D3/jQuery.

The ball's position is modeled on two axes (horizontal and vertical) and there is also a basic physics engine.

Features for horizontal axes include:

* Allowing for continuously holding down key to go left/right by adding/subtracting velocity
* The longer the keys are held, the more velocity that gets added each time interval (adjust *horizontal_acceleration* variable to see more visible effect); this feature only applies when the ball is on a platform and not when the ball is moving in air
* When the ball hits an object horizontally, Newton's Laws are observed and the ball bounces in the opposite direction (adjust *velocity_loss* variable to see more visible effect)
* Momentum is modeled and the ball will continue moving for a bit even when the key is let go (adjust *friction* variable to see more visible effect)

Features of vertical axes include:

* Tap spacebar for small jump or hold spacebar for high jump
* Can jump multiple times while in air (if you still haven't managed to get the ball onto the platform, do a high jump and a small jump or three small jumps)
* Basic modeling of gravity (what goes up must come down); objects falling will accelerate and objects going up will deaccelerate (adjust *gravity* variable to see more visible effect)
* When ball hits an object vertically, Newton's Laws are observed and the ball bounces in the opposite direction (adjust *velocity_loss* variable to see more visible effect)
* Bounces are implemented when ball falls onto a platform