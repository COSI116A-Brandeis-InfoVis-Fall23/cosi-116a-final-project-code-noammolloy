// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {
  d3.csv("data/Federal_Expenditures_Dataset.csv", (fedExpData) => {
    d3.csv("data/Historical_Events.csv", (eventData) => {
      d3.csv("data/Historical_Political_Power.csv", (polPowData) => {

        const dispatchString = "selectionUpdated";

        const yearSlider = d3.select("#year-slider")
        
        let tmDepExp = treemap()
          .value(d => +d["Gross Cost (in Billions)"])
          .label(d => d["Agency Name"])
          .selectedYear(yearSlider.property("value"))
          .selectionDispatcher(d3.dispatch(dispatchString))
          ("#treemap", fedExpData)
        
        yearSlider.on("input", function() {
          tmDepExp.updateSelection(this.value);
        });

        let lgDepExp = linegraph()
          ('#linegraph', fedExpData);
        
        let bar = barchart()
          ("#barchart", fedExpData);



      });
    });
  });

})());