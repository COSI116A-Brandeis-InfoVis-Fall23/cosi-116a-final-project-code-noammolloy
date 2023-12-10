function yearslider() {

  let min = 2000,
    max = 2021,
    initialYear = max,
    step = 1,
    dispatcher;


  function slider(selector) {
    let animateButton = d3.select(selector)
      .append("button")
      .text("Animate")
      

    let ys = d3.select(selector)
      .append("input")
      .attr("id", "year-slider")
      .attr("type", "range")
      .attr("min", min)
      .attr("max", max)
      .attr("step", step)
      .attr("value", initialYear)
      .attr("list", "labels");

    let yearList = createYearList(min, max)
    let labels = d3.select(selector)
      .append("datalist")
      .attr("id", "slider-labels")

    labels.selectAll("option")
      .data(yearList)
      .enter()
      .append("option")
      .attr("value", function(d) { return d; })
      .attr("label", function(d) { return d; });

    ys.on("input", function() {
      let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];
      dispatcher.call(dispatchString, this, this.value);
    });

    animateButton.on("click", function () {
      let index = 0;
      function animateYear() {
        if (index < yearList.length) {
          const year = yearList[index];
          ys.property("value", String(year));
          ys.dispatch("input") // triggers the input event
          index++;
          // gives a delay until next iteration
          setTimeout(animateYear, 150);
        }
      }
      animateYear();
    });

    function createYearList(min, max) {
      const result = [];
      for (let i = min; i <= max; i++) {
        result.push(i);
      }
      return result;
    }

    return slider;
  }

  slider.min = function (_) {
    if (!arguments.length) return min;
    min = _;
    return slider;
  };

  slider.max = function (_) {
    if (!arguments.length) return max;
    max = _;
    return slider;
  };

  slider.initialYear = function (_) {
    if (!arguments.length) return initialYear;
    initialYear = _;
    return slider;
  };

  slider.step = function (_) {
    if (!arguments.length) return step;
    step = _;
    return slider;
  };

  slider.selectionDispatcher = function (_) {
    if (!arguments.length) return dispatcher;
    dispatcher = _;
    return slider;
  };

  return slider
}