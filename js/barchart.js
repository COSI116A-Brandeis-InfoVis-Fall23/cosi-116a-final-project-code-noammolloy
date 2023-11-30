function barchart() {
    let margin = {
        top: 60,
        left: 50,
        right: 30,
        bottom: 35
      },
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,
      barPadding = 10,
    //   barWidth = (width / dataset.length);
      barWidth = 10;
    
    /* gets passed federal expenditure data but doesn't 
    use it for this assignment because I'm still testing it */
    function chart(selector, expData) {
        let svg = d3.select(selector)
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
        .classed("svg-content", true)
        .classed("bar-chart", true);
        // .attr("width", width)
        // .attr("height", height);
        
        /* junk data for testing */
        let dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
        
        svg = svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("y", function(d) {
             return height - d 
        })
        .attr("height", function(d) { 
            return d; 
        })
        .attr("width", barWidth - barPadding)
        .style("fill", "red") 
        .attr("transform", function (d, i) {
            let translate = [barWidth * i, 0]; 
            return "translate("+ translate +")";
        });
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