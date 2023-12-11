// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {
  d3.csv("data/Federal_Expenditures_Dataset.csv", (fedExpData) => {
    d3.csv("data/Historical_Events.csv", (eventData) => {
      d3.csv("data/Historical_Political_Power.csv", (polPowData) => {

        const dispatchString = "selectionUpdated";

        

        let yearSlider = yearslider()
          .min(2000)
          .max(2021)
          .step(1)
          .selectionDispatcher(d3.dispatch(dispatchString))
          ("#year-slider-holder")
        
        let tmDepExp = treemap()
          .value(d => +d["Gross Cost (in Billions)"])
          .label(d => d["Agency Name"])
          .selectedYear("2021")
          .selectionDispatcher(d3.dispatch(dispatchString))
          ("#treemap", fedExpData)
        
        let lgDepExp = linegraph()
          .selectionDispatcher(d3.dispatch(dispatchString))
          ('#linegraph', fedExpData);

          let barchart = barchart()
            .selectionDispatcher(d3.dispatch(dispatchString))
            ('#barchart', lgDepExp.colorScale(), fedExpData);
        
        yearSlider.selectionDispatcher().on(dispatchString, function(value) {
          tmDepExp.updateSelection(value);
        });

        lgDepExp.selectionDispatcher().on(dispatchString, function(value) {
          barchart.updateSelection(value);
        });

        barchart.selectionDispatcher().on(dispatchString, function(value) {
          lgDepExp.updateSelection(value);
        });



      });
    });
  });

})());