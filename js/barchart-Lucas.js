function createBarChart(selector) {
    console.log("Function createBarChart was invoked.");
    // Define dimensions and margins for the chart
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    // Create an SVG element
    const svg = d3.select(selector)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    // Define your scales (x and y scales)
    const x = d3.scaleBand().rangeRound([0, width]).padding(.000001);
    const y = d3.scaleLinear().rangeRound([height, 0]);
  
    // Define X and Y axes
    const xAxis = d3.axisBottom().scale(x);
    const yAxis = d3.axisLeft().scale(y).ticks(10);
  
    // Function to update the chart based on data
    function updateChart(data) {
      // Update domains for x and y scales based on your data
      const parseTime = d3.timeParse("%Y-%m-%d"); // Change the date format according to your data
      data.reverse()
      data = data.filter(d => d["Agency Name"] !== "Total");
      data = data.filter(d => !isNaN(d['Gross Cost (in Billions)']));
      data = data.filter(d => d['Gross Cost (in Billions)'] >= 0);

  
      data.forEach(d => {
        d['Record Date'] = parseTime(d['Record Date']);
        d['Gross Cost (in Billions)'] = parseFloat(d['Gross Cost (in Billions)']);
      });
      x.domain(data.map(d => d.AgencyName));
  
      // Change the domain setup to use 'Gross Cost (in Billions)' instead of 'GrossCost'
      y.domain([0, d3.max(data, d => +d['Gross Cost (in Billions)'])]);
  
      // Draw X axis
      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");
  
      // Draw Y axis
      svg.append("g")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Gross Cost (in Billions)");
  
      // Draw bars based on the data
      svg.selectAll(".bar")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar")
  .attr("x", (d, i) => x(d.AgencyName) + i * (x.bandwidth() / data.length))
  .attr("y", d => y(+d['Gross Cost (in Billions)']))
  .attr("height", d => height - y(+d['Gross Cost (in Billions)']))
  .attr("width", x.bandwidth() / data.length) // Adjust the bar width according to data length
  .style("fill", "steelblue");
    }
  
    // Return the function to update the chart
    return updateChart;
  }
  