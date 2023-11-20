function treemap() {
  //define global variables
  let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35
    },
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    yearLabel = ""
    // and more

  function chart(selector, data) {
    let svg = d3.select(selector)
      .append("svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
        .classed("svg-content", true);
    
    svg = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    
  }
}