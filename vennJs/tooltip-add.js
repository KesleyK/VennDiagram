// add a tooltip
var tooltip = d3.select("body").append("div")
.attr("class", "venntooltip");

// add listeners to all the groups to display tooltip on mouseover
function getMouseEventHover() {
  div.selectAll("g")
  .on("mouseover", function (d, i) {
    // sort all the areas relative to the current item
    venn.sortAreas(div, d);
  
    // Display a tooltip with the current size
    tooltip.transition().duration(400).style("opacity", .9);
    tooltip.text(d.values + " users");
    $('#set-values').text(`${d.label}  = {${d.values}}`);
  
    // highlight the current path
    var selection = d3.select(this).transition("tooltip").duration(400);
    selection.select("path")
      .style("stroke-width", 3)
      .style("fill-opacity", d.sets.length == 1 ? .4 : .1)
      .style("stroke-opacity", 1);
  })
  
  .on("mousemove", function () {
    tooltip.style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 28) + "px");
  })
  
  .on("mouseout", function (d, i) {
    tooltip.transition().duration(400).style("opacity", 0);
    var selection = d3.select(this).transition("tooltip").duration(400);
    $('#set-values').text("");
    selection.select("path")
      .style("stroke-width", 0)
      .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
      .style("stroke-opacity", 0);
  });
}

getMouseEventHover();