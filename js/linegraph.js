function linegraph() {
    let margin = {
      top: 30,
      left: 30,
      right: 30,
      bottom: 35
    };
    let width = 700 - margin.left - margin.right;
    let height = 700 - margin.top - margin.bottom;
    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  
    function chart(selector, data) {
      const parseTime = d3.timeParse('%Y-%m-%d');
  
      data.forEach(d => {
        d['Record Date'] = parseTime(d['Record Date']);
        d['Gross Cost (in Billions)'] = parseFloat(d['Gross Cost (in Billions)']);
      });
  
      let svg = d3.select(selector)
        .append('svg')
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
        .classed('svg-content', true);
  
      svg = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  

        const brush = d3.brushX()
        .extent([[0, 0], [width, height]])
        .on("end", brushed);

    // Append brush to the SVG
    svg.append("g")
        .attr("class", "brush")
        .call(brush);

    // Function to handle brushing
    function brushed(event) {
        if (!event.selection) return;

        const [x0, x1] = event.selection.map(xScale.invert);

        // Filter data within the brushed range
        const brushedData = data.filter(d => x0 <= d['Record Date'] && d['Record Date'] <= x1);

        // Update other visualizations (e.g., bar chart)
        updateBarChart(brushedData);
    }
      // Group data by agency name
      const uniqueAgencies = [...new Set(data.map(item => item['Agency Name']))];
  
      const lineChartData = uniqueAgencies.map(agency => {
        return {
          name: agency,
          values: data
            .filter(item => item['Agency Name'] === agency && item['Restatement Flag'] === 'Y')
            .map(item => ({
              date: item['Record Date'],
              cost: parseFloat(item['Gross Cost (in Billions)'])
            }))
        };
      });
  
      // Define x and y scales
      const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => d['Record Date']))
        .range([0, width]);
  
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d['Gross Cost (in Billions)'])])
        .range([height, 0]);
      
      // Define x and y axes
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

// Append x-axis to the SVG
svg.append('g')
  .attr('class', 'x-axis')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis);

// Append y-axis to the SVG
svg.append('g')
  .attr('class', 'y-axis')
  .call(yAxis);

// Add a label for the x-axis
svg.append('text')
  .attr('transform', `translate(${width / 2},${height + margin.top})`)
  .style('text-anchor', 'middle')
  .style('font-size', '14px')
  .text('Record Date');

// Add a label for the y-axis
svg.append('text')
  .attr('transform', 'rotate(-90)')
  .attr('y', 0 - margin.left - 30)
  .attr('x', 0 - (height / 2))
  .attr('dy', '1em')
  .style('text-anchor', 'middle')
  .style('font-size', '14px')
  .text('Gross Cost (in Billions)');

    const itemsPerColumn = 10;
    const legendWidth = 400;

    const commonParent = d3.select('.vis-holder');

// Select the linegraph SVG to get its position
const linegraphSVG = commonParent.select('#linegraph');
const linegraphRect = linegraphSVG.node().getBoundingClientRect();
const linegraphX = linegraphRect.left + window.scrollX;
const linegraphY = linegraphRect.top + window.scrollY;

// Append the checkbox container aligned with the linegraph SVG
const checkboxContainer = commonParent.insert('div', 'linegraph-holder')
    .attr('class', 'checkbox-container')
    .style('position', 'absolute')
    .style('left', `${linegraphX}px`)
    .style('top', `${linegraphY}px`);

// Append a checkbox item for each selected department
const checkboxes = checkboxContainer.selectAll('.checkbox')
    .data(uniqueAgencies)
    .enter()
    .append('div')
    .attr('class', 'checkbox')
    .style('transform', (d, i) => {
        const y = i * 5;
        return `translate(0, ${y}px)`;
    });

// get the input from the checkboxes
checkboxes.append('input')
    .attr('type', 'checkbox')
    .attr('class', 'checkbox__control')
    .attr('id', (d, i) => `checkbox-${i}`)
    .attr('data-department', d => d)
    .on('change', handleChange);

checkboxes.append('label')
    .attr('for', (d, i) => `checkbox-${i}`)
    .text(d => d)
    .style('color', d => colorScale(d));



      const line = d3.line()
  .defined(d => !isNaN(d.cost)) // Filter out NaN values in 'cost'
  .x(d => xScale(d.date))
  .y(d => yScale(d.cost));

  
// Loop through each agency's data and draw a line for each
lineChartData.forEach(agencyData => {
  svg.append('path')
    .datum(agencyData.values.filter(d => !isNaN(d.cost))) // Filter out NaN values in 'cost'
    .attr('fill', 'none')
    .attr('stroke', colorScale(agencyData.name))
    .attr('d', line);
});

// gets all checked boxes and passes the new data to update the graph
function handleChange() {
    const selectedDepartments = checkboxContainer.selectAll('.checkbox__control:checked')
      .data()
      .map(d => d);
    updateGraph(selectedDepartments)
    console.log('Selected Departments:', selectedDepartments);
  }
  // clears and redraws graph with new parameters
  function updateGraph(selectedDepartments) {
    svg.selectAll('.line').remove();
    const filteredData = lineChartData
        .filter(agencyData => selectedDepartments.includes(agencyData.name));

    // Clear existing graph
    svg.selectAll('path').remove();

    // Draw lines for the selected departments
    filteredData.forEach(agencyData => {
        svg.append('path')
            .datum(agencyData.values.filter(d => !isNaN(d.cost)))
            .attr('fill', 'none')
            .attr('stroke', colorScale(agencyData.name))
            .attr('d', line);
    });

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
  
    return chart;
  }
  