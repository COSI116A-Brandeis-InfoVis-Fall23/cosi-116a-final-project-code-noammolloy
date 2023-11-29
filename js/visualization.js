// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {
  d3.csv("data/Federal_Expenditures_Dataset.csv", (fedExpData) => {
    d3.csv("data/Historical_Events.csv", (eventData) => {
      d3.csv("data/Historical_Political_Power.csv", (polPowData) => {

        const dispatchString = "selectionUpdated";

        let selectedYear = "2021"  // Initial year to display
        let tmDepExp = treemap()
          .value(d => +d["Gross Cost (in Billions)"])
          .label(d => d["Agency Name"])
          .selectedYear(selectedYear)
          .selectionDispatcher(d3.dispatch(dispatchString))
          ("#treemap", fedExpData)
        
        let tmYearSelector = yearSelector()
          .x(d => d["Statement Fiscal Year"])
          .xLabel("Year")
          .selectedYear(selectedYear)
          .selectionDispatcher(d3.dispatch(dispatchString))
          ("#treemap-year-selector", fedExpData)
        
        let lgDepExp = linegraph()
          ('#linegraph', fedExpData);
        
        let bar = barchart()
          ("#barchart", fedExpData);


        tmYearSelector.selectionDispatcher().on(dispatchString, function(year) {
          tmDepExp.updateSelection(year);
        });

      });
    });
  });

})());