

var svgContainer = d3.select(".background")
    .append("svg")
    .attrs({
        width: "100%",
        height: "100%",
        position: "relative"
    })

var platform = svgContainer.append("rect")
    .attrs({
        width: "100%",
        height: "15%",
        fill: "orangered",
        position: "absolute",
        top: "500px",
        left: "500px"
    })


/*
    .attrs({ 
        width: 100%, 
        height: 10, 
        fill: 'orangered' 
    })*/