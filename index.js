//TO-DO:
// restrict horizontal acceleration to only when on platform (don't apply when in air and only count when it's on platform)
// higher jump if space is held
// fall down
// horizontal velocity to persist even after letting go
// velocity bounceback from hitting things

    // actual screen size
var available_width = window.innerWidth,
    available_height = window.innerHeight,

    // calculating params for base platform
    base_platform_width = available_width * 1.00,
    base_platform_height = available_height * 0.10,
    base_platform_x = 0,
    base_platform_y = available_height - base_platform_height, // top of base platform

    // calculating params for small platform
    small_platform_width = available_width * 0.30,
    small_platform_height = available_height * 0.10,
    small_platform_x = available_width * 0.50 - small_platform_width/2, // left of small platform
    small_platform_right_x = small_platform_x + small_platform_width,
    small_platform_y = available_height * 0.50, // top of small platform
    bottom_of_small_platform_y = small_platform_y + small_platform_height,

    // calculating params for circle
    circle_radius = available_height * 0.05,
    circle_starting_x = available_width/2,
    circle_starting_y = base_platform_y - circle_radius,
    right_x_barrier = available_width - circle_radius,
    left_x_barrier = circle_radius,
    top_y_barrier = circle_radius,
    bottom_y_barrier = base_platform_y - circle_radius;

    testing = false;

var background_svg = d3.select(".background")
    .append("svg")
    .attrs({
        width: "100%",
        height: "100%",
    });


var base_platform = background_svg.append("rect")
    .attrs({
        height: base_platform_height,
        width: base_platform_width,
        fill: "orangered",
        y: base_platform_y,
        x: base_platform_x
    })

if (testing){
    var dot = background_svg.append("circle")
        .attrs({
            r: "5px",
            fill: "red",
            cy: bottom_of_small_platform_y + circle_radius,
            cx: small_platform_right_x
        })
}



var small_platform = background_svg.append("rect")
    .attrs({
        height: small_platform_height,
        width: small_platform_width,
        fill: "chartreuse",
        y: small_platform_y,
        x: small_platform_x
    })

var circle = background_svg.append("circle")
    .attrs({
        r: circle_radius,
        fill: "cyan",
        cx: circle_starting_x,
        cy: circle_starting_y,
    })

$(function() {

    // initialize variables for moving circle
    var x = circle_starting_x;
    var y = circle_starting_y;

    // variables to keep track of horizontal velocity + acceleration
    var init_horizontal_acceleration = 1;
    var horizontal_acceleration = 0.01;
    var cur_horizontal_acceleration = init_horizontal_acceleration;
    var init_horizontal_velocity_right = 2;
    var init_horizontal_velocity_left = -2;
    var horizontal_velocity = 0; // starting velocity
    var friction = 0.25;

    // variables to keep track of vertical velocity + acceleration
    var jump_counter = 0;
    var gravity = 0.05;
    var vertical_velocity = 0;
    var init_vertical_velocity = -4;
    var jump_time = 0;

    var velocity_loss = 0.75;
    var bounce_flag = false;

    // bools to check if key has been pressed
    var leftPressed = false;
    var rightPressed = false;
    var spacePressed = false;

    // keep looping while screen is active
    setInterval(function(){

        if((spacePressed || jump_time > 0)&&!bounce_flag){
            if(jump_counter == 1){
                jump_time = 0;
                vertical_velocity = init_vertical_velocity;
            }
            jump_time += 0.1;
            jump_up_and_down();
        // for bouncing
        } else if (Math.abs(vertical_velocity) > 0) {
            jump_time += 0.1;
            jump_up_and_down();   
        }

        if(leftPressed){
            move_horizontal();
        } else if (rightPressed) {
            move_horizontal();
        } else if (horizontal_velocity > 0){
            horizontal_velocity = Math.max(horizontal_velocity - friction, 0);
            move_horizontal();
        } else if (horizontal_velocity < 0){
            horizontal_velocity = Math.min(horizontal_velocity + friction, 0);
            move_horizontal();
        } 
    },.01)

// check for key presses
$(document).keydown(function(e) {
        console.log(e)
        switch(e.which) {
            case 32: // space key
                spacePressed = true;
                jump_counter++;
                break;
            case 37: // left arrow key
                leftPressed = true;
                horizontal_velocity = init_horizontal_velocity_left;
                cur_horizontal_acceleration += horizontal_acceleration;
                spacePressed = false;
                jump_counter = 0;
                break;
            case 39: // right arrow key
                rightPressed = true;
                horizontal_velocity = init_horizontal_velocity_right;
                cur_horizontal_acceleration += horizontal_acceleration;
                spacePressed = false;
                jump_counter = 0;
                break;
            default:
                return;
        }
        e.preventDefault();
    });

// check for key releases
$(document).keyup(function(e) {
        switch(e.which) {
            case 32:
                spacePressed = false;
                jump_counter = 0;
                break;
            case 37: // left arrow key
                leftPressed = false;
                cur_horizontal_acceleration = init_horizontal_acceleration
                break;
            case 39: // right arrow key
                rightPressed = false;
                cur_horizontal_acceleration = init_horizontal_acceleration
                break;
            default:
                return;
        }
        e.preventDefault();
    });

function is_on_base_platform(potential_y) {
    return potential_y >= bottom_y_barrier;
}

function x_in_range_of_small_platform(potential_x) {
    return ((potential_x < small_platform_right_x + circle_radius)&&
            (potential_x > small_platform_x - circle_radius));
}

function y_in_range_of_small_platform(potential_y) {
    return ((potential_y < bottom_of_small_platform_y + circle_radius)&&
            (potential_y > bottom_of_small_platform_y - circle_radius));
}

function is_on_small_platform(potential_x, potential_y) {
    // testing for range because browser lags sometime
    return ((potential_y <= small_platform_y - circle_radius + 10)&&
            (potential_y >= small_platform_y - circle_radius - 10)&&
            x_in_range_of_small_platform(potential_x));
}

function hit_bottom_of_small_platform(potential_x, potential_y) {
    // testing for range because browser lags sometime
    return ((potential_y >= bottom_of_small_platform_y + circle_radius - 25)&&
            (potential_y <= bottom_of_small_platform_y + circle_radius + 25)&&
            x_in_range_of_small_platform(potential_x));
}

function hit_right_of_small_platform(potential_x, potential_y) {
    return ((potential_x <= small_platform_right_x + circle_radius + 50)&&
            (potential_x >= small_platform_right_x + circle_radius - 50)&&
            y_in_range_of_small_platform(potential_y))
}

function hit_left_of_small_platform(potential_x, potential_y) {
    return ((potential_x <= small_platform_x - circle_radius + 50)&&
            (potential_x >= small_platform_x - circle_radius - 50)&&
            y_in_range_of_small_platform(potential_y))
}

function jump_up_and_down() {
    vertical_velocity += gravity * jump_time

    // on the way up
    if (vertical_velocity < 0) {
        // if we hit the top of the screen
        if (y + vertical_velocity <= top_y_barrier){

            if (testing) {
                console.log("hit top of screen")
            }
            
            y = top_y_barrier;
            vertical_velocity = vertical_velocity * -1 * velocity_loss;
        // if we hit the bottom of the small platform
        } else if (hit_bottom_of_small_platform(x, y+vertical_velocity)){

            if (testing) {
                console.log("hit bottom of small platform")
            }

            y = bottom_of_small_platform_y + circle_radius
            vertical_velocity = vertical_velocity * -1 * velocity_loss;
        } else  {
            y += vertical_velocity
        }
    }
    // on the way down
    else{
        // if we hit the top of the base platform
        if (is_on_base_platform(y+vertical_velocity)) {

            if (testing) {
                console.log("hit top of base platform")
            }

            y = bottom_y_barrier;
            if (!bounce_flag){
                vertical_velocity = vertical_velocity * -1 * velocity_loss;
                bounce_flag = true;
            } else if (vertical_velocity > 3){
                vertical_velocity = vertical_velocity * -1 * velocity_loss;
            } else {
                jump_time = 0;
                bounce_flag = false;
                vertical_velocity = 0;
            }
            
        } else if (is_on_small_platform(x, y+vertical_velocity)) {

            if (testing) {
                console.log("hit top of small platform")
            }

            y = small_platform_y - circle_radius
            if (!bounce_flag){
                vertical_velocity = vertical_velocity * -1 * velocity_loss;
                bounce_flag = true;
            } else if (vertical_velocity > 3){
                vertical_velocity = vertical_velocity * -1 * velocity_loss;
            } else {
                jump_time = 0;
                bounce_flag = false;
                vertical_velocity = 0;
            }
        } else {
            y += vertical_velocity
        }

    }
    
    // change y coordinate of circle
    circle.attrs({
      cy: y
    });
}

function move_horizontal() {

    // only add acceleration if ball is on a platform
    // ball on base platform
    if (is_on_base_platform(y)||
        // ball on small platform
        (is_on_small_platform(x, y))){
        // add acceleration
        horizontal_velocity *= cur_horizontal_acceleration;
    }
    
    // moving left
    if (horizontal_velocity < 0) {
        // if hitting left side of screen
        if (x + horizontal_velocity <= left_x_barrier){

            if (testing) {
                console.log("hit left of screen")
            }

            // going opposite direction now
            x = left_x_barrier;
            horizontal_velocity = horizontal_velocity * -1 * velocity_loss;

        // if hitting right of small platform
        } else if (hit_right_of_small_platform(x+horizontal_velocity, y)){

            if (testing) {
                console.log("hit right of small platform")
            }

            x = small_platform_right_x + circle_radius;
            horizontal_velocity = horizontal_velocity * -1 * velocity_loss;

        // rolling off the left
        } else if (!is_on_small_platform(x+horizontal_velocity, y)&&
                    is_on_small_platform(x,y)){

            if (testing) {
                console.log("rolling off small platform on left")
            }

            x = x + horizontal_velocity
            vertical_velocity = -0.1
            jump_up_and_down();
        }   
        else {
            x = x + horizontal_velocity;
        }
        
    }
    // moving right
    else{
        // if hitting right side of screen
        if (x + horizontal_velocity >= right_x_barrier){

            if (testing) {
                console.log("hit right of screen")
            }

            x = right_x_barrier;
            horizontal_velocity = horizontal_velocity * -1 * velocity_loss;

        // if hitting left of small platform
        } else if (hit_left_of_small_platform(x+horizontal_velocity, y)){

            if (testing) {
                console.log("hit left of small platform")
            }

            x = small_platform_x - circle_radius;
            horizontal_velocity = horizontal_velocity * -1 * velocity_loss;
        } else if (!is_on_small_platform(x+horizontal_velocity, y)&&
                    is_on_small_platform(x,y)){

            if (testing) {
                console.log("rolling off small platform on right")
            }

            x = x + horizontal_velocity
            vertical_velocity = -0.1
            jump_up_and_down();
        } else {
            x = x + horizontal_velocity;
        }
    }

    circle.attrs({
      cx: x
    });
  }

});