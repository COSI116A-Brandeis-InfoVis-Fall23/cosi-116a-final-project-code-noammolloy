function barchart() {
    let margin = {
        top: 30,
        left: 70,
        right: 30,
        bottom: 40
    };
    
    let width = 600 - margin.left - margin.right;
    let height = 500 - margin.top - margin.bottom;
    // let colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    function chart(selector, data) {
        let barPadding = 1;
          
        // Define a time parser within the linegraph function
        const parseTime = d3.timeParse('%Y-%m-%d');

        /*
        data.forEach(d => {
            d['Record Date'] = parseTime(d['Record Date']);
            d['Gross Cost (in Billions)'] = parseFloat(d['Gross Cost (in Billions)']);
        });
        */

        data.forEach(d => {
            d['Record Date'] = new Date(d['Record Date']);
            d['Gross Cost (in Billions)'] = parseFloat(d['Gross Cost (in Billions)']);
        });

        // Group data by agency name
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
       
        console.log(chartData);

        let colorScale = d3.scaleOrdinal()
            .domain(uniqueAgencies)
            .range(d3.schemeCategory10);


        /*
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
*/

        // let barWidth = (width / chartData.length);

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
            .domain(uniqueYears.map(d => d.getFullYear()))
            .range([0, width])
            .padding(0.1);
        /*
        const xScale = d3.scaleBand()
            .domain(uniqueYears.map(d => d.getFullYear()))  // assuming uniqueYears is an array of Date objects
            .range([0, width])
            .padding(0.1);
        */
        /*
        const xScale = d3.scaleLinear() 
            .domain([2000, 2020]) 
            .range([0, width]);
        */

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d['Gross Cost (in Billions)'])])
            .range([height, 0]);

        // svg.selectAll("rect")
        //     .data(chartData)
        //     .enter()
        //     .append("rect")
        //     .attr("y", function(d) {
        //     return yScale(d.values[0].cost);
        //     })
        //     .attr("height", function(d) { 
        //     return height - yScale(d.values[0].cost);
        //     })
        //     .attr("width", barWidth - barPadding)
        //     .style("fill", "blue")
        //     .attr("transform", function (d, i) {
        //     var translate = [barWidth * i, 0]; 
        //     return "translate("+ translate +")";
        //     });
        
        /*
        svg.selectAll("rect")
            .data(chartData)
            .enter()
            .append("rect")
            .attr("y", function(d) {
                return yScale(d.values[0].cost);
            })
            .attr("width", barWidth - barPadding)
            .attr("height", function(d) { 
                return height - yScale(d.values[0].cost);
            })
            .style("fill", d => colorScale(d.name))
            .attr("transform", function (d, i) {
                var translate = [barWidth * i, 0]; 
                return "translate("+ translate +")";
            });
        */

        // Render bars
        /*
        chartData.forEach(agencyData => {
            svg.selectAll("rect")
                .data(agencyData.values)
                .enter()
                .append("rect")
                .attr("x", d => xScale(d.date.getFullYear()))  // Position bars based on the year
                .attr("y", d => yScale(d.cost))
                .attr("width", xScale.bandwidth())
                .attr("height", d => height - yScale(d.cost))
                .style("fill", d => colorScale(agencyData.name));

        });
        */

        // Move these lines outside the loop
        const bars = svg.selectAll("rect")
        .data(chartData)
        .enter();

        chartData.forEach(agencyData => {
        // Use the `bars` selection here
        bars.append("rect")
            .attr("x", d => xScale(d.values[0].date.getFullYear()))  // Position bars based on the year
            // .attr("x", d => d.date ? xScale(d.date.getFullYear()) : 0)
            .attr("y", d => yScale(d.values[0].cost))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - yScale(d.values[0].cost))
            .style("fill", d => colorScale(d.name));
            // console.log(data.filter(d => d.date == null));
            console.log(agencyData.values.filter(d => d.date == null));
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
  
