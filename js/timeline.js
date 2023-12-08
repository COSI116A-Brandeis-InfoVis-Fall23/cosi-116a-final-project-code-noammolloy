function timeline(){

    var width = 900
    var height = 20; 
    var svg = d3.select("#tl") 
        .append("svg") 
        .attr("width", width) 
        .attr("height", height); 

    var scale = d3.scaleLinear() 
        .domain([2000, 2020]) 
        .range([0, width - 50]); 

    var timeline = d3.axisBottom(scale).tickFormat(d3.format("d"));

    svg.append("g") 
        .attr("transform", "translate(30,0)") 
        .call(timeline) 
    //zero=30 each year =+42.5
    // create svg element:
    var svg = d3.select("#circle1").append("svg").attr("width", 1000).attr("height", 40)
    
    // Add the path using this helper function
    svg.append('rect') //dot com bubble
        .attr("x", 30)
        .attr("y", 0)
        .attr("width", 127.5)
        .attr("height", 20)
        .attr('stroke', 'black')
        .attr('fill', '#064a7a');

    svg.append('rect') //Financial Crisis
        .attr("x", 327.5)
        .attr("y", 0)
        .attr("width", 42.5)
        .attr("height", 20)
        .attr('stroke', 'black')
        .attr('fill', '#2fc242');

    // Add the path using this helper function
    svg.append('circle') //2020 Stock Market Crash
        .attr('cx', 880)
        .attr('cy', 25)
        .attr('r', 10)
        .attr('stroke', 'black')
        .attr('fill', '#c08cff');

        // create svg element:
        var svg = d3.select("#circle2").append("svg").attr("width", 1000).attr("height", 40)

        svg.append('circle') //9/11
        .attr('cx', 72.5)
        .attr('cy', 25)
        .attr('r', 10)
        .attr('stroke', 'black')
        .attr('fill', '#fcec53');

        // Add the path using this helper function
        svg.append('rect') //Subprime Mortgage Crisis
            .attr("x", 327.5)
            .attr("y", 0)
            .attr("width", 127.5)
            .attr("height", 20)
            .attr('stroke', 'black')
            .attr('fill', '#ff63a7');

        svg.append('circle') //Covid-19 Recession
            .attr('cx', 880)
            .attr('cy', 25)
            .attr('r', 10)
            .attr('stroke', 'black')
            .attr('fill', '#794bad');

            

        // create svg element:
        var svg = d3.select("#circle3").append("svg").attr("width", 1000).attr("height", 40)

        svg.append('rect') //Iraq War(2003-2011)
            .attr("x", 157.5)
            .attr("y", 0)
            .attr("width", 340)
            .attr("height", 20)
            .attr('stroke', 'black')
            .attr('fill', '#c72f24');

        svg.append('rect') //Iraq War (2013-2017)
            .attr("x", 582.5)
            .attr("y", 0)
            .attr("width", 170)
            .attr("height", 20)
            .attr('stroke', 'black')
            .attr('fill', '#c72f24');

        svg.append('rect') //Chinese property crisis
            .attr("x", 880)
            .attr("y", 0)
            .attr("width", 20)
            .attr("height", 20)
            .attr('stroke', 'black')
            .attr('fill', '#ff9366');

        svg.append('rect') //Chinese property crisis
            .attr("x", 881)
            .attr("y", 1)
            .attr("width", 20)
            .attr("height", 18)
            .attr('fill', '#ff9366');



        var svg = d3.select("#circle4").append("svg").attr("width", 1000).attr("height", 40)

        svg.append('rect') //Afganistan War
            .attr("x", 72.5)
            .attr("y", 0)
            .attr("width", 807.5)
            .attr("height", 20)
            .attr('stroke', 'black')
            .attr('fill', '#de52c9');
    


  return timeline;
};

timeline();
