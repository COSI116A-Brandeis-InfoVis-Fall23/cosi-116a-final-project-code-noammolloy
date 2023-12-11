function timeline(data){
    var width = 985
    var height = 20; 
    var svg = d3.select("#tl") 
        .append("svg") 
        .attr("width", width) 
        .attr("height", height); 

    var scale = d3.scaleLinear() 
        .domain([2000, 2022]) 
        .range([0, width - 50]); 

    var timeline = d3.axisBottom(scale).tickFormat(d3.format("d"));

    svg.append("g") 
        .attr("transform", "translate(10,0)") 
        .call(timeline) 
    //zero=10 each year =+42.5
    // create svg element:
    var svg1 = d3.select("#circle1").append("svg").attr("width", 985).attr("height", 40)
    
    // Add the path using this helper function
    svg1.append('rect') //dot com bubble
        .attr("x", 10)
        .attr("y", 0)
        .attr("width", 127.5)
        .attr("height", 20)
        .attr('stroke', 'black')
        .attr('fill', '#064a7a');

    svg1.append('rect') //Financial Crisis
        .attr("x", 307.5)
        .attr("y", 0)
        .attr("width", 42.5)
        .attr("height", 20)
        .attr('stroke', 'black')
        .attr('fill', '#2fc242');

    // Add the path using this helper function
    svg1.append('circle') //2020 Stock Market Crash
        .attr('cx', 860)
        .attr('cy', 25)
        .attr('r', 10)
        .attr('stroke', 'black')
        .attr('fill', '#c08cff');

        svg1.append('rect') //Russo-Ukraine War
            .attr("x", 945)
            .attr("y", 0)
            .attr("width", 10)
            .attr("height", 20)
            .attr('stroke', 'black')
            .attr('fill', '#46bdc6');

        svg1.append('rect') //Russo-Ukraine War (hide line to show it's still going)
            .attr("x", 946)
            .attr("y", .5)
            .attr("width", 10)
            .attr("height", 19)
            .attr('fill', '#46bdc6');


        // create svg element:
        var svg2 = d3.select("#circle2").append("svg").attr("width", 1000).attr("height", 40)

        svg2.append('circle') //9/11
        .attr('cx', 52.5)
        .attr('cy', 25)
        .attr('r', 10)
        .attr('stroke', 'black')
        .attr('fill', '#fcec53');

        // Add the path using this helper function
        svg2.append('rect') //Subprime Mortgage Crisis
            .attr("x", 307.5)
            .attr("y", 0)
            .attr("width", 127.5)
            .attr("height", 20)
            .attr('stroke', 'black')
            .attr('fill', '#ff63a7');

        svg2.append('circle') //Covid-19 Recession
            .attr('cx', 860)
            .attr('cy', 25)
            .attr('r', 10)
            .attr('stroke', 'black')
            .attr('fill', '#794bad');

            

        // create svg element:
        var svg3 = d3.select("#circle3").append("svg").attr("width", 1000).attr("height", 40)

        svg3.append('rect') //Iraq War(2003-2011)
            .attr("x", 137.5)
            .attr("y", 0)
            .attr("width", 340)
            .attr("height", 20)
            .attr('stroke', 'black')
            .attr('fill', '#c72f24');

        svg3.append('rect') //Iraq War (2013-2017)
            .attr("x", 562.5)
            .attr("y", 0)
            .attr("width", 170)
            .attr("height", 20)
            .attr('stroke', 'black')
            .attr('fill', '#c72f24');

        svg3.append('rect') //Chinese property crisis
            .attr("x", 860)
            .attr("y", 0)
            .attr("width", 95)
            .attr("height", 20)
            .attr('stroke', 'black')
            .attr('fill', '#ff9366');

        svg3.append('rect') //Chinese property crisis 
            .attr("x", 861)
            .attr("y", 1)
            .attr("width", 95)
            .attr("height", 18)
            .attr('fill', '#ff9366');

        var svg4 = d3.select("#circle4").append("svg").attr("width", 1000).attr("height", 40)

        svg4.append('rect') //Afganistan War
            .attr("x", 52.5)
            .attr("y", 0)
            .attr("width", 807.5)
            .attr("height", 20)
            .attr('stroke', 'black')
            .attr('fill', '#de52c9');

        

        var svg5 = d3.select("#color1").append("svg").attr("width", 30).attr("height", 40)

        svg5.append('rect') //Dot Com Bubble
            .attr("x", 10)
            .attr("y", 20)
            .attr("width", 20)
            .attr("height", 20)
            .attr('stroke', 'black')
            .attr('fill', '#064a7a');

        var svg6 = d3.select("#color2").append("svg").attr("width", 30).attr("height", 40)
        svg6.append('circle') //9/11
        .attr('cx', 20)
        .attr('cy', 25)
        .attr('r', 10)
        .attr('stroke', 'black')
        .attr('fill', '#fcec53');
        var svg7 = d3.select("#color3").append("svg").attr("width", 30).attr("height", 40)
        svg7.append('rect') //Afganistan War
            .attr("x", 10)
            .attr("y", 20)
            .attr("width", 20)
            .attr("height", 20)
            .attr('stroke', 'black')
            .attr('fill', '#de52c9');
        var svg8 = d3.select("#color4").append("svg").attr("width", 30).attr("height", 40)
        svg8.append('rect') //Iraq War
        .attr("x", 10)
        .attr("y", 20)
        .attr("width", 20)
        .attr("height", 20)
        .attr('stroke', 'black')
        .attr('fill', '#c72f24');
        var svg9 = d3.select("#color5").append("svg").attr("width", 30).attr("height", 40)
        svg9.append('rect') //Russo-Ukraine War
            .attr("x", 10)
            .attr("y", 20)
            .attr("width", 20)
            .attr("height", 20)
            .attr('stroke', 'black')
            .attr('fill', '#46bdc6');
        var svg10 = d3.select("#color6").append("svg").attr("width", 30).attr("height", 40)
        svg10.append('circle') //Covid-19 Recession
            .attr('cx', 20)
            .attr('cy', 25)
            .attr('r', 10)
            .attr('stroke', 'black')
            .attr('fill', '#794bad');
        var svg11= d3.select("#color7").append("svg").attr("width", 30).attr("height", 40)
        svg11.append('circle') //2020 Stock Market Crash
            .attr('cx', 20)
            .attr('cy', 25)
            .attr('r', 10)
            .attr('stroke', 'black')
            .attr('fill', '#c08cff');
        var svg12= d3.select("#color8").append("svg").attr("width", 30).attr("height", 40)
        svg12.append('rect') //Financial Crisis
            .attr("x", 10)
            .attr("y", 20)
            .attr("width", 20)
            .attr("height", 20)
            .attr('stroke', 'black')
            .attr('fill', '#2fc242');
        var svg13= d3.select("#color9").append("svg").attr("width", 30).attr("height", 40)
        svg13.append('rect') //Subprime Mortgage Crisis
            .attr("x", 10)
            .attr("y", 20)
            .attr("width", 20)
            .attr("height", 20)
            .attr('stroke', 'black')
            .attr('fill', '#ff63a7');
        var svg14= d3.select("#color10").append("svg").attr("width", 30).attr("height", 40)
        svg14.append('rect') //Chinese property crisis
            .attr("x", 10)
            .attr("y", 20)
            .attr("width", 20)
            .attr("height", 20)
            .attr('stroke', 'black')
            .attr('fill', '#ff9366');

    var svg15= d3.select("#br").append("svg").attr("width", 900).attr("height", 50)

    
    function updateGraph(selectedDepartments, selectedYears = []) {
    
        // Add visual cues for selected years on the timeline
        svg.selectAll('.timeline-highlight').remove(); // Remove existing highlights
    
        svg.selectAll('.timeline-highlight')
            .data(selectedYears)
            .enter()
            .append('rect')
            .attr('class', 'timeline-highlight')
            .attr('x', year => scale(year) + 10) // Adjust as needed based on your timeline configuration
            .attr('y', 0)
            .attr('width', 42.5) // Adjust the width based on your timeline configuration
            .attr('height', height)
            .attr('fill', '#7878784C'); // You can change the color as needed
    }

  return timeline;
};


timeline();
