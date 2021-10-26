var svgContainer = d3.select(".background")
    .append("svg")

console.log(svgContainer)

var rectangle = svgContainer.append("rect")
      .attr("x", 150)
      .attr("y", 50)
      .attr("width", 50)
      .attr("height", 140)
      .attr("color", "red");
