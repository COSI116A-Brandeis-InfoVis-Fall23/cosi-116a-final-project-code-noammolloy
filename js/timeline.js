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

  return timeline;
};

timeline();
