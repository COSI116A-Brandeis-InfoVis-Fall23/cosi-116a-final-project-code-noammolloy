function treemap() {
  // global vars
  let margin = {
      top: 60,
      left: 50,
      right: 30,
      bottom: 35
    },
    width = 700 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom,
    value = d => d,
    label = d => d,
    colorScale = d3.scaleOrdinal(d3.schemeCategory10),
    ourBrush = null,
    selectableElements = d3.select(null),
    dispatcher,
    selectedYear;

  function chart(selector, data, year) {
    selectedYear = year;
    console.log(selectedYear);

    let svg = d3.select(selector)
      .append("svg")
      // .attr("width", 800)
      // .attr("height", 800)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
      .classed("svg-content", true);

    svg = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // filter data for the selected year, and filter out "total" data point
    let filteredData = data.filter(d => d["Statement Fiscal Year"] === selectedYear
      && d["Agency Name"] !== "Total"
      && d["Restatement Flag"] === "Y"
      );

    // first formats to hierarchical structure
    let root = d3.hierarchy({ values: d3.nest().key(d => d["Statement Fiscal Year"]).entries(filteredData) }, d => d.values)
      .sum(d => +d["Gross Cost (in Billions)"]) // using sum for the case that we might want to show data for all years grouped into one treemap
      .sort((a, b) => b.value - a.value);

    // overall layout
    let treemapLayout = d3.treemap()
      .size([width, height])
      .padding(1)
      .round(true);

    treemapLayout(root);

    // draws the rectangles
    let cells = svg.selectAll("rect")
      .data(root.leaves())
      .enter()
      .append("rect")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .attr("fill", d => colorScale(d.data["Gross Cost (in Billions)"]));

    // adds department labels
    let labels = svg.selectAll("text")
      .data(root.leaves())
      .enter()
      .append("text")
      .attr("x", d => d.x0 + 5)
      .attr("y", d => d.y0 + 15)
      .text(d => label(d.data))
      .attr("font-size", "12px")
      .attr("fill", "white");

    // Add a label up top for the selected year
    svg.append("text")
      .attr("x", margin.left)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "18px")
      .text(`For Fiscal Year ${selectedYear}`);

    selectableElements = cells;

    return chart;
  }

  chart.margin = function (_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function (_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function (_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.value = function (_) {
    if (!arguments.length) return value;
    value = _;
    return chart;
  };

  chart.label = function (_) {
    if (!arguments.length) return label;
    label = _;
    return chart;
  };

  chart.colorScale = function (_) {
    if (!arguments.length) return colorScale;
    colorScale = _;
    return chart;
  };

  chart.selectedYear = function (_) {
    if (!arguments.length) return selectedYear;
    selectedYear = _;
    return chart;
  };

  chart.selectionDispatcher = function (_) {
    if (!arguments.length) return dispatcher;
    dispatcher = _;
    return chart;
  };

  chart.updateSelection = function (selectedData) {
    if (!arguments.length) return;
    selectableElements.classed("selected", d => {
      return selectedData.includes(d.data)
    });
  };

  return chart;
}