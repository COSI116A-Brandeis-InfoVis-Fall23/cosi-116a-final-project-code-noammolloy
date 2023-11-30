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
      // Define a time parser within the linegraph function
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

    // const legend = svg.append('g')
    //   .attr('class', 'legend')
    //   .attr('transform', `translate(${width - legendWidth}, 20)`);

    // const legendItems = legend.selectAll('.legend-item')
    //   .data(uniqueAgencies)
    //   .enter()
    //   .append('g')
    //   .attr('class', 'legend-item')
    //   .attr('transform', (d, i) => {
    //     const col = Math.floor(i / itemsPerColumn);
    //     const row = i % itemsPerColumn;
    //     const x = col * (legendWidth / 2);
    //     const y = row * 20;
    //     return `translate(${x},${y})`;
    //   });

    // legendItems.append('rect')
    //   .attr('x', 0)
    //   .attr('y', 0)
    //   .attr('width', 10)
    //   .attr('height', 10)
    //   .attr('fill', d => colorScale(d));

    // legendItems.append('text')
    //   .attr('x', 15)
    //   .attr('y', 10)
    //   .text(d => d)
    //   .style('font-size', '8px')
    //   .attr('alignment-baseline', 'hanging');

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

const checkboxes = checkboxContainer.selectAll('.checkbox')
    .data(uniqueAgencies)
    .enter()
    .append('div')
    .attr('class', 'checkbox')
    .style('transform', (d, i) => {
        const y = i * 5; // Adjust the vertical positioning as needed
        return `translate(0, ${y}px)`;
    });

checkboxes.append('input')
    .attr('type', 'checkbox')
    .attr('class', 'checkbox__control')
    .attr('id', (d, i) => `checkbox-${i}`)
    .attr('data-department', d => d)
    .on('change', handleChange);

checkboxes.append('label')
    .attr('for', (d, i) => `checkbox-${i}`)
    .text(d => d);



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

function handleChange() {
    // Handle checkbox change event
    const selectedDepartments = checkboxContainer.selectAll('.checkbox__control:checked')
      .data()
      .map(d => d); // Adjust based on your data structure
  
    // Do something with the selected departments
    console.log('Selected Departments:', selectedDepartments);
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
  