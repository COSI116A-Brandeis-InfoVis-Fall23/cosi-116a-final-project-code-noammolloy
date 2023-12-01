function barchart() {
    let margin = {
        top: 30,
        left: 70,
        right: 30,
        bottom: 40
    };
    
    let width = 700 - margin.left - margin.right;
    let height = 500 - margin.top - margin.bottom;

    function chart(selector, data) {
        let barPadding = 1;
        
        // data editing/management
        data.forEach(d => {
            d['Record Date'] = new Date(d['Record Date']);
            d['Gross Cost (in Billions)'] = parseFloat(d['Gross Cost (in Billions)']);
        });

        const uniqueAgencies = [...new Set(data.map(item => item['Agency Name']))];
        const uniqueYears = [...new Set(data.map(item => item['Record Date']))].sort((a, b) => a - b);

        const chartData = uniqueAgencies.map(agency => {
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


// Use a different identifier if needed
const colorScale = d3.scaleOrdinal()
    // .domain(uniqueAgencies.map((agency, index) => `${agency}-${index}`))
    .domain(uniqueAgencies.map((agency, index) => `${agency}`))
    .range(d3.schemeCategory10);
// Log unique agencies and color scale domain
console.log('Unique Agencies:', uniqueAgencies);
console.log('Color Scale Domain:', colorScale.domain());

        // accesses section of page for barchart
        let svg = d3.select(selector)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .classed('svg-content', true);


        // Define x and y scales
        const xScale = d3.scaleBand()
            // .domain(chartData.length)
            .domain(uniqueYears.map(d => d.getFullYear()))
            .range([0, width])
            .padding(0.1);

        
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d['Gross Cost (in Billions)'])])
            .range([height, 0]);

        console.log("Chart Data: ", chartData);

const bars = svg.selectAll(".bar-group")
    .data(chartData)
    .enter()
    .append("g")
    .attr("class", "bar-group")
    .attr("transform", d => {
        const xTranslation = xScale(d.values[0].date.getFullYear());
        return isNaN(xTranslation) ? "translate(0,0)" : `translate(${xTranslation}, 0)`;
    });

console.log(chartData)
console.log('Color Scale Domain:', colorScale.domain());

// Use the `bars` selection to add more rectangles
bars.selectAll("rect")
    .data(d => d.values)
    .enter()
    .append("rect")
    .attr("x", d => {
    if (d.values && d.values.length > 0 && d.values[0].date) {
        return xScale(d.values[0].date.getFullYear());
    } else {
        return 0; 
    }
})
.attr("y", d => {
    if (!isNaN(d.cost)) {
        return yScale(d.cost);
    } else {
        return 0;
    }
})
.attr("height", d => {
    const barHeight = height - yScale(d.cost);
    return !isNaN(barHeight) ? Math.max(0, barHeight) : 0;
})
.attr("width", xScale.bandwidth())
.style("fill", d => colorScale(d3.map(d.values, v => v.name).keys()[0]))  

.on("mouseover", function (event, d) {
        console.log("Hovered Rectangle Data:", chartData[d]);
        console.log("Data:", d);
        console.log("Name:", chartData[d].name);
});
        // Define x and y axes
        const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
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

        svg.append('text')
            .attr('x', width / 2)
            .attr('y', 0 - (margin.top / 2))
            .attr('text-anchor', 'middle')
            .style('font-size', '16px')
            .text('Federal Expenditures by Year');

        // Add a label for the x-axis
        svg.append('text')
            .attr('transform', `translate(${width / 2},${height + margin.bottom})`)
            .style('text-anchor', 'middle')
            .style('font-size', '14px')
            .text('Record Date');

        // Add a label for the y-axis
        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left)
            .attr('x', 0 - (height / 2))
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .style('font-size', '14px')
            .text('Gross Cost (in Billions)');


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
  
