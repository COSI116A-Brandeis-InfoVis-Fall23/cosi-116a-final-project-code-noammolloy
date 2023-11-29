function timeline() {
    let margin = {
        top: 60,
        left: 50,
        right: 30,
        bottom: 35
      },
      width = 500 - margin.left - margin.right,
      height = 100 - margin.top - margin.bottom,
      xValue = d => d.year,
      xLabelText = "Year",
      xScale = d3.scaleTime(),
      selectableElements = d3.select(null),
      dispatcher;
  
    function chart(selector, data) {
      let svg = d3.select(selector)
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
        .classed("svg-content", true);
  
      svg = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
      xScale
        .domain(d3.extent(data, xValue))
        .rangeRound([0, width]);
  
      let xAxis = svg.append("g")
        .attr("transform", "translate(0," + (height) + ")")
        .call(d3.axisBottom(xScale)
          .ticks(data.length)
          .tickFormat(d3.timeFormat("%Y"))
        );
  
      xAxis.selectAll("text")
        .style("text-anchor", "middle");
  
      xAxis.append("text")
        .attr("class", "axisLabel")
        .attr("transform", "translate(" + (width / 2) + ", 30)")
        .text(xLabelText);
  
      let points = svg.append("g")
        .selectAll(".linePoint")
        .data(data);
  
      points.exit().remove();
  
      points = points.enter()
        .append("circle")
        .attr("class", "point linePoint")
        .merge(points)
        .attr("cx", d => xScale(xValue(d)))
        .attr("cy", height / 2)
        .attr("r", 5)
        .on("click", d => handleYearClick(d.year));
  
      selectableElements = points;
  
      return chart;
    }
  
    function handleYearClick(selectedYear) {
      // Get the name of our dispatcher's event
      let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];
  
      // Let other charts know
      dispatcher.call(dispatchString, this, selectedYear);
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
  
    chart.x = function (_) {
      if (!arguments.length) return xValue;
      xValue = _;
      return chart;
    };
  
    chart.xLabel = function (_) {
      if (!arguments.length) return xLabelText;
      xLabelText = _;
      return chart;
    };
  
    chart.selectionDispatcher = function (_) {
      if (!arguments.length) return dispatcher;
      dispatcher = _;
      return chart;
    };
  
    chart.updateSelection = function (selectedData) {
      if (!arguments.length) return;
  
      // Select an element if its datum was selected
      selectableElements.classed("selected", d => selectedData.includes(d.year));
    };
  
    return chart;
  }