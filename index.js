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
    circle_starting_x = available_width/2 - circle_radius/2,
    circle_starting_y = base_platform_y - circle_radius,
    right_x_barrier = available_width - circle_radius,
    left_x_barrier = circle_radius,
    top_y_barrier = circle_radius,
    bottom_y_barrier = base_platform_y - circle_radius;

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


var dot = background_svg.append("circle")
    .attrs({
        r: "5px",
        fill: "red",
        cy: top_y_barrier,
        cx: small_platform_right_x
    })



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
    var horizontal_acceleration = 1.25;
    var horizontal_velocity = 3;

    // variables to keep track of vertical velocity + acceleration
    var jump_counter = 0;
    var gravity = 0.005;
    var vertical_velocity = 0;
    var jump_time = 0;

    // bools to check if key has been pressed
    var leftPressed = false;
    var rightPressed = false;
    var spacePressed = false;

    // keep looping while screen is active
    setInterval(function(){

        if(spacePressed || jump_time > 0){
            if(jump_counter == 1){
                jump_time = 0;
                vertical_velocity = -2.25;
            }
            jump_time += 0.1;
            jump_up();
        }

        if(leftPressed){
            move_left();
        } else if (rightPressed) {
            move_right();
        } else if (horizontal_velocity > 0){

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
                horizontal_acceleration *= horizontal_acceleration
                break;
            case 39: // right arrow key
                rightPressed = true;
                horizontal_acceleration *= horizontal_acceleration
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
                horizontal_acceleration = 1
                break;
            case 39: // right arrow key
                rightPressed = false;
                horizontal_acceleration = 1
                break;
            default:
                return;
        }
        e.preventDefault();
    });

function jump_up() {
    vertical_velocity += gravity * jump_time
    console.log(vertical_velocity)

    // on the way up
    if (vertical_velocity < 0) {
        // if we hit the ceiling or the underside of the small platform
        y = Math.max(top_y_barrier, y + vertical_velocity*jump_time)
    }
    // on the way down
    else{
        // if we hit the top of bottom platform or small platform
        
        if ((y >= bottom_y_barrier)||
            ((y >= small_platform_y - circle_radius)&&((x <= small_platform_right_x)&&(x >= small_platform_x)))){
            vertical_velocity = 0;
            jump_time = 0;
        }
        y = Math.min(bottom_y_barrier, y + vertical_velocity*jump_time)
    }

    circle.attrs({
      cy: y
    });

}

function move_left() {

    // ensure ball doesn't go out of bound on the left
    // account for acceleration if circle is on a platform
    x = Math.max(x - horizontal_velocity * horizontal_acceleration, left_x_barrier);
    circle.attrs({
      cx: x
    });
  }

function move_right() {
    x = Math.min(x + horizontal_velocity * horizontal_acceleration, right_x_barrier);
    circle.attrs({
      cx: x
    });
  }

});