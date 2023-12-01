function timeline(){

    var width = 800
    var height = 100; 
    var svg = d3.select("#tl") 
        .append("svg") 
        .attr("width", width) 
        .attr("height", height); 

    var scale = d3.scaleLinear() 
        .domain([2000, 2020]) 
        .range([0, width - 50]); 

    var timeline = d3.axisBottom(scale).tickFormat(d3.format("d"));

    svg.append("g") 
        .attr("transform", "translate(20,50)") 
        .call(timeline) 
    
    // create svg element:
    var svg = d3.select("#circle1").append("svg").attr("width", 200).attr("height", 60)

    // Add the path using this helper function
    svg.append('circle')
        .attr('cx', 50)
        .attr('cy', 50)
        .attr('r', 10)
        .attr('stroke', 'black')
        .attr('fill', '#f263df');

        // create svg element:
        var svg = d3.select("#circle2").append("svg").attr("width", 200).attr("height", 60)

        // Add the path using this helper function
        svg.append('circle')
            .attr('cx', 50)
            .attr('cy', 50)
            .attr('r', 10)
            .attr('stroke', 'black')
            .attr('fill', '#8cffff');

            

        // create svg element:
        var svg = d3.select("#circle3").append("svg").attr("width", 200).attr("height", 60)

        // Add the path using this helper function
        svg.append('circle')
            .attr('cx', 50)
            .attr('cy', 50)
            .attr('r', 10)
            .attr('stroke', 'black')
            .attr('fill', '#c08cff');
    


  return timeline;
};

timeline();
