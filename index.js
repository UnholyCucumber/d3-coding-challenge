

var svgContainer = d3.select(".background")
    .append("svg")

var platform = svgContainer.append("rect")
    .attr("width", 10000)
    .attr("height", 100)
    .attr("fill", 'orangered')
    .attr("position", "absolute")
    .attr("bottom", 0)
    .attr("left", 0)


/*
    .attrs({ 
        width: 100%, 
        height: 10, 
        fill: 'orangered' 
    })*/