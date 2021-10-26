var available_width = window.innerWidth,
    available_height = window.innerHeight,
    base_platform_width = available_width * 1.00,
    base_platform_height = available_height * 0.10,
    base_platform_x = 0,
    base_platform_y = available_height - base_platform_height,
    small_platform_width = available_width * 0.50,
    small_platform_height = available_height * 0.10,
    small_platform_x = available_width * 0.50 - small_platform_width/2,
    small_platform_y = available_height * 0.50,
    circle_radius = available_height * 0.05,
    circle_starting_x = available_width/2 - circle_radius/2,
    circle_starting_y = base_platform_y - circle_radius;


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
