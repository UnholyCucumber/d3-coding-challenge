

var svgContainer = d3.select(".background")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")

var platform = svgContainer.append("rect")
    .attr("width", "100%")
    .attr("height", "10%")
    .attr("fill", 'orangered')
    .attr("position", "absolute")
    .attr("bottom", 100)
    .attr("left", 0)


/*
    .attrs({ 
        width: 100%, 
        height: 10, 
        fill: 'orangered' 
    })*/